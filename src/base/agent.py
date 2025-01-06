from langchain.tools.retriever import create_retriever_tool
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.agents import AgentExecutor, create_openai_functions_agent
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.schema import BaseRetriever
from langchain_core.documents import Document
from transformers import AutoTokenizer, AutoModel
from sklearn.metrics.pairwise import cosine_similarity
from pymongo import MongoClient
from dotenv import load_dotenv
import torch
import os
from typing import List

# Load environment variables
load_dotenv()

# Basic configurations
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY_1")
MONGO_URI = os.getenv("MONGO_URI")
MONGO_DB_NAME = "Health_database"

# MongoDB connection
client = MongoClient(MONGO_URI)
db = client[MONGO_DB_NAME]

# PhoBERT initialization
tokenizer = AutoTokenizer.from_pretrained("vinai/phobert-base-v2")
model = AutoModel.from_pretrained("vinai/phobert-base-v2")

def encode_text(text: str) -> torch.Tensor:
    """Encode text using PhoBERT."""
    inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True, max_length=256)
    with torch.no_grad():
        outputs = model(**inputs)
    return outputs.last_hidden_state.mean(dim=1).squeeze(0).numpy()

class SimpleRetriever(BaseRetriever):
    """Simplified PhoBERT retriever."""
    def __init__(self, documents: List[Document]):
        super().__init__()
        self.documents = documents

    def get_relevant_documents(self, query: str) -> List[Document]:
        query_vec = encode_text(query)
        doc_embeddings = [encode_text(doc.page_content) for doc in self.documents]
        
        # Calculate similarities
        similarities = [
            cosine_similarity([query_vec], [doc_vec])[0][0] 
            for doc_vec in doc_embeddings
        ]
        
        # Get top documents
        top_k = 3
        top_indices = sorted(
            range(len(similarities)), 
            key=lambda i: similarities[i], 
            reverse=True
        )[:top_k]
        
        return [self.documents[i] for i in top_indices if similarities[i] > 0.3]

    async def aget_relevant_documents(self, query: str) -> List[Document]:
        return self.get_relevant_documents(query)

def load_documents() -> List[Document]:
    """Load documents from MongoDB."""
    documents = []
    collections = ["exercises", "diets", "nutritions"]
    
    for collection_name in collections:
        collection = db[collection_name]
        for doc in collection.find():
            content = f"{doc.get('name', '')}\n{doc.get('description', '')}"
            metadata = {
                "source": collection_name,
                "id": str(doc["_id"]),
                "name": doc.get("name", "")
            }
            documents.append(Document(page_content=content, metadata=metadata))
    
    return documents

def initialize_agent():
    """Initialize the RAG-enabled agent."""
    try:
        # Load documents and create retriever
        documents = load_documents()
        retriever = SimpleRetriever(documents)
        
        # Create LLM
        llm = ChatGoogleGenerativeAI(api_key=GOOGLE_API_KEY, model="gemini-1.5-pro")
        
        # Create retriever tool
        tools = [
            create_retriever_tool(
                retriever,
                "find",
                "Search for health and fitness information"
            )
        ]
        
        # Create prompt
        prompt = ChatPromptTemplate.from_messages([
            ("system", """Bạn là CareAI, một chuyên gia về sức khỏe, thể hình và dinh dưỡng. 
            Luôn sử dụng công cụ 'find' để tìm kiếm thông tin trước khi trả lời.
            Nếu không tìm thấy thông tin liên quan, hãy nói rõ và trả lời dựa trên kiến thức chung."""),
            ("human", "{input}"),
            MessagesPlaceholder(variable_name="agent_scratchpad"),
        ])
        
        # Create agent
        agent = create_openai_functions_agent(llm=llm, tools=tools, prompt=prompt)
        return AgentExecutor(agent=agent, tools=tools)
        
    except Exception as e:
        print(f"Error initializing agent: {e}")
        raise

async def get_chat_response(agent, question: str) -> str:
    """Get chat response with error handling."""
    try:
        response = await agent.ainvoke({"input": question})
        return response["output"]
    except Exception as e:
        return f"Xin lỗi, đã có lỗi xảy ra: {str(e)}"