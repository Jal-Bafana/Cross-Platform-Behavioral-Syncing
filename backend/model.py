import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import joblib
import re

data_file_path = "C:\\Users\\Kanish Jain\\OneDrive\\Desktop\\Book1.csv"

def clean_text(text):

    text = str(text).lower() 
    text = re.sub(r'[^a-z\s]', '', text)
    return text

try:
    df = pd.read_csv(data_file_path)
    print(f"Successfully loaded data from '{data_file_path}'")
except FileNotFoundError:
    print(f"Error: The file '{data_file_path}' was not found.")
    print("Please ensure the CSV file is in the correct directory or update the 'data_file_path' variable.")
    exit()

df = df[df['label'].astype(str).str.isnumeric()]
df['label'] = df['label'].astype(int)

df = df[['text', 'label']].dropna()
df.reset_index(drop=True, inplace=True)

df['text'] = df['text'].apply(clean_text)

print("Cleaned dataset:")
print(df.head())


X = df['text']
y = df['label']

vectorizer = TfidfVectorizer(stop_words='english', ngram_range=(1, 2), max_features=5000)
X_vectorized = vectorizer.fit_transform(X)

print(f"Shape of vectorized data: {X_vectorized.shape}")


X_train, X_test, y_train, y_test = train_test_split(
    X_vectorized, y, test_size=0.1, random_state=42, stratify=y
)

print(f"Training set size: {X_train.shape[0]} samples")
print(f"Test set size: {X_test.shape[0]} samples")



rf_classifier = RandomForestClassifier(
    n_estimators=300,        # Increased number of trees for better generalization
    max_depth=None,          # Allows trees to grow deeper to capture complex patterns
    class_weight='balanced', # Addresses potential class imbalance
    random_state=42          # For reproducibility
)
rf_classifier.fit(X_train, y_train)


y_pred = rf_classifier.predict(X_test)
y_proba = rf_classifier.predict_proba(X_test)

print(f"\nAccuracy: {accuracy_score(y_test, y_pred):.4f}")
print("\nClassification Report:\n", classification_report(y_test, y_pred))
print("\nConfusion Matrix:\n", confusion_matrix(y_test, y_pred))
model_path = 'random_forest_model2.pkl'
vectorizer_path = 'vectorizer2.pkl'

joblib.dump(vectorizer, vectorizer_path)
joblib.dump(rf_classifier, model_path)

