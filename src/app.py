from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# MongoDB Atlas connection
client = MongoClient("mongodb+srv://qudu:0@cluster0.260ig.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client["health_app"]
users_collection = db["users"]

# Signup endpoint
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    full_name = data.get("fullName")
    email = data.get("email")
    password = data.get("password")

    if not full_name or not email or not password:
        return jsonify({"error": "All fields are required!"}), 400

    # Check if user already exists
    if users_collection.find_one({"email": email}):
        return jsonify({"error": "User already exists!"}), 400

    # Hash password
    hashed_password = generate_password_hash(password)

    # Save user to MongoDB
    user = {"fullName": full_name, "email": email, "password": hashed_password}
    users_collection.insert_one(user)

    return jsonify({"message": "User registered successfully!"}), 201

# Login endpoint
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required!"}), 400

    # Find user
    user = users_collection.find_one({"email": email})
    if not user or not check_password_hash(user["password"], password):
        return jsonify({"error": "Invalid email or password!"}), 401

    return jsonify({"message": "Login successful!", "user": {"email": user["email"], "fullName": user["fullName"]}}), 200

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
