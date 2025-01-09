import uvicorn
from fastapi import FastAPI, File, UploadFile, HTTPException, Body
from typing import Optional
import pymongo
from bson import ObjectId
import logging
from dotenv import load_dotenv
import os
import boto3  # Thư viện để upload S3
from werkzeug.security import generate_password_hash, check_password_hash
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from agent import initialize_agent, get_chat_response

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # <--- allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 1) KẾT NỐI MONGODB
client = pymongo.MongoClient(
    "mongodb+srv://phanlachung2004:aggin2004@exercise.5do4n.mongodb.net/"
)
db = client["Health_database"]

users_collection = db["users"]
rec_collection = db["recommendations"]
article_collection = db["articles"]
w_collection = db["workout"]
n_collection = db["nutrition"]

# 2) KẾT NỐI S3 (thay AWS_ACCESS_KEY / AWS_SECRET_KEY / region_name bằng của bạn)
s3_client = boto3.client(
    "s3",
    aws_access_key_id="AWS_ACCESS_KEY",
    aws_secret_access_key="AWS_SECRET_KEY",
    region_name="ap-southeast-2",
)
BUCKET_NAME = "health-app-data"

# 3) Mô hình dữ liệu (Pydantic) dùng cho request/response (ví dụ)
# assword Hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: str
    full_name: str
    email: EmailStr


class UserGender(BaseModel):
    email: EmailStr
    gender: str  # "male" or "female"


class UserAge(BaseModel):
    email: EmailStr
    age: int


class UserStats(BaseModel):
    email: EmailStr
    height: float
    weight: float


class UserGoal(BaseModel):
    email: EmailStr
    goals: List[str]  # e.g., ["Lose Weight", "Shape Body"]


class UserLevel(BaseModel):
    email: EmailStr
    level: str  # e.g., "Beginner", "Intermediate", or "Advance"


class ResetPasswordModel(BaseModel):
    email: str
    new_password: str


class GetUserInfo(BaseModel):
    email: EmailStr


class Recommendation(BaseModel):
    title: str
    duration: Optional[str] = None
    image: Optional[str] = None
    isStarred: bool = False


class Article(BaseModel):
    title: str
    image: Optional[str] = None
    isStarred: bool = False


class ExerciseDetail(BaseModel):
    name: str
    description: str
    reps: str
    sets: str
    video: str


class WorkoutData(BaseModel):
    id: int
    title: str
    image: str
    time: str
    calories: str
    exercises: str
    details: List[ExerciseDetail]
    level: str  # Beginner, Intermediate, Advanced
    type: str  # workout type
    


class NutritionItem(BaseModel):
    mealType: str
    id: int
    title: str
    image: str
    time: str
    calories: str
    type: str


# Hàm tiện ích để chuyển ObjectId -> string
def convert_id(doc):
    if "_id" in doc:
        doc["_id"] = str(doc["_id"])
    return doc


# Initialize agent globally
class ChatAgent:
    _instance = None

    @classmethod
    async def get_instance(cls):
        if cls._instance is None:
            cls._instance = await cls._initialize()
        return cls._instance

    @classmethod
    async def _initialize(cls):
        return initialize_agent()


class ChatRequest(BaseModel):
    message: str


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
            "isStarred": False,
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
        doc = {"title": title, "fileUrl": file_url, "isStarred": False}
        result = article_collection.insert_one(doc)
        doc["_id"] = str(result.inserted_id)
        return doc

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# =========================================================
# =========== PHẦN CLIENT (MÀN HÌNH HOME) =================
# =========================================================


# -----------------  USER ENDPOINTS -----------------------


@app.post("/signup")
def sign_up(user: UserCreate):
    # Check if user with the email already exists
    existing_user = users_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered.")

    # Hash the user's password
    hashed_pw = hash_password(user.password)

    # Create a user document
    user_doc = {
        "full_name": user.full_name,
        "email": user.email,
        "password": hashed_pw,
    }

    # Insert into MongoDB
    result = users_collection.insert_one(user_doc)
    if not result.inserted_id:
        raise HTTPException(status_code=500, detail="Could not create user.")

    return {"message": "User created successfully!"}


@app.post("/login")
def login(user: UserLogin):
    # Check if user exists by email
    existing_user = users_collection.find_one({"email": user.email})
    if not existing_user:
        raise HTTPException(status_code=401, detail="Invalid email or password.")

    # Verify password
    if not verify_password(user.password, existing_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password.")

    # If successful, you can return a token, or for now, just send a success message
    return {"message": "Login successful!"}


@app.post("/gender")
def set_gender(gender: UserGender):
    # 1. Find if user with this email exists
    existing_user = users_collection.find_one({"email": gender.email})
    if not existing_user:
        # If there's no user with this email, return 404
        raise HTTPException(status_code=404, detail="User not found.")

    # 2. Update gender in database
    update_result = users_collection.update_one(
        {"email": gender.email}, {"$set": {"gender": gender.gender}}
    )

    if update_result.modified_count == 0:
        return {
            "message": "No changes were made. User already has this gender or user not found."
        }

    return {"message": f"Gender successfully updated to {gender.gender}."}


@app.post("/age")
def set_age(age: UserAge):
    # 1. Check if the user exists
    existing_user = users_collection.find_one({"email": age.email})
    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found.")

    # 2. Update the user's 'age'
    update_result = users_collection.update_one(
        {"email": age.email}, {"$set": {"age": age.age}}
    )

    if update_result.modified_count == 0:
        return {
            "message": "No changes were made. Possibly the user already has this age or was not found."
        }

    return {"message": f"Age successfully updated to {age.age}."}


@app.post("/stats")
def set_stats(stats: UserStats):
    # 1. Find the user by email
    existing_user = users_collection.find_one({"email": stats.email})
    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found.")

    # 2. Update the user with the provided stats
    update_result = users_collection.update_one(
        {"email": stats.email},
        {"$set": {"height": stats.height, "weight": stats.weight}},
    )

    # 3. Check if the update was successful
    if update_result.modified_count == 0:
        return {
            "message": "No changes were made. Possibly the user already has these stats or was not found."
        }

    return {
        "message": f"Stats updated: Height = {stats.height}, Weight = {stats.weight}."
    }


@app.post("/goal")
def set_goal(goal: UserGoal):
    # 1. Find the user by email
    existing_user = users_collection.find_one({"email": goal.email})
    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found.")

    # 2. Update the user's goals
    update_result = users_collection.update_one(
        {"email": goal.email}, {"$set": {"goals": goal.goals}}
    )

    # 3. Check if the update was successful
    if update_result.modified_count == 0:
        return {
            "message": "No changes were made. Possibly the user already has these goals or was not found."
        }

    return {"message": f"Goals updated: {goal.goals}"}


@app.post("/level")
def set_level(level: UserLevel):
    # 1. Find the user by email
    existing_user = users_collection.find_one({"email": level.email})
    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found.")

    # 2. Update the user's level
    update_result = users_collection.update_one(
        {"email": level.email}, {"$set": {"level": level.level}}
    )

    if update_result.modified_count == 0:
        return {
            "message": "No changes were made. Possibly the user already has this level or was not found."
        }

    return {"message": f"Level updated to {level.level}."}


@app.post("/reset-password")
async def reset_password(data: ResetPasswordModel):
    print(f"Received data: {data.dict()}")  # Debug log

    # Check if the user exists
    user = users_collection.find_one({"email": data.email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Hash the new password
    hashed_password = hash_password(data.new_password)

    # Update the user's password in the database
    update_result = users_collection.update_one(
        {"email": data.email}, {"$set": {"password": hashed_password}}
    )

    if update_result.modified_count == 0:
        raise HTTPException(status_code=500, detail="Failed to update password")

    return {"message": "Password successfully updated"}


@app.post("/get_user_info")
def get_user_info(user_req: GetUserInfo):
    # Find user by email
    user = users_collection.find_one({"email": user_req.email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")

    # Convert _id to string if needed, or exclude it altogether
    user["_id"] = str(user["_id"])

    # Exclude password before returning
    user.pop("password", None)

    return {
        "full_name": user.get("full_name"),
        "email": user.get("email"),
        "gender": user.get("gender"),
        "age": user.get("age"),
        "height": user.get("height"),
        "weight": user.get("weight"),
        "birthday": user.get("birthday"),
        "goals": user.get("goals"),
        "level": user.get("level"),
        # ...any other fields...
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
        {"_id": obj_id}, {"$set": {"isStarred": is_starred}}, return_document=True
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
        {"_id": obj_id}, {"$set": {"isStarred": is_starred}}, return_document=True
    )
    if not updated:
        raise HTTPException(status_code=404, detail="Article not found")

    convert_id(updated)
    return updated


# ------------------- RECOMMENDATIONS ---------------------


@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    try:
        print(f"Received request: {request}")
        agent = await ChatAgent.get_instance()
        response = await get_chat_response(agent, request.message)
        print(f"Sending response: {response}")
        return {"response": response}
    except Exception as e:
        print(f"Error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


# --HOME--


@app.get("/workouts/{level}", response_model=List[WorkoutData])
async def get_workouts(level: str):
    """
    Retrieve workouts by difficulty level (Beginner, Intermediate, Advanced).
    """
    data = list(w_collection.find({"level": level}, {"_id": 0}))
    if not data:
        raise HTTPException(
            status_code=404, detail=f"No workouts found for level: {level}"
        )
    return data


@app.post("/workouts/")
async def add_workout(workout: WorkoutData):
    """
    Add a new workout to the database.
    """
    if w_collection.find_one({"id": workout.id}):
        raise HTTPException(
            status_code=400, detail="Workout with this ID already exists."
        )
    w_collection.insert_one(workout.dict())
    return {"message": "Workout added successfully"}


@app.get("/workout/{id}", response_model=WorkoutData)
async def get_workout_by_id(id: int):
    """
    Retrieve a specific workout by its ID.
    """
    workout = w_collection.find_one({"id": id}, {"_id": 0})
    if not workout:
        raise HTTPException(status_code=404, detail="Workout not found.")
    return workout


@app.get("/nutrition/{meal_type}", response_model=List[NutritionItem])
async def get_nutrition(meal_type: str):
    data = list(n_collection.find({"mealType": meal_type}, {"_id": 0}))
    if not data:
        raise HTTPException(
            status_code=404, detail="No nutrition data found for this meal type."
        )
    return data


@app.post("/nutrition/")
async def add_nutrition(item: NutritionItem):
    if n_collection.find_one({"id": item.id}):
        raise HTTPException(status_code=400, detail="Item with this ID already exists.")
    n_collection.insert_one(item.dict())
    return {"message": "Nutrition item added successfully"}
