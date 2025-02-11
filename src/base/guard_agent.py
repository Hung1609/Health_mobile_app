from langchain_google_genai import ChatGoogleGenerativeAI
import os
import json
import re
from copy import deepcopy
from utils import get_chatbot_response
from dotenv import load_dotenv

load_dotenv()

class GuardAgent():
    def __init__(self):
        self.client = ChatGoogleGenerativeAI(
            model="gemini-1.5-flash",
            temperature=0,
            top_p=0.8,
            max_tokens=2000,
            api_key=os.getenv("GOOGLE_API_KEY_1")
        )
        
    def get_response(self, messages): # from protocol
        messages = deepcopy(messages) # prevent from changing the original messages
        
        system_prompt="""
            You are a helpful chatbot assistant for a health mobile application which gives advices and information about health, nutrition and exercises.
            Your task is to determine whether the user is asking something relevant to their health, nutrition and exercises or not.
            The user is allowed to:
            1. Ask questions about health, like how to lose or gain weight, how to choose the right exercises, etc.
            2. Ask questions about nutrition, they can ask for information about the calories, proteins, fats, etc. in a specific food, how to build their menu based on their status, etc.
            3. Make an order for a specific food or exercise.
            4. Ask about recommendations or what to read or watch to improve their health.
            
            The user is not allowed to:
            Ask questions about anything else other than health, nutrition and exercises and paper related to health, nutrition and exercise.
            
            Your output should be in a structured json format like so. each key is a string and each value is a string. Make sure to follow the format exactly:
            {
                "chain of thought": "go over each of the points above and see if the message lies under this point or not. Then you write some thoughts about what point is this input relevant."
                "decision": "allowed" or "not allowed". Pick one of those and only write the word.
                "message": leave the message empty "" if the input is allowed. Otherwise, write "Sorry, I can't help with that."
            }
        """
        
        input_messages = [{"role":"system", "content":system_prompt}] + messages[-3:]
        
        chatbot_output = get_chatbot_response(self.client, input_messages)
        output = self.postprocess(chatbot_output)
        return output
    
    def postprocess(self, output):
        cleaned_output = re.sub(r"```json\n|\n```", "", output.strip())
        output = json.loads(cleaned_output)
        dict_output = {
            "role": "assistant",
            "content": output["message"],
            "memory": {
                "agent": "guard_agent",
                "guard_decision": output["decision"]
            }
        }
        return dict_output