import uvicorn
from fastapi import FastAPI, File, UploadFile, HTTPException, Body
from typing import Optional
import pymongo
from pydantic import BaseModel
from bson import ObjectId
#from agent import get_retriever, get_llm_and_agent
import logging
from dotenv import load_dotenv
import os
import boto3 # Thư viện để upload S3
from werkzeug.security import generate_password_hash, check_password_hash

app = FastAPI()

# 1) KẾT NỐI MONGODB
client = pymongo.MongoClient("mongodb+srv://phanlachung2004:aggin2004@exercise.5do4n.mongodb.net/")
db = client["Health_database"]

users_collection = db["users"]
rec_collection = db["recommendations"]
article_collection = db["articles"]

# 2) KẾT NỐI S3 (thay AWS_ACCESS_KEY / AWS_SECRET_KEY / region_name bằng của bạn)
s3_client = boto3.client(
    "s3",
    aws_access_key_id="AWS_ACCESS_KEY",
    aws_secret_access_key="AWS_SECRET_KEY",
    region_name="ap-southeast-2"  
)
BUCKET_NAME = "health-app-data"

# 3) Mô hình dữ liệu (Pydantic) dùng cho request/response (ví dụ)
class User(BaseModel):
    username: str
    password: str
    email: str

class LoginUser(BaseModel):
    email: str
    password: str

class Recommendation(BaseModel):
    title: str
    duration: Optional[str] = None
    image: Optional[str] = None
    isStarred: bool = False

class Article(BaseModel):
    title: str
    image: Optional[str] = None
    isStarred: bool = False

# Hàm tiện ích để chuyển ObjectId -> string
def convert_id(doc):
    if "_id" in doc:
        doc["_id"] = str(doc["_id"])
    return doc


# =========================================================
# ============== PHẦN ADMIN (UPLOAD FILE) ================
# =========================================================

@app.post("/admin/recommendations")
async def create_recommendation_for_admin(
    title: str = Body(...),
    duration: str = Body(...),
    file: UploadFile = File(...),
):
    """
    Endpoint dành cho admin, upload ảnh/video bài tập lên S3,
    rồi lưu record vào MongoDB.
    """
    try:
        # 1) Upload file lên S3
        s3_key = f"recommendations/{file.filename}"
        s3_client.upload_fileobj(file.file, BUCKET_NAME, s3_key)
        file_url = f"https://{BUCKET_NAME}.s3.amazonaws.com/{s3_key}"

        # 2) Tạo document lưu vào DB
        doc = {
            "title": title,
            "duration": duration,
            "fileUrl": file_url,
            "isStarred": False
        }
        result = rec_collection.insert_one(doc)
        doc["_id"] = str(result.inserted_id)
        return doc

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/admin/articles")
async def create_article_for_admin(
    title: str = Body(...),
    file: UploadFile = File(...),
):
    """
    Endpoint dành cho admin, upload ảnh/video bài viết lên S3,
    rồi lưu record vào MongoDB.
    """
    try:
        # 1) Upload file lên S3
        s3_key = f"articles/{file.filename}"
        s3_client.upload_fileobj(file.file, BUCKET_NAME, s3_key)
        file_url = f"https://{BUCKET_NAME}.s3.amazonaws.com/{s3_key}"

        # 2) Tạo document lưu vào DB
        doc = {
            "title": title,
            "fileUrl": file_url,
            "isStarred": False
        }
        result = article_collection.insert_one(doc)
        doc["_id"] = str(result.inserted_id)
        return doc

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# =========================================================
# =========== PHẦN CLIENT (MÀN HÌNH HOME) =================
# =========================================================


# -----------------  USER ENDPOINTS -----------------------

# [POST] Đăng ký user
@app.post("/register")
def register(user: User):
    existing_user = users_collection.find_one({"username": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")
    
    # hash password
    hashed_password = generate_password_hash(user.password)

    user_doc = {
        "username": user.username,
        "email": user.email,
        "password": user.password
    }
    result = users_collection.insert_one(user_doc)
    return {"message": "User registered successfully!"}

# [POST] login
@app.post("/login")
def Login(user: LoginUser):
    existing_user = users_collection.find_one({"email": user.email})
    if not existing_user or not check_password_hash(existing_user["password"], user.password):
        raise HTTPException(status_code=401, detail="Invalid email or password!")
    return {
        "message": "Login successful!", 
        "user": { 
            "email": existing_user["email"], 
            "username": existing_user["username"]
        }
    }

# [GET] Lấy thông tin user qua query param ?username=
@app.get("/user")
def get_user(username: str):
    user = users_collection.find_one({"username": username})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    convert_id(user)
    return user

# ------------------- RECOMMENDATIONS ---------------------

@app.get("/recommendations")
def get_recommendations():
    items = rec_collection.find({})
    results = []
    for item in items:
        convert_id(item)
        results.append(item)
    return results


@app.get("/recommendations/{rec_id}")
def get_recommendation_detail(rec_id: str):
    """
    Xem chi tiết 1 gợi ý (VD: videoUrl, duration, ...)
    """
    try:
        obj_id = ObjectId(rec_id)
    except:
        raise HTTPException(status_code=400, detail="Invalid ID format")

    rec = rec_collection.find_one({"_id": obj_id})
    if not rec:
        raise HTTPException(status_code=404, detail="Recommendation not found")
    convert_id(rec)
    return rec


@app.patch("/recommendations/{rec_id}/star")
def star_recommendation(rec_id: str, payload: dict = Body(...)):
    """
    Gắn/tắt “star” cho 1 gợi ý: {"isStarred": true/false}
    """
    try:
        obj_id = ObjectId(rec_id)
    except:
        raise HTTPException(status_code=400, detail="Invalid ID format")

    is_starred = payload.get("isStarred", None)
    if is_starred is None:
        raise HTTPException(status_code=400, detail="Missing isStarred field")

    updated = rec_collection.find_one_and_update(
        {"_id": obj_id},
        {"$set": {"isStarred": is_starred}},
        return_document=True
    )
    if not updated:
        raise HTTPException(status_code=404, detail="Recommendation not found")

    convert_id(updated)
    return updated


# ------------------- ARTICLES ---------------------

@app.get("/articles")
def get_articles():
    """
    Lấy danh sách bài viết/tips
    """
    items = article_collection.find({})
    results = []
    for item in items:
        convert_id(item)
        results.append(item)
    return results


@app.get("/articles/{article_id}")
def get_article_detail(article_id: str):
    """
    Xem chi tiết 1 bài viết (VD: fileUrl, ...)
    """
    try:
        obj_id = ObjectId(article_id)
    except:
        raise HTTPException(status_code=400, detail="Invalid ID format")

    art = article_collection.find_one({"_id": obj_id})
    if not art:
        raise HTTPException(status_code=404, detail="Article not found")
    convert_id(art)
    return art


@app.patch("/articles/{article_id}/star")
def star_article(article_id: str, payload: dict = Body(...)):
    """
    Gắn/tắt “star” cho 1 bài viết: {"isStarred": true/false}
    """
    try:
        obj_id = ObjectId(article_id)
    except:
        raise HTTPException(status_code=400, detail="Invalid ID format")

    is_starred = payload.get("isStarred", None)
    if is_starred is None:
        raise HTTPException(status_code=400, detail="Missing isStarred field")

    updated = article_collection.find_one_and_update(
        {"_id": obj_id},
        {"$set": {"isStarred": is_starred}},
        return_document=True
    )
    if not updated:
        raise HTTPException(status_code=404, detail="Article not found")

    convert_id(updated)
    return updated

