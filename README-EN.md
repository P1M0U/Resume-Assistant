# 🤖 AI Resume Assistant

[中文简体](README.md) | [English](README-EN.md)

![Project Status](https://img.shields.io/badge/status-active-brightgreen) ![Python](https://img.shields.io/badge/python-3.13-blue) ![Vue](https://img.shields.io/badge/vue-3.5%2B-green) ![TypeScript](https://img.shields.io/badge/typescript-6.0%2B-blue) ![FastAPI](https://img.shields.io/badge/fastapi-0.136%2B-red) ![MySQL](https://img.shields.io/badge/mysql-8.0%2B-blue) ![LangChain](https://img.shields.io/badge/langchain-1.2%2B-orange) ![Element Plus](https://img.shields.io/badge/element--plus-2.13%2B-blue) ![Vite](https://img.shields.io/badge/vite-8.0%2B-yellow) ![Zhipu AI](https://img.shields.io/badge/zhipu--ai-glm--4-purple)

## 🚀 Project Introduction

**AI Resume Assistant** is an intelligent resume analysis and job recommendation system based on Zhipu AI's large language model. Users can upload resume files (PDF or DOCX format), and the system will intelligently parse the resume content, provide professional optimization suggestions, and recommend highly matching positions based on the resume content.

### ✨ Core Features

- 📄 **Intelligent Resume Analysis**: Upload PDF/DOCX format resumes, AI automatically parses and provides professional optimization suggestions
- 💼 **Intelligent Job Recommendation**: Recommend highly matching positions based on resume content and desired position
- 🤖 **AI Intelligent Chat**: Real-time conversation with AI assistant for resume optimization advice and career planning guidance
- 🎯 **Skill Matching Assessment**: Analyze the matching degree between resume skills and job requirements
- 💡 **Optimization Suggestion Generation**: Provide personalized resume optimization suggestions
- 📊 **Analysis Result Export**: Support exporting resume analysis reports and job recommendation reports
- 🔄 **Real-time Data Update**: Resume analysis results are synchronized to the job recommendation module in real-time

## 🛠️ Tech Stack

### Frontend Tech Stack

| Technology/Framework | Version | Purpose |
|---------|------|------|
| Vue.js | ^3.5.0 | Frontend Framework |
| TypeScript | ~6.0.0 | Type System |
| Vue Router | ^5.0.4 | Route Management |
| Pinia | ^3.0.4 | State Management |
| Element Plus | ^2.13.7 | UI Component Library |
| Axios | ^1.15.2 | HTTP Client |
| Vite | ^8.0.8 | Build Tool |

### Backend Tech Stack

| Technology/Framework | Version | Purpose |
|---------|------|------|
| FastAPI | 0.136.0 | Backend API Framework |
| LangChain | 1.2.15 | LLM Application Framework |
| LangChain OpenAI | 1.2.1 | OpenAI Compatible Interface |
| Pydantic | 2.13.0 | Data Validation |
| SQLAlchemy | 2.0.49 | ORM Framework |
| Uvicorn | 0.46.0 | ASGI Server |
| PyPDF | 6.10.2 | PDF Parsing |
| Python-docx | 1.2.0 | DOCX Parsing |
| Loguru | 0.7.3 | Log Management |
| ChromaDB | - | Vector Database |
| httpx | - | HTTP Client |

### AI Tech Stack

| Technology/Framework | Version | Purpose |
|---------|------|------|
| Zhipu AI GLM-4 | - | Large Language Model |
| Zhipu AI Embedding-3 | - | Text Vectorization |
| LangChain Agents | 1.2.15 | Agent Framework |
| LangChain Tools | - | Tool Integration |
| RAG | - | Retrieval-Augmented Generation |

## 📁 Project Structure

```
resume_assistant/
├── backend/app/           # Backend Application
│   ├── llm/zhipu/        # Zhipu AI Module (Agents, Prompts, RAG, Tools)
│   ├── routers/v1/       # API Routes (Resume, Job, Chat, RAG)
│   ├── main.py           # Application Entry
│   └── settings.py       # Configuration Management
├── resume_vue/           # Frontend Application
│   └── src/
│       ├── components/   # Vue Components
│       ├── views/        # Page Components
│       ├── stores/       # State Management
│       └── services/     # API Services
└── requirements.txt      # Python Dependencies
```

## ⚙️ Quick Start

### Requirements

- Node.js ^20.19.0 || >=22.12.0
- Python 3.13+
- MySQL 8.0+

### Frontend Setup

```bash
cd resume_vue
npm install
npm run dev
```

### Backend Setup

```bash
cd backend/app

# Install dependencies (UV recommended)
pip install uv
uv pip install -r ../../requirements.txt

# Configure Zhipu AI and Database
# Edit config.yaml file, fill in API_KEY and database info

# Start service
uvicorn main:app --reload
```

### Configuration

Edit `backend/app/config.yaml`:

```yaml
ZHIPU:
  API_KEY: "your_zhipu_api_key_here"
  MODEL_NAME: "glm-4-flash-250414"

MYSQL:
  HOST: "localhost"
  PORT: 3306
  USER: "root"
  PASSWORD: "your_password"
  DB: "resume_db"
```

## 🔗 API Documentation

After starting backend service, access:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### Main API Endpoints

**AI Chat**
- `POST /api/v1/chat/send` - Send message
- `GET /api/v1/chat/history` - Get chat history

**Resume Analysis**
- `POST /api/v1/resume/upload` - Upload and analyze resume

**Job Recommendation**
- `POST /api/v1/job/recommend` - Get job recommendations

**RAG Features**
- `POST /api/v1/rag/store-resume` - Store resume to vector database
- `POST /api/v1/rag/search-resumes` - Search similar resumes

## 📊 Core Data Models

**Resume Analysis Result**
- `score` - Overall score (0-100)
- `personal_info` - Personal information
- `highlights` - Resume highlights
- `suggestions` - Optimization suggestions

**Job Match Result**
- `target_job` - Target position
- `match_score` - Match score (0-100)
- `matched_skills` - Matched skills
- `missing_skills` - Missing skills
- `recommendations` - Recommended positions

## 🔧 System Configuration

### Configuration Priority

```
Environment Variables > config.yaml
```

### Main Configuration Items

**Zhipu AI**
- `ZHIPU_API_KEY` - API Key
- `ZHIPU_MODEL_NAME` - Model Name (Default: glm-4-flash-250414)

**MySQL**
- `MYSQL_HOST` - Database Host
- `MYSQL_PASSWORD` - Database Password
- `MYSQL_DB` - Database Name

**ChromaDB**
- `CHROMA_PERSIST_DIR` - Vector Database Storage Directory

### Frontend Configuration

Create `.env` file:
```env
VITE_API_BASE_URL=http://localhost:8000
```

## 📝 Development Guide

### Code Style
- Frontend: Follow Vue official style guide, use Prettier for formatting
- Backend: Follow PEP 8 specification

### Commit Convention

Use semantic commits:
```
feat: new feature
fix: bug fix
docs: documentation update
refactor: code refactoring
```

## 🎯 Core Features

### Intelligent Resume Analysis
- Support PDF and DOCX formats
- Automatically extract personal information, education background, work experience
- Intelligently identify highlights and areas for improvement
- Provide professional optimization suggestions

### Precise Job Recommendation
- Support entering desired position or AI automatic recommendation
- Analyze skill matching degree and missing skills
- Recommend multiple related positions

### AI Intelligent Chat
- Real-time conversation for optimization suggestions
- Career planning guidance
- Chat history memory

### RAG Retrieval Enhancement
- Vector storage based on ChromaDB
- Similar resume and job retrieval
- Graceful degradation mechanism

## 🤝 Contributing Guide

Welcome to contribute! Please follow these steps:

1. Fork this repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📜 License

This project uses MIT license

## 📧 Contact

- Project Maintainer: PIMOU(Gitee) / P1M0U(Github)
- Project URL: [Github](https://github.com/P1M0U/resume-assistant)
- Email: `p1m0u@foxmail.com`
- If you find this useful, please give a star ⭐

---

## 🎯 Future Optimization Directions

1. 🔐 Add user authentication and permission management
2. 📱 Optimize mobile responsive experience
3. 🌐 Support more resume formats (OCR recognition)
4. 🤖 Integrate more AI models
5. 📊 Add resume score history trend analysis
6. 🔍 Add job search and filtering functions
7. 💾 Support resume template generation and download

Thank you for using AI Resume Assistant!🎉