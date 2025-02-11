from dotenv import load_dotenv
import os
from utils import get_chatbot_response, get_embedding
from langchain_google_genai import ChatGoogleGenerativeAI
import google.generativeai as genai
from copy import deepcopy
from pinecone import Pinecone


load_dotenv()

class DetailsAgent():
    def __init__(self):
        self.client = ChatGoogleGenerativeAI(
            model="gemini-1.5-flash",
            temperature=0,
            top_p=0.8,
            max_tokens=2000,
            api_key=os.getenv("GOOGLE_API_KEY_1")
        )
        
        genai.configure(api_key=os.getenv("GOOGLE_API_KEY_3"))
        self.embedding_client = genai
        
        self.pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
        self.index_name = os.getenv("PINECONE_INDEX_NAME")
        
    def get_closest_results(self, index_name, input_embedding, k=2):
        index = self.pc.Index(index_name)
        
        results = index.query(
            namespace="ns1",
            vector=input_embedding, 
            top_k=k,
            include_values=False,
            include_metadata=True,
        )
        return results
    
    def get_response(self, messages):
        messages = deepcopy(messages)
        
        user_message = messages[-1]["content"]
        embeddings = get_embedding(self.embedding_client, user_message)[0]
        # check if the generated embedding is of the correct dimension
        if len(embeddings) != 768:
            raise ValueError(f"Generated embedding dimension {len(embeddings)} does not match required dimension 768")
        result = self.get_closest_results(self.index_name, embeddings) # return top 2 closest results
        source_knowledge = "\n" .join([x['metadata']['text'].strip()+'\n' for x in result['matches']])
        
        prompt = f"""
        Using the contexts below answer the query:
        
        Contexts:
        {source_knowledge}
        
        Query: {user_message}
        """
        
        system_prompt = """
        You are a customer support agent for a health mobile application called HealthCare. You should answer every question as if you are trainer and provide necessary information to the user regarding to their requires.
        """
        messages[-1]["content"] = prompt
        input_messages = [{"role":"system", "content":system_prompt}] + messages[-3:]
        chatbot_output = get_chatbot_response(self.client, input_messages)
        output = self.postprocess(chatbot_output)
        return output
    
    def postprocess(self, output):
        dict_output = {
            "role": "assistant",    
            "content": output,
            "memory": {
                "agent": "details_agent",
            }
        }
        return dict_output