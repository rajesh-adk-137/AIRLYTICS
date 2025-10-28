
---

# ✈️ AIRLYTICS

<p align="center">
  <a href="https://github.com/rajesh-adk-137/AIRLYTICS/watchers" target="_blank">
    <img src="https://img.shields.io/github/watchers/rajesh-adk-137/AIRLYTICS?style=for-the-badge&logo=appveyor" alt="Watchers"/>
  </a>
  <a href="https://github.com/rajesh-adk-137/AIRLYTICS/fork" target="_blank">
    <img src="https://img.shields.io/github/forks/rajesh-adk-137/AIRLYTICS?style=for-the-badge&logo=appveyor" alt="Forks"/>
  </a>
  <a href="https://github.com/rajesh-adk-137/AIRLYTICS/stargazers" target="_blank">
    <img src="https://img.shields.io/github/stars/rajesh-adk-137/AIRLYTICS?style=for-the-badge&logo=appveyor" alt="Stars"/>
  </a>
</p>

---

## 💡 About App

**AIRLYTICS** is an AI-native airline review intelligence platform built for **🎃 MindsDB Hacktoberfest 2025**.
It transforms unstructured airline reviews into **semantic insights**, **statistical analytics**, and **explainable recommendations** — powered entirely by **MindsDB Knowledge Bases**.

It bridges natural language, data analytics, and business intelligence — allowing users to ask questions like:

> “Among users complaining about check-in delays, how many still recommended the airline?”
> or
> “Show me reviews of passengers who had the best overall experience.”

AIRLYTICS blends **semantic retrieval**, **structured SQL logic**, and **AI-driven interpretation**, providing both raw analytics and meaningful decision insights.

---

## ⚡ Key Features

* **Dual-Mode Intelligence**

  * 🧠 **Semantic Mode:** Find reviews by natural language (e.g. “poor food and late flights”) along with metadata filtering.
  * 📊 **Advanced Analytics Mode:** Ask analytical questions — the agent automatically maps them to the right function.

* **AI InsightInterpreter**

  * Converts numeric outputs into management-ready recommendations.
  * Example:
    ❌ “Wi-Fi ratings are low.”
    ✅ “Wi-Fi below 3 stars drops satisfaction by 68%. Upgrade routers, not catering.”

* **Smart Sampling**

  * Operates on the **top N (~100)** semantically matched reviews per query.
  * Provides a representative sample for faster and focused insights.

* **Five Analytical Engines**

  * `conditional_rating_analysis`
  * `conditional_rating_to_rating_analysis`
  * `conditional_category_to_category_analysis`
  * `conditional_distribution_analysis`
  * `general_percentage_distribution`

* **Rich Visual Interface**

  * Emerald-green themed dashboards with animated cards and contextual insight popups.
  * Dual themes for semantic vs analytical modes.

---

## 🧱 Architecture Overview

| Layer         | Technology                                | Description                            |
| ------------- | ----------------------------------------- | -------------------------------------- |
| **Frontend**  | React (Vite) + TailwindCSS + Lucide Icons | UI, modes, dashboards, popups          |
| **Backend**   | FastAPI (Python)                          | API endpoints for queries & AI agent   |
| **Database**  | MindsDB Knowledge Bases                   | Vector search + metadata hybrid        |
| **AI Engine** | MindsDB Agents + OpenAI/Gemini            | Query interpretation & summarization   |
| **Dataset**   | 20,000+ airline reviews                   | Ratings, sentiments, traveler metadata |

---

## ⚙️ Technologies Used

* **MindsDB**

  * Knowledge Bases for hybrid semantic + structured search
  * Agents for question interpretation
  * SQL interface for analytics execution
* **FastAPI** (Python)

  * `/semantic_query`, `/agent_analysis`, `/interpret` endpoints
* **React + TailwindCSS**

  * Gradient-driven interface with help popups and insight sections
* **OpenAI / Gemini APIs**

  * Used by MindsDB agent for reasoning and context understanding

---

## 🛠️ Installation Guide

### 1. Clone the Repository

```bash
git clone https://github.com/rajesh-adk-137/AIRLYTICS.git
cd AIRLYTICS
```

---

### 2. Frontend Setup

#### 1️⃣ Navigate to the frontend directory

```bash
cd frontend
```

#### 2️⃣ Install dependencies

```bash
yarn install
```

#### 3️⃣ Run the development server

```bash
yarn run dev
```

#### 4️⃣ Access the frontend in your browser

[http://localhost:5173](http://localhost:5173)

---

### 3. Backend Setup

#### 1️⃣ Navigate to the backend directory

```bash
cd ../backend
```

#### 2️⃣ Create and activate a virtual environment

**Windows (PowerShell):**

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

**macOS/Linux:**

```bash
python -m venv venv
source venv/bin/activate
```

#### 3️⃣ Install Python dependencies

```bash
pip install -r requirements.txt
```

#### 4️⃣ Start MindsDB

```bash
docker compose up -d
```

**To stop MindsDB:**

```bash
docker compose down
```

#### 5️⃣ Start the FastAPI backend server

```bash
uvicorn app:app --reload
```

#### 6️⃣ Access URLs

* **MindsDB Studio:** [http://localhost:47334](http://localhost:47334)
* **FastAPI Backend:** [http://localhost:8000](http://localhost:8000)

#### 7️⃣ Setup for MindsDB Queries

Follow the instructions in [`mindsdb_readme.md`](mindsdb/mindsdb_readme.md) to initialize MindsDB with the required **Knowledge Base**, **AI Tables**, and **Agents**.

---


---

## 📊 Example Use Cases

* “Show me reviews where passengers loved the staff but hated Wi-Fi.”
* “Among users complaining about check-in delays, show seat type distribution.”
* “Compare business vs economy travelers mentioning crowded flights.”
* “Find reviews from users who had the best overall experience.”
* “What percentage of passengers with baggage issues still recommended the airline?”

---

## 🎃 MindsDB Hacktoberfest 2025

**Submission for Track 2: Advanced Capabilities**

AIRLYTICS represents a complete RAG-style analytical system demonstrating how **Knowledge Bases** and **Agents** can supercharge BI workflows with zero-ETL, natural language analytics.

### 🏆 Highlights

* Advanced **semantic + SQL hybrid querying**
* **Agent-driven query reinterpretation**
* **AI-powered interpretation** layer for management insights
* **Knowledge Base-first architecture**
* Visual, interpretable analytics UI
* Fully open-source and extendable for other domains (hospitality, retail, CRM, etc.)

---

## 📺 Demo & Screenshots

*(To be added soon — includes UI walkthroughs, MindsDB console queries, and InsightInterpreter results.)*

---

## 🤝 Contributing

1. Fork this repository
2. Create a feature branch

   ```bash
   git checkout -b feature/YourFeature
   ```
3. Commit your changes

   ```bash
   git commit -m "Add YourFeature"
   ```
4. Push the branch

   ```bash
   git push origin feature/YourFeature
   ```
5. Open a Pull Request under **Hacktoberfest 2025**

---

## 📜 License

Licensed under the **MIT License**.
See [LICENSE](https://github.com/rajesh-adk-137/AIRLYTICS/blob/main/LICENSE) for details.

---

## 🧠 Acknowledgments

* **AI & Vector Search:** [MindsDB](https://mindsdb.com)
* **Framework:** [FastAPI](https://fastapi.tiangolo.com/)
* **Frontend:** [React](https://react.dev/) + [TailwindCSS](https://tailwindcss.com/)
* **Dataset:** Real airline review dataset (~20,000 entries)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Concept:** Semantic-driven airline intelligence & RAG analytics for Hacktoberfest 2025

---

