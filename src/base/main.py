import uvicorn
from fastapi import FastAPI, File, UploadFile, HTTPException, Body
from agent_controller import AgentController
from typing import Optional
import pymongo
from bson import ObjectId
import logging
import os
from werkzeug.security import generate_password_hash, check_password_hash
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext
from fastapi.middleware.cors import CORSMiddleware
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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
videos_collection = db["videos"]

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

# For workout progression
class WorkoutProgression(BaseModel):
    id: str
    title: str
    time: Optional[str] = None
    calories: Optional[int] = None
    level: Optional[str] = None
    date: str

class UserOut(BaseModel):
    id: str
    full_name: str
    email: EmailStr
    progress: Optional[List[WorkoutProgression]] = None # New field for workout progression

# Model for updating workout progression
class UpdateProgression(BaseModel):
    email: EmailStr
    progress: List[WorkoutProgression]

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
    ftype: str


class NutritionItem(BaseModel):
    mealType: str
    id: int
    title: str
    image: str
    time: str
    calories: str
    type: str
    ftype: str


class WorkoutVideo(BaseModel):
    title: str
    duration: str
    calories: str
    videoId: str  # YouTube Video ID

# Hàm tiện ích để chuyển ObjectId -> string
def convert_id(doc):
    if "_id" in doc:
        doc["_id"] = str(doc["_id"])
    return doc


# Initialize agent
agent_controller = AgentController()

# =========================================================
# ================ CLIENT (MÀN HÌNH HOME) =================
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
        "progress": [],
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
        "progress": user.get("progress", []),
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

# Save workout context data
@app.post("/save_workout_context")
def save_workout_context(data: UpdateProgression):
    # 1. Find the user by email
    existing_user = users_collection.find_one({"email": data.email})
    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found.")

    # 2. Update the user's workoutContext field
    update_result = users_collection.update_one(
        {"email": data.email},
        {"$set": {"progress": [workout.dict() for workout in data.progress]}}
    )

    # 3. Check if the update was successful
    if update_result.modified_count == 0:
        return {
            "message": "No changes were made. Possibly the user already has this workout context or was not found."
        }

    return {"message": "Workout context successfully updated."}



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


@app.get("/videos", response_model=List[WorkoutVideo])
def get_workout_videos():
    videos = list(videos_collection.find({}, {"_id": 0}))  # Exclude MongoDB _id field
    return videos


# ------------------- CHATBOT ---------------------


@app.post("/get-response")
async def get_response(input: dict):
    response = agent_controller.get_response(input)
    return {"response": response}
