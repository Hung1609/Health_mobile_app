from langchain_google_genai import ChatGoogleGenerativeAI
import os
import json
import re
from copy import deepcopy
from utils import get_chatbot_response
from dotenv import load_dotenv

load_dotenv()

class ClassificationAgent():
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
            Your task is to determine what agent should handle the user's input. You have 3 agents to choose from:
            1. details_agent: This agent is responsible for answering questions that require detailed information about health, nutrition and exercises.
            
            Your output should be in a structured json format like so. each key is a string and each value is a string. Make sure to follow the format exactly:
            {
                "chain of thought": "go over each of the agent above and write some your thoughts about what agent is this input relevant to."
                "decision": "details_agent" or "require_taking_agent" or "recommendation_agent". Pick one of those and only write the word.
                "message": leave the message empty "".
            }
        """
        
        input_messages = [{"role":"system", "content":system_prompt}]
        input_messages += messages[-3:] # take the last 3 messages
        
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
                "agent": "classification_agent",
                "classification_decision": output["decision"]
            }
        }
        return dict_output
        
        