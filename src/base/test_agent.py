import os
from dotenv import load_dotenv

# Load biến môi trường từ file .env
dotenv_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".env"))
print(f"Loading .env from: {dotenv_path}")

load_dotenv(dotenv_path)

# Kiểm tra giá trị API Key
print("OPENAI_API_KEY:", os.getenv("OPENAI_API_KEY"))