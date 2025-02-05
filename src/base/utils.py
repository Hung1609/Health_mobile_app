def get_chatbot_response(client, messages):
    input_messages = []
    for message in messages:
        input_messages.append({"role": message["role"], "content": message["content"]})
        
    response = client.invoke(
        input=input_messages,
    ).content # take content of an AIMessage
    
    return response

def get_embedding(embedding_client, text_input):
    output = embedding_client.embed_content(
        model = "models/embedding-001",
        content=[text_input],
    )
    
    embeddings=[]
    for embedding_object in output["embedding"]:
        embeddings.append(embedding_object)
        
    return embeddings