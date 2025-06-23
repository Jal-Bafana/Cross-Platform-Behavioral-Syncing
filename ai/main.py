from fastapi import FastAPI, Request
from app.vectorizer import embed_text
from utils.data_loader import classify_sentence
from app.topic_extractor import extract_keywords
from sklearn.metrics.pairwise import cosine_similarity
from pydantic import BaseModel
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from urllib.parse import urlparse
import time
import base64
import re
import datetime
from typing import List
import requests
from fastapi.middleware.cors import CORSMiddleware
from googleapiclient.discovery import build
from dotenv import load_dotenv
from starlette.middleware.sessions import SessionMiddleware
import os
import mysql.connector
from auth import router as auth_router

app = FastAPI()
dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path)

app.add_middleware(
    SessionMiddleware,
    secret_key=os.getenv("SESSION_SECRET_KEY") or "922005",  
    https_only=True,  
    same_site="none",
    max_age=3600,
    path="/"
)

YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")  
GITHUB_TOKEN = os.getenv('GITHUB_TOKEN')
YOUTUBE_API_SERVICE_NAME = "youtube"
YOUTUBE_API_VERSION = "v3"
def get_db():
    return mysql.connector.connect(
    host=os.getenv("DB_HOST"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    database=os.getenv("DB_NAME"),
    port=int(os.getenv("DB_PORT"))
    ) 


app.include_router(auth_router, prefix="/auth")
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
            "per_page": 15
        }
        url = "https://api.github.com/search/repositories"
        response = requests.get(url, headers=headers, params=params)
        if response.status_code != 200:
            print("GitHub API Error:", response.status_code, response.text)
            return []

        data = response.json()
        repos = []
        for item in data["items"]:
            repo_data = {
                "title": item.get("title", ""),
                "url": item.get("html_url", ""),
                "description": item.get("description", "") or "",
                "stars": item.get("stargazers_count", 0),
                "forks": item.get("forks_count", 0),
                "language": item.get("language", "Unknown"),
                "owner": item["owner"]["login"]
            }
            repos.append(repo_data)

        return repos

    except Exception as e:
        print(f"Error in get_github: {e}")
        return []


from googleapiclient.discovery import build
from datetime import datetime, timezone
import isodate

def get_yt(query: str):
    try:
        youtube = build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION, developerKey=YOUTUBE_API_KEY)

        # Step 1: Search videos
        search_request = youtube.search().list(
            q=query,
            part='snippet',
            type='video',
            maxResults=25
        )
        search_response = search_request.execute()

        video_ids = [item['id']['videoId'] for item in search_response['items']]
        if not video_ids:
            return []

        # Step 2: Get video metadata
        video_request = youtube.videos().list(
            part="contentDetails,statistics,snippet",
            id=",".join(video_ids)
        )
        video_response = video_request.execute()
        result = []

        for item in video_response['items']:
            title = item['snippet']['title']
            description = item['snippet']['description']
            channel = item['snippet']['channelTitle']
            published_at = item['snippet']['publishedAt']
            duration = isodate.parse_duration(item['contentDetails']['duration']).total_seconds()
            views = int(item['statistics'].get('viewCount', 0))

            # Convert published date to "how old" format
            published_time = datetime.fromisoformat(published_at.replace('Z', '+00:00'))
            age_days = (datetime.now(timezone.utc) - published_time).days

            video_data = {
                "title": title,
                "description": description,
                "url": f"https://www.youtube.com/watch?v={item['id']}",
                "channel": channel,
                "published_at": published_time.isoformat(),
                "duration_seconds": duration,
                "views": views,
                "age_days": age_days
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
                star_elem_div = card.find_element(By.CLASS_NAME,"cds-RatingStat-sizeLabel")
                star_elem = star_elem_div.find_element(By.TAG_NAME,"span")
                star = star_elem.text.strip()

                ppl_elem = star_elem_div.find_element(By.CSS_SELECTOR,"div.css-vac8rf")
                ppl = ppl_elem.text.strip()

                info_elem_div = card.find_element(By.CLASS_NAME,"cds-CommonCard-metadata")
                info = info_elem_div.find_element(By.TAG_NAME,"p").text.strip()

                if title:
                    response.append({
                        "title": title,
                        "url": href,
                        "provider": provider,
                        "star":star,
                        "ppl":ppl,
                        "info":info
                    })

            except Exception:
                continue

        driver.quit()
        return response

    except Exception as e:
        print(f"Error in get_courses: {e}")
        return []
    
def clean_text(text: str) -> str:
    text = re.sub(r'\s+', ' ', text)  # Remove excessive whitespace
    text = re.sub(r'<.*?>', '', text)  # Remove HTML
    text = re.sub(r'[^\w\s]', '', text)  # Remove special characters
    return text.strip()

def should_update_youtube(user_id: int) -> bool:
    db = get_db()
    db.execute("SELECT last_updated FROM youtube_user_data WHERE user_id = %s", (user_id,))
    row = db.fetchone()
    if not row:
        return True  # No data yet
    return (datetime.now() - row[0]).days > 6

from datetime import datetime
import requests
import mysql.connector
from fastapi import Request
from typing import List

@app.post("/fetch")
def fetch_youtube_behavior(access_token: str, request: Request) -> List[str]:
    headers = {"Authorization": f"Bearer {access_token}"}
    collected = set()
    recent_liked_title = None

    def get_items(url, params=None):
        try:
            res = requests.get(url, headers=headers, params=params)
            if res.status_code == 200:
                return res.json().get("items", [])
            else:
                print("Error:", res.status_code, res.text)
                return []
        except Exception as e:
            print("Request failed:", e)
            return []

    def extract_from_snippet(snippet):
        title = snippet.get("title", "")
        desc = snippet.get("description", "")
        text = clean_text(f"{title} {desc}")
        return text if len(text.split()) > 3 else None

    liked = get_items("https://www.googleapis.com/youtube/v3/videos", {
        "part": "snippet",
        "myRating": "like",
        "maxResults": 20
    })
    for idx, item in enumerate(liked):
        snippet = item.get("snippet", {})
        text = extract_from_snippet(snippet)
        if text:
            collected.add(text)
        if idx == 0:
            recent_liked_title = snippet.get("title", None)

    subs = get_items("https://www.googleapis.com/youtube/v3/subscriptions", {
        "part": "snippet",
        "mine": "true",
        "maxResults": 50
    })
    for sub in subs:
        text = extract_from_snippet(sub.get("snippet", {}))
        if text:
            collected.add(text)

    watch_later = get_items("https://www.googleapis.com/youtube/v3/playlistItems", {
        "part": "snippet",
        "playlistId": "WL",
        "maxResults": 50
    })
    for item in watch_later:
        text = extract_from_snippet(item.get("snippet", {}))
        if text:
            collected.add(text)

    try:
        channel_info = get_items("https://www.googleapis.com/youtube/v3/channels", {
            "part": "snippet,statistics",
            "mine": "true"
        })
        if not channel_info:
            raise Exception("No channel info found.")
        channel = channel_info[0]
        channel_name = channel["snippet"]["title"]
        subscribers = int(channel["statistics"].get("subscriberCount", 0))
    except Exception as e:
        print("Channel info error:", e)
        channel_name = "Unknown"
        subscribers = 0

    try:
        time_spent = int(request.headers.get("X-Time-Spent", "0"))
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT user_id FROM user_tokens WHERE access_token = %s", (access_token,))
        user_id = cursor.fetchone()[0]

        cursor.execute("""
            INSERT INTO youtube_user_data (user_id, channel_name, subscribers, time_spent, recent_liked_video, last_updated)
            VALUES (%s, %s, %s, %s, %s, %s)
            ON DUPLICATE KEY UPDATE
                channel_name = VALUES(channel_name),
                subscribers = VALUES(subscribers),
                time_spent = VALUES(time_spent),
                recent_liked_video = VALUES(recent_liked_video),
                last_updated = VALUES(last_updated)
        """, (
            user_id,
            channel_name,
            subscribers,
            time_spent,
            recent_liked_title,
            datetime.now()
        ))
        db.commit()

    except Exception as e:
        print("DB Error:", e)

    return list(collected)


def fetch_readme_snippet(owner, repo_name, headers, lines=5):
    readme_url = f"https://api.github.com/repos/{owner}/{repo_name}/readme"
    readme_res = requests.get(readme_url, headers=headers)
    if readme_res.status_code != 200:
        return ""

    content = readme_res.json().get("content")
    if not content:
        return ""

    try:
        decoded = base64.b64decode(content).decode("utf-8")
        return "\n".join(decoded.splitlines()[:lines])
    except Exception:
        return ""
    
@app.get("/get_userid")
def get_user_id(email: str):
    db = get_db()
    cursor = db.cursor()

    cursor.execute("""
        SELECT id
        FROM users
        WHERE email = %s
        ORDER BY created_at DESC
        LIMIT 1
    """, (email, ))
    
    result = cursor.fetchone()
    
    if not result:
        return {"error": "Token not found"}

    return result[0]

    
def get_access_token(user_id: int, platform: str):
    db = get_db()
    cursor = db.cursor()

    cursor.execute("""
        SELECT access_token
        FROM user_tokens
        WHERE user_id = %s AND platform = %s
        ORDER BY updated_at DESC
        LIMIT 1
    """, (user_id, platform))
    
    result = cursor.fetchone()
    
    if not result:
        return None

    return result[0]

@app.get("/token")
def get_token(user_id: int, platform: str):
    db = get_db()
    cursor = db.cursor()

    cursor.execute("""
        SELECT access_token
        FROM user_tokens
        WHERE user_id = %s AND platform = %s
        ORDER BY updated_at DESC
        LIMIT 1
    """, (user_id, platform))
    
    result = cursor.fetchone()
    
    if not result:
        return None

    return result[0]

@app.post("/fetch_git")
def fetch_github_behaviour(access_token: str):
    headers = {"Authorization": f"Bearer {access_token}"}

    def safe_get_json(url, params=None):
        try:
            res = requests.get(url, headers=headers, params=params)
            if res.status_code == 200:
                return res.json()
            else:
                print(f"GitHub API Error {url}: {res.status_code} {res.text}")
                return None
        except Exception as e:
            print(f"Request failed for {url}:", e)
            return None

    # Fetch user info
    user_info = safe_get_json("https://api.github.com/user")
    if not isinstance(user_info, dict):
        return {"error": "Failed to fetch GitHub user info"}

    username = user_info.get("login", "")
    total_repos = user_info.get("public_repos", 0)

    # Fetch contributions
    events = safe_get_json(f"https://api.github.com/users/{username}/events/public")
    contributions = 0
    if isinstance(events, list):
        contributions = sum(1 for e in events if e.get("type") in ["PushEvent", "PullRequestEvent", "IssuesEvent"])
    else:
        print("Events data not a list:", events)

    # Starred repos
    starred = safe_get_json("https://api.github.com/user/starred") or []
    total_stars = sum(repo.get("stargazers_count", 0) for repo in starred if isinstance(repo, dict))

    history = []

    # History from starred
    for repo in starred:
        if not isinstance(repo, dict):
            continue
        owner = repo.get("owner", {}).get("login", "")
        name = repo.get("name", "")
        desc = repo.get("description", "")
        readme = fetch_readme_snippet(owner, name, headers)
        history.append(f"{name} {desc} {readme}".strip())

    # User repos
    repos = safe_get_json("https://api.github.com/user/repos") or []
    for repo in repos:
        if not isinstance(repo, dict):
            continue
        name = repo.get("name", "")
        desc = repo.get("description", "")
        readme = fetch_readme_snippet(username, name, headers)
        history.append(f"{name} {desc} {readme}".strip())

    try:
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT user_id FROM user_tokens WHERE access_token = %s", (access_token,))
        user_id = cursor.fetchone()[0]

        cursor.execute("""
            INSERT INTO github_user_data (user_id, public_repos, total_stars, contributions, last_updated)
            VALUES (%s, %s, %s, %s, %s)
            ON DUPLICATE KEY UPDATE
                public_repos = VALUES(public_repos),
                total_stars = VALUES(total_stars),
                contributions = VALUES(contributions),
                last_updated = VALUES(last_updated)
        """, (user_id, total_repos, total_stars, contributions, datetime.now()))
        db.commit()
    except Exception as e:
        print("DB Error (GitHub):", e)

    return {"history": [line for line in history if line]}


@app.get("/get_github_data")
def get_github_data(email: str):
    db = get_db()
    cursor = db.cursor()

    cursor.execute("SELECT id FROM users WHERE email = %s", (email,))
    user_row = cursor.fetchone()

    if not user_row:
        return {"error": "User not found"}

    user_id = user_row[0]

    access_token = get_access_token(user_id=user_id, platform="github")

    try:
        response = requests.post("http://localhost:8000/fetch_git", params={"access_token": access_token})
        history = response.json().get("history",[])
        if response.status_code != 200:
            print("Fetch GitHub failed:", response.text)
        response2 = requests.post(f"http://localhost:8000/recommend-git/?token={access_token}", json={
        "history": history})
    except Exception as e:
        print("Failed to fetch GitHub data internally:", e)

    cursor.execute("""
        SELECT public_repos, total_stars, contributions, last_updated
        FROM github_user_data
        WHERE user_id = %s
    """, (user_id,))
    data = cursor.fetchone()

    if not data:
        return {"error": "No GitHub data found for this user"}

    return {
        "repos": data[0],
        "stars": data[1],
        "contributions": data[2],
        "lastUpdated": data[3].isoformat() if data[3] else None,
    } 

@app.get("/get_youtube_data")
def get_youtube_data(email: str):
    db = get_db()
    cursor = db.cursor()

    cursor.execute("SELECT id FROM users WHERE email = %s", (email,))
    user_row = cursor.fetchone()

    if not user_row:
        return {"error": "User not found"}

    user_id = user_row[0]

    access_token = get_access_token(user_id=user_id, platform="google")
    

    try:
        response = requests.post("http://localhost:8000/fetch", params={"access_token": access_token})
        history = response.json()
        if response.status_code != 200:
            print("Fetch Youtube failed:", response.text)
        response2 = requests.post(f"http://localhost:8000/recommend-yt/?token={access_token}", json={
        "history": history})
    except Exception as e:
        print("Failed to fetch Youtube data internally:", e)

    cursor.execute("""
        SELECT channel_name, subscribers, recent_liked_video, last_updated
        FROM youtube_user_data
        WHERE user_id = %s
    """, (user_id,))
    data = cursor.fetchone()

    if not data:
        return {"error": "No YouTube data found for this user"}

    return {
        "channelName": data[0],
        "subscribers": data[1],
        "recentLikedVideo": data[2],
        "lastUpdated": data[3].isoformat() if data[3] else None
    }

class UserHistory(BaseModel):
    history: list[str]

from datetime import datetime
@app.get("/auth/status")
def auth_status(request: Request):
   
    google_user = request.session.get("google_user")
    google_user = request.session.get("google_user")
    github_user = request.session.get("github_user")

    return {
        "authenticated": bool(google_user or github_user),
        "google_connected": bool(google_user),
        "github_connected": bool(github_user),
        "google_email": google_user.get("email") if google_user else None,
        "google_name": google_user.get("name") if google_user else None,
        "github_email": github_user.get("email") if github_user else None
    }


@app.post("/recommend-yt")
def recommendYT(data: UserHistory, token: str):
    cleaned_history = []
    for item in data.history:
        item = item.replace("#", "").replace("*", "").replace("None", "").strip()
        if len(item) > 5:
            cleaned_history.append(item)

    if not cleaned_history:
        return {
            "source": "youtube",
            "keywords": [],
            "recommendations": [],
            "message": "We couldn't detect much from your recent activity. Try engaging with more content first."
        }

    user_keywords = extract_keywords(cleaned_history)
    filtered_keywords = []
    for keyword_phrase in user_keywords:
        words = keyword_phrase.split()
        for word in words:
            if classify_sentence(word) == 1:
                filtered_keywords.append(word)

    filtered_keywords = list(dict.fromkeys(filtered_keywords))
    print("filtered keywords: ",filtered_keywords)
    if not filtered_keywords:
        return {
            "source": "youtube",
            "keywords": [],
            "recommendations": [],
            "message": "Most of your recent activity is non-educational. Try watching more educational content."
        }


    try:
        user_vector = embed_text(" ".join(filtered_keywords)).reshape(1, -1)
    except Exception as e:
        return {
            "source": "youtube",
            "error": f"Failed to embed user keywords: {str(e)}"
        }

    resources = get_yt(" ".join(filtered_keywords))
    if not resources:
        return {
            "source": "youtube",
            "keywords": user_keywords,
            "recommendations": [],
            "message": "No related videos found on YouTube. Try expanding your topics."
        }

    resource_text = [r['title'] + " " + r['description'] for r in resources]
    try:
        resource_vector = embed_text(resource_text)
    except Exception as e:
        return {
            "source": "youtube",
            "keywords": filtered_keywords,
            "recommendations": [],
            "message": f"Failed to embed YouTube content: {e}"
        }

    try:
        similarities = cosine_similarity(user_vector, resource_vector)[0]
        top_indexes = similarities.argsort()[::-1][:10]
        recommended_videos = [resources[i] for i in top_indexes]
    except Exception as e:
        return {
            "source": "youtube",
            "keywords": filtered_keywords,
            "recommendations": [],
            "message": f"Similarity computation failed: {e}"
        }

    try:
        db = get_db()
        cursor = db.cursor()

        cursor.execute("SELECT user_id FROM user_tokens WHERE access_token = %s", (token,))
        result = cursor.fetchone()
        if result is None:
            raise Exception("Invalid token: user not found.")
        user_id = result[0]

        cursor.execute("DELETE FROM youtube_recommendations WHERE user_id = %s", (user_id,))

        for video in recommended_videos:
            cursor.execute("""
                INSERT INTO youtube_recommendations 
                (user_id, title, description, published_at, duration, views, channel_name,url)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                user_id,
                video['title'],
                video['description'],
                video['published_at'],
                str(video['duration_seconds']) + " seconds", 
                video['views'],
                video['channel'],
                video["url"]
            ))

        db.commit()
    except Exception as e:
        print("DB Error (YouTube recommendation insert):", e)

    return {
        "message":"recommendations stored"
    }

@app.get("/get_github_recommendations")
def get_github_recommendations(email: str):
    db = get_db()
    cursor = db.cursor()

    cursor.execute("SELECT id FROM users WHERE email = %s", (email,))
    user_row = cursor.fetchone()
    if not user_row:
        return {"error": "User not found"}
    user_id = user_row[0]

    cursor.execute("""
        SELECT repo_name, url, description, stars, forks, language, owner
        FROM github_recommendations
        WHERE user_id = %s
        ORDER BY stars DESC
        LIMIT 10
    """, (user_id,))
    rows = cursor.fetchall()

    return [
        {
            "repoName": row[0],
            "url": row[1],
            "description": row[2],
            "stars": row[3],
            "forks": row[4],
            "language": row[5],
            "owner": row[6]
        }
        for row in rows
    ]

@app.get("/get_coursera_recommendations")
def get_coursera_recommendations(email: str):
    db = get_db()
    cursor = db.cursor()

    cursor.execute("SELECT id FROM users WHERE email = %s", (email,))
    user_row = cursor.fetchone()
    if not user_row:
        return {"error": "User not found"}
    user_id = user_row[0]

    cursor.execute("""
        SELECT course_title, provider, enrolled, rating, fetched_at, url, info
        FROM coursera_recommendations
        WHERE user_id = %s
        ORDER BY rating DESC
        LIMIT 10
    """, (user_id,))
    rows = cursor.fetchall()

    return [
        {
            "title": row[0],
            "provider": row[1],
            "enrolled": row[2],
            "rating": row[3],
            "fetchedAt": row[4].isoformat() if row[4] else None,
            "url": row[5],
            "info": row[6]
        }
        for row in rows
    ]

@app.get("/get_youtube_recommendations")
def get_youtube_recommendations(email: str):
    db = get_db()
    cursor = db.cursor()

    cursor.execute("SELECT id FROM users WHERE email = %s", (email,))
    user_row = cursor.fetchone()
    if not user_row:
        return {"error": "User not found"}
    user_id = user_row[0]

    cursor.execute("""
        SELECT title, description, published_at, duration, views, channel_name, url
        FROM youtube_recommendations
        WHERE user_id = %s
        ORDER BY views DESC
        LIMIT 10
    """, (user_id,))
    rows = cursor.fetchall()

    recommendations = [
        {
            "title": row[0],
            "description": row[1],
            "publishedAt": row[2].isoformat() if row[2] else None,
            "duration": row[3],
            "views": row[4],
            "channelName": row[5],
            "url": row[6]
        }
        for row in rows
    ]

    return recommendations



@app.post("/recommend-git")
def recommendGIT(data: UserHistory,token: str):
    cleaned_history = []
    for item in data.history:
        item = item.replace("#", "").replace("*", "").replace("None", "").strip()
        if len(item) > 5:
            cleaned_history.append(item)

    full_text = " ".join(cleaned_history)

    user_keywords = extract_keywords([full_text])
    if not user_keywords:
        return {
            "source": "github",
            "keywords": [],
            "recommendations": [],
            "message": "We couldn't extract meaningful content from your GitHub activity. Try starring or working on more tech-related repositories."
        }

    try:
        user_vector = embed_text(" ".join(user_keywords))
    except Exception as e:
        return {"error": f"Embedding user keywords failed: {e}"}
    resources = get_github(" ".join(user_keywords))
    if not resources:
        return {
            "source": "github",
            "keywords": user_keywords,
            "recommendations": [],
            "message": "No GitHub repositories found matching your interests."
        }

    resource_text = [r['title'] + " " + r['description'] for r in resources]

    try:
        resource_vector = embed_text(resource_text)
    except Exception as e:
        return {"error": f"Embedding resources failed: {e}"}

    try:
        similarities = cosine_similarity(user_vector, resource_vector)[0]
        top_indexes = similarities.argsort()[::-1][:10]
        recommended_titles = [resources[i] for i in top_indexes]
    except Exception as e:
        return {"error": f"Similarity computation failed: {e}"}

    try:
        db = get_db()
        cursor = db.cursor()
        
        cursor.execute("""
            SELECT user_id FROM user_tokens WHERE platform = %s AND access_token = %s
        """, ("github", token))  
        user_id_row = cursor.fetchone()
        if not user_id_row:
            return {"error": "User not found for the given token."}
        user_id = user_id_row[0]

        cursor.execute("DELETE FROM github_recommendations WHERE user_id = %s", (user_id,))

        for repo in recommended_titles:
            cursor.execute("""
                INSERT INTO github_recommendations 
                (user_id, repo_name, url, description, stars, forks, language, owner)
                VALUES (%s, %s, %s, %s, %s, %s, %s,%s)
            """, (
                user_id,
                repo["title"],
                repo["url"],
                repo["description"],
                repo["stars"],
                repo["forks"],
                repo["language"],
                repo["owner"]
            ))
        print("db stored")
        db.commit()
    except Exception as e:
        return {"error": f"DB storage failed: {e}"}

    return {
        "source": "github",
        "keywords": user_keywords,
        "scores": similarities[top_indexes].tolist(),
        "recommendations": recommended_titles
    }

@app.post("/recommend-coursera")
def recommendCOURSERA(data: UserHistory, email:str):
    course_titles = []
    for url in data.history:
        try:
            path = urlparse(url).path  
            parts = path.strip("/").split("/")
            if "learn" in parts:
                slug = parts[-1].replace("-", " ")
                if len(slug) > 3:
                    course_titles.append(slug)
        except Exception:
            continue
    user_keywords = extract_keywords([" ".join(course_titles)])
    if not user_keywords:
        return {"error": "No keywords extracted from user history."}
    user_vector = embed_text(" ".join(user_keywords))
    resources = get_courses(" ".join(user_keywords))
    resource_text = [r['title'] for r in resources]
    resource_vector = embed_text(resource_text)

    similarities = cosine_similarity(user_vector, resource_vector)[0]#compares each vector in resource vector to user_vector and returns a cosine similarity list having same index as resource vector
    top_indexes = similarities.argsort()[::-1][:5]
    recommended_titles = [resources[i] for i in top_indexes]
    try:
        db = get_db()
        cursor = db.cursor()

        cursor.execute("SELECT id FROM users WHERE email = %s", (email,))
        user_id_result = cursor.fetchone()
        if not user_id_result:
            return {"error": "Invalid token: user not found."}
        user_id = user_id_result[0]

        cursor.execute("DELETE FROM coursera_recommendations WHERE user_id = %s", (user_id,))

        for course in recommended_titles:
            cursor.execute("""
                INSERT INTO coursera_recommendations 
                (user_id, course_title, provider, enrolled, rating, fetched_at, url, info)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                user_id,
                course["title"],
                course["provider"],
                course["ppl"],
                course["star"],
                datetime.now(),
                course["url"],
                course["info"]
            ))

        db.commit()
    except Exception as e:
        print("DB Error (Coursera recommendations):", e)

    return {
    "source": "coursera",
    "keywords": user_keywords,
    "scores": similarities.tolist()[:5],
    "recommendations": [
        {
            "title": course["title"],
            "url": course["url"],
            "provider":course["provider"],
            "star":course["star"],
            "ppl":course["ppl"],
            "info":course["info"]
        }
        for course in recommended_titles
    ]
}
@app.get("/debug/session")
def debug_session(request: Request):
    # Test setting a simple session
    request.session["test"] = "hello"
    return {
        "session_keys": list(request.session.keys()),
        "session_data": dict(request.session),
        "cookies": dict(request.cookies)
    }

@app.get("/debug/session/check")
def check_session(request: Request):
    return {
        "session_keys": list(request.session.keys()),
        "session_data": dict(request.session),
        "test_value": request.session.get("test"),
        "cookies": dict(request.cookies)
    }