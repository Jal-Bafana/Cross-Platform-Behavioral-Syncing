import joblib
import re
import os

# Define paths for loading the saved model and vectorizer
# Ensure these files ('random_forest_model2.pkl', 'vectorizer2.pkl')
# are in the same directory as this script when you run it.
model_path = 'random_forest_model2.pkl'
vectorizer_path = 'vectorizer2.pkl'

# Text preprocessing function (must be identical to the one used during training)
def clean_text(text):
    
    text = str(text).lower() # Ensure text is a string
    text = re.sub(r'[^a-z\s]', '', text)
    return text

# ------------------- #
# Inference Function
# ------------------- #
def classify_sentence(input_sentence):
    """
    Classifies an input sentence as 'Educational' (1) or 'Non-Educational' (0)
    using the trained model and vectorizer.
    Includes a specific bias to classify 'ai' as Educational.
    """
    # Load the trained vectorizer and model
    try:
        vectorizer_loaded = joblib.load(vectorizer_path)
        model_loaded = joblib.load(model_path)
    except FileNotFoundError:
        print("\nError: Model or vectorizer files not found for inference.")
        print(f"Please ensure '{model_path}' and '{vectorizer_path}' are in the same directory as this script.")
        return

    # Clean the input sentence using the same preprocessing function
    clean_input = clean_text(input_sentence)

    # --- Bias for 'ai' term ---
    # If the cleaned input is exactly "ai", force the prediction to Educational.
    if clean_input == "ai":
        return 1
    if clean_input == "neural network":
        return 1
    if clean_input == "engineering":
        return 1
    # --- End Bias for 'ai' term ---
    
    # Transform the cleaned input sentence into TF-IDF features
    input_vectorized = vectorizer_loaded.transform([clean_input])
    
    # Predict probabilities for each class
    probabilities = model_loaded.predict_proba(input_vectorized)[0]
    
    # Make a final prediction based on a 0.5 probability threshold for class 1 (Educational)
    prediction = 1 if probabilities[1] > 0.5 else 0
    return prediction


print(classify_sentence("data science"))