# Import các thư viện cần thiết
from langchain.tools.retriever import create_retriever_tool  # Tạo công cụ tìm kiếm
from langchain_google_genai import ChatGoogleGenerativeAI  # Model ngôn ngữ Google Gemini
from langchain.agents import AgentExecutor, create_openai_functions_agent  # Tạo và thực thi agent
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder  # Xử lý prompt
from pymongo import MongoClient  # Kết nối MongoDB
from langchain.retrievers import EnsembleRetriever  # Kết hợp nhiều retriever
from langchain_community.retrievers import BM25Retriever  # Retriever dựa trên BM25
from langchain.schema import BaseRetriever  # Tùy chỉnh retriever
from langchain_core.documents import Document  # Lớp Document
from transformers import AutoTokenizer, AutoModel  # PhoBERT
from sklearn.metrics.pairwise import cosine_similarity  # Đo lường độ tương đồng vector
from dotenv import load_dotenv  # Load biến môi trường
import torch  # Xử lý tensor với PhoBERT
import os  # Xử lý biến môi trường
from typing import Callable, List
from pydantic import Field

# Tải biến môi trường
load_dotenv()

# Google API Key
GOOGLE_API_KEYS = [
    os.getenv("GOOGLE_API_KEY_1"),
    os.getenv("GOOGLE_API_KEY_2"),
    os.getenv("GOOGLE_API_KEY_3"),
    os.getenv("GOOGLE_API_KEY_4"),
    os.getenv("GOOGLE_API_KEY_5"),
]
GOOGLE_API_KEYS = [key for key in GOOGLE_API_KEYS if key is not None]
if not GOOGLE_API_KEYS:
    raise ValueError("GOOGLE_API_KEY not found in environment variables")

class GoogleAPIKeyManager:
    def __init__(self, api_keys):
        self.api_keys = api_keys
        self.current_index = 0

    def get_current_key(self):
        return self.api_keys[self.current_index]

    def rotate_key(self):
        """
        Chuyển sang API key tiếp theo khi gặp lỗi 429.
        """
        self.current_index = (self.current_index + 1) % len(self.api_keys)
        print(f"Switched to API key: {self.api_keys[self.current_index]}")
        return self.get_current_key()

# Khởi tạo GoogleAPIKeyManager
key_manager = GoogleAPIKeyManager(GOOGLE_API_KEYS)

# MongoDB connection
MONGO_URI = os.getenv("MONGO_URI", "mongodb+srv://phanlachung2004:aggin2004@exercise.5do4n.mongodb.net/")
MONGO_DB_NAME = os.getenv("MONGO_DB_NAME", "Health_database")
COLLECTION_NAMES = ["exercises", "diets","nutritions"]

# Kết nối MongoDB
client = MongoClient(MONGO_URI)
db = client[MONGO_DB_NAME]

# Load PhoBERT model and tokenizer
tokenizer = None
model = None

def load_phobert():
    """Load PhoBERT model/tokenizer only once."""
    global tokenizer, model
    if tokenizer is None or model is None:
        tokenizer = AutoTokenizer.from_pretrained("vinai/phobert-base-v2")
        model = AutoModel.from_pretrained("vinai/phobert-base-v2")

def encode_text_phobert(text: str) -> torch.Tensor:
    """
    Encode văn bản thành vector embedding sử dụng PhoBERT.
    """
    load_phobert()
    inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True, max_length=256)
    with torch.no_grad():
        outputs = model(**inputs)
    return outputs.last_hidden_state.mean(dim=1).squeeze(0).numpy()

def vector_search_phobert(query: str, documents: List[Document], top_k: int = 4) -> List[Document]:
    """
    Tìm kiếm vector sử dụng PhoBERT.
    Args:
        query (str): Câu truy vấn.
        documents (List[Document]): Danh sách tài liệu.
        top_k (int): Số lượng kết quả trả về.
    Returns:
        List[Document]: Danh sách tài liệu liên quan nhất.
    """
    query_vec = encode_text_phobert(query)
    doc_embeddings = [encode_text_phobert(doc.page_content) for doc in documents]
    similarities = [cosine_similarity([query_vec], [doc_vec])[0][0] for doc_vec in doc_embeddings]
    top_indices = sorted(range(len(similarities)), key=lambda i: similarities[i], reverse=True)[:top_k]
    return [documents[i] for i in top_indices]

class PhoBERTVectorRetriever(BaseRetriever):
    """
    Tùy chỉnh retriever sử dụng PhoBERT.
    """
    search_fn: Callable = Field(..., exclude=True)

    def __init__(self, search_fn: Callable):
        super().__init__(search_fn=search_fn)

    def get_relevant_documents(self, query: str):
        return self.search_fn(query)

    async def aget_relevant_documents(self, query: str):
        return self.search_fn(query)

def get_retriever(use_mongodb: bool = True) -> EnsembleRetriever:
    """
    Tạo retriever kết hợp giữa BM25 và PhoBERT.
    Args:
        use_mongodb (bool): Cho phép sử dụng dữ liệu từ MongoDB.
    """
    try:
        documents = []
        if use_mongodb:
            print(f"Connecting to MongoDB collections: {COLLECTION_NAMES}...")
            for col_name in COLLECTION_NAMES:
                collection = db[col_name]
                for doc in collection.find():
                    content = doc.get("name", "")
                    if not content.strip():
                        continue
                    documents.append(Document(
                        page_content=content
                    ))
            print(f"Retrieved {len(documents)} documents from MongoDB.")

        # Nếu không có dữ liệu từ MongoDB, sử dụng tài liệu mặc định
        if not documents:
            raise ValueError("No valid (non-empty) documents found!")

        # Tạo BM25 retriever
        bm25_retriever = BM25Retriever.from_documents(documents)
        bm25_retriever.k = 4

        # Tạo PhoBERT vector retriever
        phobert_retriever = PhoBERTVectorRetriever(search_fn=lambda query: vector_search_phobert(query, documents))

        # Kết hợp BM25 và PhoBERT retriever
        ensemble_retriever = EnsembleRetriever(
            retrievers=[bm25_retriever, phobert_retriever],
            weights=[0.8, 0.2]
        )
        print("EnsembleRetriever created successfully!")
        return ensemble_retriever

    except Exception as e:
        print(f"Error in get_retriever: {str(e)}")
        return BM25Retriever.from_documents([
            Document(
                page_content="Error retrieving documents.",
                metadata={"source": "error"}
            )
        ])

def get_llm_and_agent(retriever, model="gemini-1.5-pro") -> AgentExecutor:
    """
    Tạo Language Model và Agent dựa trên Google Gemini với cơ chế thay đổi API key.
    """
    try:
        while True:
            try:
                print(f"Initializing Google Generative AI model: {model}...")
                current_api_key = key_manager.get_current_key()
                llm = ChatGoogleGenerativeAI(api_key=current_api_key, model=model)

                tools = [
                    create_retriever_tool(
                        retriever,
                        "find",
                        "Search for health, fitness, and nutrition information."
                    )
                ]

                # Thiết lập prompt template
                system = """ Bạn là 1 chuyên gia về sức khỏe, thể hình và dinh dưỡng. Tên bạn là CareAI."""
                prompt = ChatPromptTemplate.from_messages([
                    ("system", system),
                    MessagesPlaceholder(variable_name="chat_history"),
                    ("human", "{input}"),
                    MessagesPlaceholder(variable_name="agent_scratchpad"),
                ])

                # Tạo và trả về agent
                agent = create_openai_functions_agent(llm=llm, tools=tools, prompt=prompt)
                return AgentExecutor(agent=agent, tools=tools, verbose=True)
            except Exception as e:
                # Xử lý lỗi 429 và thử lại với API key mới
                if "429" in str(e):
                    print("API key quota exhausted. Rotating API key...")
                    key_manager.rotate_key()
                else:
                    raise e

    except Exception as e:
        print(f"Error in get_llm_and_agent: {str(e)}")
        raise


def save_chat_history(chat_history_collection: str, chat: dict):
    """
    Lưu lịch sử hội thoại vào MongoDB.
    Args:
        chat_history_collection (str): Tên collection lưu lịch sử hội thoại.
        chat (dict): Nội dung hội thoại.
    """
    try:
        collection = db[chat_history_collection]
        collection.insert_one(chat)
        print("Chat history saved successfully.")
    except Exception as e:
        print(f"Error saving chat history: {str(e)}")

def ask_question(agent, question: str, chat_history=None):
    """
    Hỏi chatbot một câu hỏi và nhận câu trả lời.
    Args:
        agent: Agent đã được khởi tạo.
        question (str): Câu hỏi từ người dùng.
        chat_history (list): Lịch sử hội thoại, mặc định là None.
    """
    if chat_history is None:
        chat_history = []

    # Gửi câu hỏi đến agent
    response = agent.invoke({"input": question, "chat_history": chat_history})

    # Kiểm tra tài liệu được sử dụng
    print("Documents retrieved for this question:")
    retrieved_docs = response.get("retrieved_documents", [])
    if retrieved_docs:
        for doc in retrieved_docs:
            print(f"- {doc.page_content}")
    else:
        print("No documents were retrieved.")

    chat_history.append({"role": "user", "content": question})
    chat_history.append({"role": "assistant", "content": response["output"]})
    return response["output"]
