from agent import get_retriever, get_llm_and_agent, ask_question
from pymongo import MongoClient
import os
from dotenv import load_dotenv

def get_sample_data_from_mongodb():
    """
    Lấy một số mẫu dữ liệu từ MongoDB để kiểm tra
    """
    load_dotenv()
    MONGO_URI = os.getenv("MONGO_URI", "mongodb+srv://phanlachung2004:aggin2004@exercise.5do4n.mongodb.net/")
    MONGO_DB_NAME = os.getenv("MONGO_DB_NAME", "Health_database")
    
    client = MongoClient(MONGO_URI)
    db = client[MONGO_DB_NAME]
    
    sample_data = {
        "exercises": list(db.exercises.find().limit(2)),
        "diets": list(db.diets.find().limit(2)),
        "nutritions": list(db.nutritions.find().limit(2))
    }
    
    return sample_data

def test_chatbot():
    """
    Kiểm thử chatbot và xác minh việc sử dụng dữ liệu từ MongoDB
    """
    print("Initializing retriever and agent...")
    try:
        # Lấy mẫu dữ liệu từ MongoDB
        print("\nFetching sample data from MongoDB...")
        sample_data = get_sample_data_from_mongodb()
        
        # In ra một số mẫu dữ liệu để tham chiếu
        print("\nSample data from MongoDB:")
        for collection, documents in sample_data.items():
            print(f"\n{collection.upper()}:")
            for doc in documents:
                print(f"- {doc.get('name', '')}")

        # Khởi tạo retriever và agent
        retriever = get_retriever()
        agent = get_llm_and_agent(retriever)

        # Tạo câu hỏi dựa trên dữ liệu mẫu
        questions = [
            "Lợi ích của chống đẩy là gì?",
            "Calo của xoài trong khẩu phần 350g?",
        ]

        # Thêm câu hỏi specific về dữ liệu mẫu
        if sample_data['exercises']:
            exercise_name = sample_data['exercises'][0].get('name', '')
            if exercise_name:
                questions.append(f"Cho tôi biết về bài tập {exercise_name}")

        if sample_data['nutritions']:
            nutrition_name = sample_data['nutritions'][0].get('name', '')
            if nutrition_name:
                questions.append(f"Giá trị dinh dưỡng của {nutrition_name}?")

        # Vòng lặp kiểm thử
        for question in questions:
            print(f"\nQuestion: {question}")
            try:
                # Gửi câu hỏi đến chatbot
                response = ask_question(agent, question)
                print(f"Response: {response}")
            except Exception as e:
                print(f"Error: {e}")
            print("-" * 50)

    except Exception as e:
        print(f"Setup error: {e}")

if __name__ == "__main__":
    print("Starting chatbot test...")
    test_chatbot()