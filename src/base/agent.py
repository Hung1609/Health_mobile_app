from langchain.tools.retriever import create_retriever_tool  # Tạo công cụ tìm kiếm
from langchain.agents import AgentExecutor, create_openai_functions_agent  # Tạo và thực thi agent
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder  # Xử lý prompt
from pymongo import MongoClient  # Kết nối MongoDB
from langchain.retrievers import EnsembleRetriever  # Kết hợp nhiều retriever
from langchain_community.retrievers import BM25Retriever  # Retriever dựa trên BM25
from langchain_core.documents import Document  # Lớp Document
from transformers import AutoTokenizer, AutoModel
import torch
from sklearn.metrics.pairwise import cosine_similarity
from dotenv import load_dotenv
import os
from langchain_google_genai import ChatGoogleGenerativeAI

# Tải biến môi trường
load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    raise ValueError("GOOGLE_API_KEY not found in environment variables")

MONGO_URI = os.getenv("MONGO_URI", "mongodb+srv://phanlachung2004:aggin2004@exercise.5do4n.mongodb.net/")
MONGO_DB_NAME = os.getenv("MONGO_DB_NAME", "Health_database")
CHAT_HISTORY_COLLECTION = "chat_history"
COLLECTION_NAME = os.getenv("MONGO_COLLECTION_NAME", "exercises")

# Kết nối MongoDB
client = MongoClient(MONGO_URI)
db = client[MONGO_DB_NAME]
collection = db[COLLECTION_NAME]

# Load PhoBERT model and tokenizer
tokenizer = AutoTokenizer.from_pretrained("vinai/phobert-base-v2")
model = AutoModel.from_pretrained("vinai/phobert-base-v2")

def encode_text(text):
    """
    Encode text into embeddings using PhoBERT.
    """
    inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True, max_length=256)
    with torch.no_grad():
        outputs = model(**inputs)
    return outputs.last_hidden_state.mean(dim=1).numpy()

def vector_search_with_phobert(query: str, documents: list, k: int = 4):
    """
    Perform vector search using PhoBERT embeddings and cosine similarity.
    Args:
        query (str): The query string.
        documents (list): A list of Document objects.
        k (int): Number of top results to return.
    Returns:
        list: Top k relevant documents.
    """
    query_vec = encode_text(query)
    doc_embeddings = [encode_text(doc.page_content) for doc in documents]
    similarities = [cosine_similarity(query_vec, doc_vec)[0][0] for doc_vec in doc_embeddings]
    top_k_indices = sorted(range(len(similarities)), key=lambda i: similarities[i], reverse=True)[:k]
    return [documents[i] for i in top_k_indices]

def rerank_documents(query: str, documents: list):
    """
    Re-rank the retrieved documents based on relevance using a scoring mechanism.
    Args:
        query (str): The query string.
        documents (list): A list of Document objects to be re-ranked.
    Returns:
        list: Re-ranked documents sorted by relevance.
    """
    query_vec = encode_text(query)
    doc_embeddings = [encode_text(doc.page_content) for doc in documents]
    scores = [cosine_similarity(query_vec, doc_vec)[0][0] for doc_vec in doc_embeddings]
    reranked_docs = sorted(zip(documents, scores), key=lambda x: x[1], reverse=True)
    return [doc for doc, _ in reranked_docs]

def get_retriever(llm, question: str, collection_name: str = COLLECTION_NAME) -> EnsembleRetriever:
    """
    Tạo một ensemble retriever kết hợp vector search và BM25 từ MongoDB
    Args:
        llm: Mô hình ngôn ngữ lớn để xử lý HyDE và Multi-Query.
        question (str): Câu hỏi gốc từ người dùng.
        collection_name (str): Tên collection trong MongoDB để truy vấn.
    """
    try:
        print(f"Connecting to MongoDB collection: {collection_name}...")
        documents = []
        for doc in collection.find():
            content = doc.get("content", "")
            metadata = doc.get("metadata", {})
            documents.append(Document(
                page_content=content,
                metadata=metadata
            ))

        print(f"Retrieved {len(documents)} documents.")

        if not documents:
            raise ValueError("No documents found in collection!")

        # Tạo BM25 retriever
        bm25_retriever = BM25Retriever.from_documents(documents)
        bm25_retriever.k = 4

        # Tạo vector retriever
        def phobert_vector_search(query: str, k: int = 4):
            return vector_search_with_phobert(query, documents, k)

        class PhoBERTVectorRetriever:
            def __init__(self, search_fn):
                self.search_fn = search_fn

            def get_relevant_documents(self, query: str):
                return self.search_fn(query)

        phobert_retriever = PhoBERTVectorRetriever(phobert_vector_search)

        # Kết hợp BM25 và vector retriever
        ensemble_retriever = EnsembleRetriever(
            retrievers=[bm25_retriever, phobert_retriever],
            weights=[0.5, 0.5]
        )

        print("EnsembleRetriever created successfully!")
        return ensemble_retriever

    except Exception as e:
        print(f"Error in get_retriever: {str(e)}")
        default_doc = [
            Document(
                page_content="No data found. Returning default document.",
                metadata={"source": "error"}
            )
        ]
        return BM25Retriever.from_documents(default_doc)

def get_llm_and_agent(_retriever) -> AgentExecutor:
    """
    Khởi tạo Language Model và Agent với cấu hình cụ thể
    Args:
        _retriever: Retriever đã được cấu hình để tìm kiếm thông tin
    """
    try:
        print("Initializing ChatGoogleGenerativeAI...")
        llm = ChatGoogleGenerativeAI(api_key=GOOGLE_API_KEY, model="gemini-1.5-pro")

        tools = [
            create_retriever_tool(
                _retriever,
                "find",
                "Search for information."
            )
        ]

        # Thiết lập prompt template cho agent
        system = """You are an expert in fitness, nutrition, and health advice. Your name is CareAI."""
        prompt = ChatPromptTemplate.from_messages([
            ("system", system),
            MessagesPlaceholder(variable_name="chat_history"),
            ("human", "{input}"),
            MessagesPlaceholder(variable_name="agent_scratchpad"),
        ])

        # Tạo và trả về agent
        agent = create_openai_functions_agent(llm=llm, tools=tools, prompt=prompt)
        print("Agent created successfully!")
        return AgentExecutor(agent=agent, tools=tools, verbose=True)

    except Exception as e:
        print(f"Error in get_llm_and_agent: {str(e)}")
        raise





