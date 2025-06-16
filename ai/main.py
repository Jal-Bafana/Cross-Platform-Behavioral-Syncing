from fastapi import FastAPI, Request
from app.vectorizer import embed_text
from app.topic_extractor import extract_keywords
from sklearn.metrics.pairwise import cosine_similarity
from pydantic import BaseModel
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import time
import requests
from fastapi.middleware.cors import CORSMiddleware
from googleapiclient.discovery import build
from dotenv import load_dotenv
import os

app = FastAPI()
dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path)
YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")  # This fetches the key from env
GITHUB_TOKEN = os.getenv('GITHUB_TOKEN')
YOUTUBE_API_SERVICE_NAME = "youtube"
YOUTUBE_API_VERSION = "v3"

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or "*" for all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
def get_github(query: str):
    try:
        headers = {
            "Authorization": f"Bearer {GITHUB_TOKEN}",
            "Accept": "application/vnd.github+json"
        }
        params = {
            "q": query,
            "sort": "stars",
            "order": "desc",
            "per_page": 10
        }
        url = "https://api.github.com/search/repositories"
        response = requests.get(url, headers=headers, params=params)
        if response.status_code != 200:
            print("GitHub API Error:", response.status_code, response.text)
            return []

        data = response.json()
        repos = []
        for item in data["items"]:
            repos.append({
                "title": item["name"],
                "description": item["description"] or "",
                "url": item["html_url"],
                "owner": item["owner"]["login"]
            })
        return repos
    except Exception as e:
        print(f"Error in get_github: {e}")
        return []


def get_yt(query: str):
    try:
        youtube = build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION, developerKey=YOUTUBE_API_KEY)  # this creates a service
        request = youtube.search().list(
            q=query,
            part='snippet',
            type='video',
            maxResults=50
        )
        response = request.execute()
        result = []
        for item in response['items']:
            video_data = {
                "title": item['snippet']['title'],
                "description": item['snippet']['description'],
                "url": f"https://www.youtube.com/watch?v={item['id']['videoId']}",
                "channel": item['snippet']['channelTitle']
            }
            result.append(video_data)
        return result
    except Exception as e:
        print(f"Error in get_yt: {e}")
        return []


def get_courses(query: str):
    try:
        chrome_options = Options()#used to choose how browser behaves when launched by selenium
        chrome_options.add_argument("--headless=new")#This runs Chrome in headless mode, meaning without opening a visible browser window.
        chrome_options.add_argument("--disable-gpu")#Disables GPU acceleration.
        chrome_options.add_argument("--log-level=3")#Reduces the amount of logging output from Chrome.
        driver = webdriver.Chrome(options=chrome_options)

        url = f"https://www.coursera.org/search?query={query.replace(' ', '%20')}"
        driver.get(url)
        time.sleep(5)

        # Get all list items (course cards)
        course_cards = driver.find_elements(By.TAG_NAME, "li")

        seen_links = set()
        response = []

        for card in course_cards:
            try:
                a_tag = card.find_element(By.TAG_NAME, "a")
                href = a_tag.get_attribute("href")

                if not href or "/learn/" not in href or href in seen_links:
                    continue
                seen_links.add(href)

                title_elem = a_tag.find_element(By.TAG_NAME, "h3")
                title = title_elem.text.strip()

                provider_elem = card.find_element(By.CLASS_NAME, "cds-ProductCard-partnerNames")
                provider = provider_elem.text.strip()

                if title:
                    response.append({
                        "title": title,
                        "url": href,
                        "provider": provider
                    })

            except Exception:
                continue

        driver.quit()
        return response

    except Exception as e:
        print(f"Error in get_courses: {e}")
        return []


class UserHistory(BaseModel):
    history: list[str]

@app.post("/recommend-yt")
def recommendYT(data: UserHistory):
    user_keywords = extract_keywords(data.history)
    if not user_keywords:
        return {"error": "No keywords extracted from user history."}
    print(user_keywords)
    user_vector = embed_text(" ".join(user_keywords))
    resources = get_yt(" ".join(user_keywords))
    resource_text = [r['title'] + " " + r['description'] for r in resources]
    resource_vector = embed_text(resource_text)

    similarities = cosine_similarity(user_vector, resource_vector)[0]#compares each vector in resource vector to user_vector and returns a cosine similarity list having same index as resource vector
    top_indexes = similarities.argsort()[::-1][:5]
    recommended_titles = [resources[i] for i in top_indexes]
    return {
        "source": "youtube",
        "keywords": user_keywords,
        "scores": similarities.tolist()[:5],
        "recommendations": recommended_titles
    }

@app.post("/recommend-git")
def recommendGIT(data: UserHistory):
    user_keywords = extract_keywords(data.history)
    if not user_keywords:
        return {"error": "No keywords extracted from user history."}
    print(user_keywords)
    user_vector = embed_text(" ".join(user_keywords))
    resources = get_github(" ".join(user_keywords))
    resource_text = [r['title'] + " " + r['description'] for r in resources]
    resource_vector = embed_text(resource_text)

    similarities = cosine_similarity(user_vector, resource_vector)[0]#compares each vector in resource vector to user_vector and returns a cosine similarity list having same index as resource vector
    top_indexes = similarities.argsort()[::-1][:5]
    recommended_titles = [resources[i] for i in top_indexes]
    return {
    "source": "github",
    "keywords": user_keywords,
    "scores": similarities.tolist()[:5],
    "recommendations": [
        {
            "title": repo["title"],
            "description": repo["description"],
            "url": repo["url"],
            "owner": repo["owner"]
        }
        for repo in recommended_titles
    ]
}

@app.post("/recommend-coursera")
def recommendCOURSERA(data: UserHistory):
    user_keywords = extract_keywords(data.history)
    if not user_keywords:
        return {"error": "No keywords extracted from user history."}
    print(user_keywords)
    user_vector = embed_text(" ".join(user_keywords))
    resources = get_courses(" ".join(user_keywords))
    resource_text = [r['title'] for r in resources]
    resource_vector = embed_text(resource_text)

    similarities = cosine_similarity(user_vector, resource_vector)[0]#compares each vector in resource vector to user_vector and returns a cosine similarity list having same index as resource vector
    top_indexes = similarities.argsort()[::-1][:5]
    recommended_titles = [resources[i] for i in top_indexes]
    return {
    "source": "coursera",
    "keywords": user_keywords,
    "scores": similarities.tolist()[:5],
    "recommendations": [
        {
            "title": course["title"],
            "url": course["url"],
            "provider":course["provider"]
        }
        for course in recommended_titles
    ]
}
   