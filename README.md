
# 🧠 Smart Document Summarizer  
### Hybrid AI Engineer Project – Phase 1 (AI Integrator)

An AI-powered web application that summarizes long documents into concise, structured insights using **Google Gemini Pro**.  
Built with **React, Node.js, and Express**, following secure, production-grade AI integration practices.

---

## 🚀 Project Overview

The **Smart Document Summarizer** allows users to input long-form text and receive an AI-generated summary in seconds.  
This project focuses on **integrating Large Language Models (LLMs)** into real-world web applications rather than training models from scratch.

It demonstrates how modern software engineers can leverage AI services responsibly, securely, and efficiently.

---

## 🎯 Objectives

- Integrate AI capabilities into an existing full-stack workflow
- Understand and apply prompt engineering techniques
- Handle AI latency, security, and API orchestration
- Build a CV-ready AI-integrated web application

---

## 🏗️ System Architecture

```

React Frontend
↓
Node.js / Express API
↓
Google Gemini Pro API
↓
AI-generated summary
↓
Frontend UI

````

### Why this architecture?
- Prevents API key exposure
- Allows validation and prompt control
- Scalable and production-ready

---

## 🧠 Core AI Concepts Used

- **Prompt Engineering** – Structured prompts for consistent summaries  
- **Tokens** – Input size awareness to reduce latency and cost  
- **Temperature Control** – Low randomness for factual summarization  
- **Latency Handling** – Async processing with UI feedback  

---

## 🛠️ Tech Stack

### Frontend
- React
- JavaScript / TypeScript
- Fetch API
- Tailwind CSS (optional)

### Backend
- Node.js
- Express.js
- Google Gemini Pro API
- dotenv
- CORS

### Deployment
- Frontend: **Vercel**
- Backend: **Render / Railway / Azure**

---

## 🔐 API Key Management

This project uses **Google Gemini Pro**, which requires an API key.

### Setup
1. Generate an API key from **Google AI Studio**
2. Store it securely in a `.env` file:
   ```env
   GEMINI_API_KEY=your_api_key_here


3. Never expose the key in frontend code
4. Add `.env` to `.gitignore`

---

## ⚙️ Features

* AI-powered document summarization
* Secure backend-based AI calls
* Clean and responsive UI
* Error handling and validation
* Scalable API architecture

---

## 🧪 Future Enhancements

* PDF upload and text extraction
* Role-based summarization (Admin / Organizer / User)
* Token usage limits and analytics
* Multi-language summarization
* Integration into existing systems (e.g., EventLanka)

---

## 📚 Learning Outcomes

* Practical understanding of AI integration
* Experience with LLM APIs in production
* Secure API design patterns
* Prompt engineering as an engineering skill

---
Just tell me 🚀
```
