from agent import encode_text, vector_search_with_phobert, get_retriever, get_llm_and_agent
from langchain_core.documents import Document

# 1. Kiểm tra PhoBERT Embedding
def test_encode_text():
    query = "What is healthy nutrition?"
    embeddings = encode_text(query)
    assert embeddings.shape[0] > 0, "Embedding failed!"
    print("Test encode_text passed!")

# 2. Kiểm tra vector search
def test_vector_search():
    documents = [
        Document(page_content="Eat more vegetables and fruits."),
        Document(page_content="Exercise daily for at least 30 minutes."),
        Document(page_content="Avoid sugary drinks and fast food."),
    ]
    query = "What are good health tips?"
    results = vector_search_with_phobert(query, documents, k=2)
    assert len(results) == 2, "Vector search failed!"
    print("Test vector_search_with_phobert passed!")

# 3. Kiểm tra retriever
def test_get_retriever():
    retriever = get_retriever(None, "How to lose weight?")
    assert retriever is not None, "Retriever initialization failed!"
    print("Test get_retriever passed!")

# 4. Kiểm tra LLM và Agent
def test_llm_and_agent():
    retriever = get_retriever(None, "How to lose weight?")
    agent = get_llm_and_agent(retriever)
    assert agent is not None, "Agent initialization failed!"
    print("Test get_llm_and_agent passed!")

if __name__ == "__main__":
    test_encode_text()
    test_vector_search()
    test_get_retriever()
    test_llm_and_agent()
