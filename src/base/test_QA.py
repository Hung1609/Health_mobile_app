from agent import get_retriever, get_llm_and_agent, ask_question
from pymongo import MongoClient
import os
from dotenv import load_dotenv
import time

def test_retriever_directly(retriever, question):
    """Test the retriever component separately"""
    print(f"\nTesting retriever directly for question: {question}")
    try:
        start_time = time.time()
        # Use invoke instead of get_relevant_documents
        docs = retriever.invoke(question)
        retrieval_time = time.time() - start_time
        
        print(f"\nRetriever results (took {retrieval_time:.2f} seconds):")
        if not docs:
            print("No documents retrieved!")
        for i, doc in enumerate(docs, 1):
            print(f"\nDocument {i}:")
            print(f"Source: {doc.metadata.get('source', 'unknown')}")
            print(f"ID: {doc.metadata.get('id', 'unknown')}")
            print(f"Content Preview: {doc.page_content[:200]}...")
        return docs
    except Exception as e:
        print(f"Retriever error: {str(e)}")
        return None

def test_chatbot():
    """
    Kiểm thử chatbot và xác minh việc sử dụng dữ liệu từ MongoDB
    """
    try:
        # Initialize retriever and agent
        print("Initializing retriever...")
        retriever = get_retriever()
        
        # Test retriever directly first
        test_questions = [
            "Lợi ích của chống đẩy là gì?",
            "bài tập chống đẩy",
            "hít đất lợi ích"
        ]
        
        print("\nTesting retriever component:")
        for question in test_questions:
            retrieved_docs = test_retriever_directly(retriever, question)
            print(f"\nNumber of documents retrieved: {len(retrieved_docs) if retrieved_docs else 0}")
            
        # Initialize agent and test full pipeline
        print("\nInitializing agent...")
        agent = get_llm_and_agent(retriever)
        
        print("\nTesting full agent pipeline:")
        for question in test_questions:
            print(f"\n{'='*80}")
            print(f"Testing Question: {question}")
            print(f"{'='*80}")
            
            try:
                start_time = time.time()
                response = ask_question(agent, question, debug=True)
                response_time = time.time() - start_time
                
                print(f"\nFinal Response (took {response_time:.2f} seconds):")
                print(response)
                
            except Exception as e:
                print(f"Error during testing: {str(e)}")
                import traceback
                print(traceback.format_exc())
                
            print("-" * 80)

    except Exception as e:
        print(f"Setup error: {str(e)}")
        import traceback
        print(traceback.format_exc())

if __name__ == "__main__":
    print("Starting chatbot test...")
    test_chatbot()