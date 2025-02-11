import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))
from guard_agent import GuardAgent
from classification_agent import ClassificationAgent
from details_agent import DetailsAgent
from agent_protocol import AgentProtocol
from typing import Dict

class AgentController():
    def __init__(self):
        self.guard_agent = GuardAgent()
        self.classification_agent = ClassificationAgent()
    
        self.agent_dict: Dict[str, AgentProtocol] = {
            "details_agent": DetailsAgent()
        }
    
    def get_response(self, input):
        # Extract User Input
        job_input = input["input"]
        messages = job_input["messages"]
        
        # Get response from guard agent
        guard_agent_response = self.guard_agent.get_response(messages)
        if guard_agent_response["memory"]["guard_decision"] == "not allowed":
            return guard_agent_response
        
        # Get Classification Agent's response
        classification_agent_response = self.classification_agent.get_response(messages)
        chosen_agent = classification_agent_response["memory"]["classification_decision"]
        
        # Get response from chosen agent
        agent = self.agent_dict[chosen_agent]
        response = agent.get_response(messages)
        
        return response