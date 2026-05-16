# 🤖 AI Resume Assistant

[中文简体](README.md) | [English](README-EN.md)

![Project Status](https://img.shields.io/badge/status-active-brightgreen) ![Version](https://img.shields.io/badge/version-1.1.0-blue) ![Python](https://img.shields.io/badge/python-3.13-blue) ![LICENSE](https://img.shields.io/badge/license-MIT-green) ![Vue](https://img.shields.io/badge/vue-3.5%2B-green) ![TypeScript](https://img.shields.io/badge/typescript-6.0%2B-blue) ![FastAPI](https://img.shields.io/badge/fastapi-0.136%2B-red) ![MySQL](https://img.shields.io/badge/mysql-8.0%2B-blue) ![LangChain](https://img.shields.io/badge/langchain-1.2%2B-orange) ![Element Plus](https://img.shields.io/badge/element--plus-2.13%2B-blue) ![Vite](https://img.shields.io/badge/vite-8.0%2B-yellow) ![Zhipu AI](https://img.shields.io/badge/zhipu--ai-glm--4-purple)

## 🚀 Project Introduction

**AI Resume Assistant** is an intelligent resume analysis and job recommendation system based on Zhipu AI's large language model. Users can upload resume files (PDF or DOCX format), and the system will intelligently parse the resume content, provide professional optimization suggestions, and recommend highly matching positions based on the resume content.

### ✨ Core Features

- 📄 **Intelligent Resume Analysis**: Upload PDF/DOCX format resumes, AI automatically parses and provides professional optimization suggestions
- 💼 **Intelligent Job Recommendation**: Recommend highly matching positions based on resume content and desired position
- 🤖 **AI Intelligent Chat**: Real-time conversation with AI assistant for resume optimization advice and career planning guidance
- 🔐 **User Authentication System**: Complete user registration, login, and JWT authentication functionality
- 👤 **Personal Information Management**: View and edit personal profile, change password
- 🎛️ **Admin Management System**: Administrator user management and permission control (admin only)
- 🛡️ **Route Permission Guard**: Unauthenticated users cannot access protected features
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
| python-jose | 3.4.0 | JWT Token |
| bcrypt | 4.1.2 | Password Hashing |
| email-validator | 2.2.0 | Email Validation |

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

**User Authentication**
- `POST /api/v1/user/register` - User registration
- `POST /api/v1/user/login` - User login
- `GET /api/v1/user/me` - Get current user info
- `PUT /api/v1/user/me` - Update current user info
- `GET /api/v1/user/` - Get all users list (Admin)
- `PUT /api/v1/user/{user_id}` - Update user info (Admin)
- `DELETE /api/v1/user/{user_id}` - Delete user (Admin)

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

## 🔐 User Authentication & Management

- User registration, login, JWT authentication
- Personal information viewing and editing
- Admin management system (admin only)
- Route permission guard
- Automatic token validation

**Create Admin Account**
```sql
UPDATE user SET is_admin = 1 WHERE name = 'your_username';
```

## 📊 Core Data Models

**Resume Analysis Result**: score, personal_info, highlights, suggestions

**Job Match Result**: target_job, match_score, matched_skills, missing_skills, recommendations

## 🔧 System Configuration

**Configuration Priority**: Environment Variables > config.yaml

**Main Configuration Items**
- Zhipu AI: API_KEY, MODEL_NAME
- MySQL: HOST, PASSWORD, DB
- ChromaDB: PERSIST_DIR

**Frontend Configuration**: Create `.env` file and set `VITE_API_BASE_URL`

## 📝 Development Guide

- Code Style: Frontend follows Vue official style guide, Backend follows PEP 8 specification
- Commit Convention: Use semantic commits (feat/fix/docs/refactor)

## 🎯 Core Features

- **User Authentication & Permission Management**: Registration/login, JWT auth, route guard, admin permissions
- **Personal Information Management**: View/edit profile, change password
- **Admin Management System**: User management, permission control (admin only)
- **Intelligent Resume Analysis**: Support PDF/DOCX, auto-extract info, optimization suggestions
- **Precise Job Recommendation**: Skill matching, missing skills analysis, multiple job recommendations
- **AI Intelligent Chat**: Real-time conversation, career planning, history memory
- **RAG Retrieval Enhancement**: Vector storage, similar retrieval, graceful degradation

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

1. ✅ ~~Add user authentication and permission management~~ (Completed)
2. ✅ ~~Optimize mobile responsive experience~~ (Completed)
3. 🌐 Support more resume formats (OCR recognition)
4. 🤖 Integrate more AI models
5. 📊 Add resume score history trend analysis
6. 🔍 Add job search and filtering functions
7. 💾 Support resume template generation and download
8. 📧 Email verification and password recovery

Thank you for using AI Resume Assistant!🎉