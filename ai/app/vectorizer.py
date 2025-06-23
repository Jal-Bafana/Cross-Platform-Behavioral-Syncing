model = None

def embed_text(text: str):
    global model
    if model is None:
        from sentence_transformers import SentenceTransformer
        model = SentenceTransformer('all-MiniLM-L6-v2')
    if isinstance(text, str):
        text = [text]
    return model.encode(text, convert_to_tensor=True)
#When convert_to_tensor is set to True, it instructs the encode method to return the generated embeddings as a tensor (a multi-dimensional array, similar to NumPy arrays but optimized for deep learning operations on GPUs).



