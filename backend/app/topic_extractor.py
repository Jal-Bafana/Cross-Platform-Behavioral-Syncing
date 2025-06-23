from keybert import KeyBERT
from sklearn.feature_extraction.text import ENGLISH_STOP_WORDS
model = KeyBERT('all-MiniLM-L6-v2')


def extract_keywords(sentences : list[str],top_n = 3)->list[str]:
    keywords = []
    CUSTOM_STOPWORDS = list(ENGLISH_STOP_WORDS) + [
    "does", "is", "how", "what", "where", "who", "when", "which", "use", "used", "using", "make"
]
    for s in sentences:
        keyword = model.extract_keywords(s,keyphrase_ngram_range=(1,2), stop_words=list(CUSTOM_STOPWORDS), top_n=top_n) #keyphrse_ngram.. is for range of keywords that will be outputted
        keywords.extend(k[0] for k in keyword)#keyword outputs a list: [('xyz', 0.6971)]
    print(keywords)
    return list(set(keywords))#set in python doesn't allows duplicates

