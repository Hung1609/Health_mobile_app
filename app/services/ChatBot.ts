import axios from "axios";
import { ChatMessage } from "./types";

async function callChatBotAPI(messages: ChatMessage[]): Promise<ChatMessage> {
  try {
    const response = await axios.post(
      "http://192.168.1.3:8000/get-response",
      {
        input: { messages },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("API Response:", response.data); // Log the response
    // Extract the response content
    const botResponse = response.data.response;
    console.log("Extracted Bot Response:", botResponse); // Log the extracted response
    return {
      role: botResponse.role,
      content: botResponse.content,
      memory: botResponse.memory,
    };
  } catch (error) {
    console.error("Error calling the API:", error);
    throw error;
  }
}

export { callChatBotAPI };
