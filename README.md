# 🚀 Smart Learning Dashboard

A personalized, full-stack learning insights platform that empowers users to track progress, explore recommended courses, and visualize their learning journey through interactive charts — all in a sleek, modern interface.

---

## 🌟 What It Does

**Smart Learning Dashboard** helps users:

* 🔐 **Log in securely** using their **GitHub** or **Google** accounts via OAuth
* 📚 **Discover tailored learning recommendations** from platforms like YouTube, Coursera, and more
* 📊 **Visualize activity** with insightful charts that track learning trends and skill distribution
* 👤 **View and manage profiles** enriched with GitHub or YouTube data (dummy data used for now)
* 📈 **Monitor progress** through clean dashboards designed for both mobile and desktop

Each user is greeted with a personalized welcome message, smart topic suggestions, and visual data insights — making continuous learning engaging and goal-oriented.

---

## 🧰 Tech Stack

* **Frontend Framework**: [Next.js](https://nextjs.org/) + [React.js](https://react.dev/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **Authentication**: [NextAuth.js](https://next-auth.js.org/)
* **Charts & Visuals**: [React Chart.js 2](https://github.com/reactchartjs/react-chartjs-2)
* **Animations**: [Framer Motion](https://www.framer.com/motion/)
* **Backend**: FastAPI, OAuth 2.0, sentence-transformers, KeyBERT, scikit-learn, Pandas, Selenium

---

## 📄 Pages Overview

* `/login` – Secure OAuth login screen
* `/dashboard` – Main screen with welcome message, course cards & charts
* `/profile` – Displays connected GitHub/YouTube user data (dummy for now)
* `/recommendations` – Curated list of personalized learning suggestions
* `/activity` – Visual insights through interactive charts

---

## 🎨 Design Highlights

* Responsive sidebar & navbar for smooth navigation
* Card-based layout for learning topics
* Dark-light toggle ready (optional)
* Mobile-first, accessible UI
* Hover effects & page transitions for delightful interactions

---

## 📌 Status

✅ **Fully functional** — complete frontend + backend
🔄 **Ready for real-world integration** (API-ready components, dynamic data structures)

---

## 🛠️ Getting Started

### 📦 Clone the Repository

```bash
git clone https://github.com/kanishjn/SyncMind
```

### 🔧 Frontend Setup

```bash
cd frontend
npm install
npm start
```

### 🔧 Backend Setup

```bash
cd backend

# 1. Create a .env file
# 2. Copy the contents from .env.example into .env and fill in your own keys

# 3. Set up a virtual environment
python -m venv venv
venv\Scripts\activate

# 4. Install dependencies
pip install -r requirements.txt

# 5. Run the backend server
uvicorn main:app --reload --host localhost --port 8000
```

> Make sure you have **Python 3.8+** and **Node.js** installed before running the project.

---

## 🙌 Connect & Feedback

We’d love to hear your thoughts, suggestions, or collaboration ideas! Feel free to connect with any of us.

---

**Made with 💙 by [Jal](https://github.com/Jal-Bafana), [Kanish](https://github.com/kanishjn), and [Saurabh](https://github.com/sdsorigins)**
