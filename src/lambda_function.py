from pymongo import MongoClient
import json

# Connect to MongoDB Atlas
client = MongoClient("mongodb+srv://phanlachung2004:aggin2004@exercise.5do4n.mongodb.net/?retryWrites=true&w=majority&appName=Exercise")
db = client['Health_database']
collection = db['exercises']

def lambda_handler(event, context):
    exercise_name = event.get('queryStringParameters', {}).get('exercise', 'Plank')
    exercise = collection.find_one({"name": exercise_name})

    if exercise:
        # Trả về thông tin bài tập nếu tìm thấy
        response = {
            "name": exercise["name"],
            "description": exercise["description"],
            "steps": exercise["steps"],
            "benefits": exercise["benefits"]
        }
        return {
            'statusCode': 200,
            'body': json.dumps({
                'success': True,
                'data': response
            })
        }
    else:
        # Trả về thông báo nếu bài tập không tồn tại
        return {
            'statusCode': 404,
            'body': json.dumps({
                'success': False,
                'message': f'Exercise "{exercise_name}" not found.'
            })
        }