# 🤖 AI Resume Assistant

![Project Status](https://img.shields.io/badge/status-active-brightgreen) ![Python](https://img.shields.io/badge/python-3.13-blue) ![Vue](https://img.shields.io/badge/vue-3.5%2B-green) ![TypeScript](https://img.shields.io/badge/typescript-6.0%2B-blue) ![FastAPI](https://img.shields.io/badge/fastapi-0.136%2B-red) ![MySQL](https://img.shields.io/badge/mysql-8.0%2B-blue) ![LangChain](https://img.shields.io/badge/langchain-1.2%2B-orange) ![Element Plus](https://img.shields.io/badge/element--plus-2.13%2B-blue) ![Vite](https://img.shields.io/badge/vite-8.0%2B-yellow) ![Zhipu AI](https://img.shields.io/badge/zhipu--ai-glm--4-purple)

## 🚀 Project Introduction

**AI Resume Assistant** is an intelligent resume analysis and job recommendation system based on Zhipu AI's large language model. Users can upload resume files (PDF or DOCX format), and the system will intelligently parse the resume content, provide professional optimization suggestions, and recommend highly matching positions based on the resume content.

### ✨ Core Features

- 📄 **Intelligent Resume Analysis**: Upload PDF/DOCX format resumes, AI automatically parses and provides professional optimization suggestions
- 💼 **Intelligent Job Recommendation**: Recommend highly matching positions based on resume content and desired position
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

### AI Tech Stack

| Technology/Framework | Version | Purpose |
|---------|------|------|
| Zhipu AI GLM-4 | - | Large Language Model |
| LangChain Agents | 1.2.15 | Agent Framework |
| LangChain Tools | - | Tool Integration |

## 📁 Project Structure

```
resume_assistant/
├── backend/                    # Backend Application
│   └── app/                    # Main Application Directory
│       ├── llm/                # LLM Related Modules
│       │   └── zhipu/          # Zhipu AI Module
│       │       ├── agents/     # Agents
│       │       │   ├── job_agent.py      # Job Recommendation Agent
│       │       │   └── resume_agent.py   # Resume Analysis Agent
│       │       ├── chains/     # Chain Calls
│       │       │   ├── job_recommend_chain.py    # Job Recommendation Chain
│       │       │   └── resume_analyzer_chain.py # Resume Analysis Chain
│       │       ├── memory/     # Memory Modules
│       │       │   ├── conversation_memory.py # Conversation Memory
│       │       │   └── vectory_memory.py    # Vector Memory
│       │       ├── prompts/    # Prompt Templates
│       │       │   ├── job_prompt.py    # Job Recommendation Prompts
│       │       │   └── resume_prompt.py # Resume Analysis Prompts
│       │       ├── schemas/    # Data Models
│       │       │   └── resume_schema.py # Resume Related Data Models
│       │       ├── tools/      # Tool Sets
│       │       │   ├── job_tools.py    # Job Related Tools
│       │       │   ├── resume_tools.py # Resume Related Tools
│       │       │   └── web_tools.py    # Web Search Tools
│       │       ├── utils/      # Utility Functions
│       │       │   ├── file_parser.py    # File Parsing
│       │       │   └── text_processor.py # Text Processing
│       │       ├── chat.py              # Chat Module
│       │       ├── job_recommender.py   # Job Recommendation Main App
│       │       └── resume_analyzer.py   # Resume Analysis Main App
│       ├── routers/            # API Routes
│       │   ├── job_router.py      # Job Recommendation Route
│       │   ├── main_router.py     # Main Route Aggregation
│       │   └── resume_router.py   # Resume Analysis Route
│       ├── main.py             # Application Entry
│       ├── settings.py         # Configuration Management
│       └── config.yaml         # Configuration File
├── resume_vue/                 # Frontend Application
│   ├── public/                 # Static Assets
│   ├── src/                    # Source Code
│   │   ├── assets/             # Asset Files
│   │   │   ├── css/            # Style Files
│   │   │   │   ├── HistoryView.css      # History View Styles
│   │   │   │   ├── HomeView.css        # Home View Styles
│   │   │   │   ├── JobRecommend.css    # Job Recommendation Styles
│   │   │   │   ├── ResumeAnalysis.css  # Resume Analysis Styles
│   │   │   │   └── SettingsView.css    # Settings Styles
│   │   │   └── ts/             # TypeScript Logic
│   │   │       ├── HistoryView.ts      # History View Logic
│   │   │       ├── HomeView.ts        # Home View Logic
│   │   │       ├── JobRecommend.ts    # Job Recommendation Logic
│   │   │       ├── ResumeAnalysis.ts  # Resume Analysis Logic
│   │   │       └── SettingsView.ts    # Settings Logic
│   │   ├── components/         # Vue Components
│   │   │   ├── JobRecommend.vue        # Job Recommendation Component
│   │   │   └── ResumeAnalysis.vue      # Resume Analysis Component
│   │   ├── router/             # Route Configuration
│   │   │   └── index.ts        # Route Definition
│   │   ├── services/           # API Services
│   │   │   ├── index.ts        # Service Export
│   │   │   ├── main_api.ts     # Main API Service
│   │   │   └── resume_api.ts   # Resume API Service
│   │   ├── stores/             # Pinia State Management
│   │   │   ├── counter.ts      # Counter Example
│   │   │   └── resume.ts       # Resume State Management
│   │   ├── views/              # Page Components
│   │   │   ├── HistoryView.vue        # History View Page
│   │   │   ├── HomeView.vue          # Home Page
│   │   │   ├── JobRecommendView.vue  # Job Recommendation Page
│   │   │   ├── ResumeAnalysisView.vue # Resume Analysis Page
│   │   │   └── SettingsView.vue      # Settings Page
│   │   ├── App.vue             # Root Component
│   │   └── main.ts             # Application Entry
│   ├── package.json            # Project Configuration
│   ├── vite.config.ts          # Vite Configuration
│   └── tsconfig.json           # TypeScript Configuration
├── .gitignore                  # Git Ignore File
├── requirements.txt            # Python Dependencies
├── README.md                   # Project Documentation (Chinese)
└── README-EN.md                # Project Documentation (English)
```

## ⚙️ Quick Start

### Requirements

- **Frontend**: Node.js ^20.19.0 || >=22.12.0
- **Backend**: Python 3.13+
- **Database**: MySQL 8.0+
- **Package Managers**: UV (Python), npm (Node.js)

### Frontend Installation and Running

1. Navigate to frontend directory
```bash
cd resume_vue
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

4. Build production version
```bash
npm run build
```

### Backend Installation and Running

1. Navigate to backend directory
```bash
cd backend/app
```

2. Install dependencies using UV (Recommended)
```bash
# Install UV package manager
pip install uv

# Install dependencies using UV
uv pip install -r ../../requirements.txt
```

Or use traditional method:
```bash
pip install -r ../../requirements.txt
```

3. Configure Zhipu AI and Database

Edit `backend/app/config.yaml` file:
```yaml
ZHIPU:
  API_KEY: "your_zhipu_api_key_here"
  MODEL_NAME: "glm-4"
  TEMPERATURE: 0.7
  MAX_TOKENS: 2000

APP:
  DEBUG: true
  LOG_LEVEL: "INFO"

MYSQL:
  HOST: "localhost"
  PORT: 3306
  USER: "your_username"
  PASSWORD: "your_password"
  DB: "resume_assistant"
```

4. Start backend service
```bash
uvicorn main:app --reload
```

## 🔗 API Documentation

After starting the backend service, you can access the auto-generated API documentation at:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Main API Endpoints

#### Resume Analysis
- `POST /api/resume/upload` - Upload and analyze resume
- `POST /api/resume/analyze` - Analyze uploaded resume
- `GET /api/resume/history` - Get analysis history

#### Job Recommendation
- `POST /api/resume/job-recommend` - Get job recommendations

#### System Information
- `GET /api/health` - Health check
- `GET /api/welcome` - Welcome message

## 📊 Data Models

### Resume Analysis Result (ResumeAnalysisResult)
- `score`: Overall score (0-100)
- `personal_info`: Personal information (name, phone, email, location)
- `highlights`: Resume highlights list
- `issues`: Areas for improvement list
- `suggestions`: Optimization suggestions list

### Job Match Result (JobMatchResult)
- `target_job`: Target position
- `match_score`: Match score (0-100)
- `matched_skills`: Matched skills list
- `missing_skills`: Missing skills list
- `recommendations`: Recommended positions list
- `optimization_suggestions`: Optimization suggestions list

## 🔧 System Configuration

### Frontend Configuration

Frontend is configured through environment variables, create `.env` file in project root:
```env
# Development Environment
VITE_API_BASE_URL=http://localhost:8000

# Production Environment
# VITE_API_BASE_URL=https://api.yourdomain.com
```

### Backend Configuration

Backend is configured through `config.yaml` file, mainly including:

- **Zhipu AI Configuration**: API key, model name, temperature parameters, etc.
- **Application Configuration**: Debug mode, log level
- **Database Configuration**: MySQL connection information

## 📝 Development Guide

### Code Style

- **Frontend**: Follow Vue official style guide, use Prettier for code formatting
- **Backend**: Follow PEP 8 specification

### Commit Convention

Use semantic versioning, commit message format:

```
type: description

Detailed description (optional)
```

Types include:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation update
- `style`: Code style adjustment
- `refactor`: Code refactoring
- `test`: Test related
- `chore`: Build or configuration changes

## 🎯 Core Features

### 1. Intelligent Resume Analysis
- Support PDF and DOCX format resume upload
- Automatically extract personal information, education background, work experience, etc.
- Intelligently identify resume highlights and areas for improvement
- Provide professional optimization suggestions

### 2. Precise Job Recommendation
- Support entering desired position for precise recommendation
- Support not entering desired position, AI automatically recommends
- Analyze skill matching degree and missing skills
- Recommend multiple related positions

### 3. Temporary Data Storage
- Analysis results are only retained in current session
- Automatically reset data after page refresh
- Protect user privacy and security

### 4. Result Export
- Support exporting resume analysis report (JSON format)
- Support exporting job recommendation report (JSON format)

## 🤝 Contributing Guide

Welcome to contribute to this project! Please follow these steps:

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project uses MIT license

## 📧 Contact

- Project Maintainer: PIMOU(Gitee)/P1M0U(Github)
- Project URL: [Github-P1M0U](https://github.com/P1M0U/resume-assistant)
- Email: `p1m0u@foxmail.com`
- If you find this useful, please give me a star ⭐

---

## 🎯 Future Optimization Directions

1. 🗄️ Add database persistent storage for analysis results
2. 🔐 Add user authentication and permission management
3. 📱 Optimize mobile responsive experience
4. 🌐 Support more resume formats (such as image resume OCR recognition)
5. 🤖 Integrate more AI models (such as OpenAI GPT, Wenxin Yiyan, etc.)
6. 📊 Add resume score history trend analysis
7. 🔍 Add job search and filtering functions
8. 💾 Support resume template generation and download

Thank you for using AI Resume Assistant!🎉