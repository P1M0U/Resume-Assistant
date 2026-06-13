# AI Resume Assistant

[中文简体](README.md) | [English](README-EN.md)

![Project Status](https://img.shields.io/badge/status-active-brightgreen) ![Version](https://img.shields.io/badge/version-1.1.0-blue) ![Python](https://img.shields.io/badge/python-3.13-blue) ![License](https://img.shields.io/badge/license-MIT-green) ![Vue](https://img.shields.io/badge/vue-3.5%2B-green) ![TypeScript](https://img.shields.io/badge/typescript-6.0%2B-blue) ![FastAPI](https://img.shields.io/badge/fastapi-0.136%2B-red) ![MySQL](https://img.shields.io/badge/mysql-8.0%2B-blue) ![LangChain](https://img.shields.io/badge/langchain-1.2%2B-orange) ![Element Plus](https://img.shields.io/badge/element--plus-2.13%2B-blue) ![Vite](https://img.shields.io/badge/vite-8.0%2B-yellow) ![ZhipuAI](https://img.shields.io/badge/zhipu--ai-glm--4-blueviolet)

---

## Introduction

An intelligent resume analysis and job recommendation system powered by Zhipu AI's large language model. Upload PDF or DOCX resumes, and the system automatically parses content, provides professional optimization suggestions, and recommends matching positions.

## Core Features

- **Smart Resume Analysis** -- Upload PDF/DOCX resumes; AI extracts personal info, skills, provides multi-dimensional scoring and actionable suggestions
- **Job Recommendation** -- Recommend matching positions based on resume content; support custom target positions, skill gap analysis
- **AI Chat** -- Context-aware conversation leveraging resume analysis and job recommendation results for personalized career guidance
- **RAG Enhancement** -- Resume and job data vectorization via ChromaDB; similarity retrieval improves analysis accuracy
- **User Authentication** -- Registration/login, JWT authentication, route permission guards
- **Admin Panel** -- User management and role-based access control
- **Export** -- Export analysis reports and job recommendation results as JSON

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | Vue 3 + TypeScript 6 | Reactive UI |
| UI Kit | Element Plus 2 | Component library |
| State | Pinia 3 | State management |
| Router | Vue Router 5 | Route management |
| Build | Vite 8 | Frontend tooling |
| HTTP | Axios | API communication |
| Backend | FastAPI 0.136 | RESTful API framework |
| LLM | LangChain 1.2 + LangChain-OpenAI | LLM orchestration |
| AI | Zhipu GLM-4-Flash + Embedding-3 | Text generation & embeddings |
| ORM | SQLAlchemy 2.0 | Database operations |
| Vector DB | ChromaDB | Semantic search |
| Database | MySQL 8.0 | User data persistence |
| Parsing | PyPDF / python-docx | PDF/DOCX extraction |

## Project Structure

```
resume_assistant/
├── backend/app/
│   ├── core/                 # Config & security module
│   │   ├── security.py       # JWT + bcrypt auth
│   │   └── config.py         # Config definitions
│   ├── dbs/mysql/            # Database layer
│   │   ├── database.py       # SQLAlchemy engine & session
│   │   └── models/           # Data models
│   ├── llm/zhipu/            # Zhipu AI module
│   │   ├── agents/           # Agents (resume/job/chat)
│   │   ├── prompts/          # Prompt templates
│   │   ├── rag/              # RAG chain
│   │   ├── tools/            # LangChain tools
│   │   └── utils/            # Utilities (JSON extraction, file parsing)
│   ├── routers/v1/           # API routes
│   ├── schemas/              # Pydantic models
│   ├── services/             # Business logic
│   ├── main.py               # Application entry point
│   ├── settings.py           # Configuration loader
│   └── env.yaml              # Environment config
├── resume_vue/src/
│   ├── assets/css/           # Global styles (CSS variables)
│   ├── components/           # Vue components
│   ├── composables/          # Composable functions
│   ├── services/             # API layer
│   ├── stores/               # Pinia stores
│   ├── utils/                # Shared utilities
│   ├── views/                # Page components
│   └── router/               # Route definitions
├── docker-compose.yml
└── requirements.txt
```

## Quick Start

### Prerequisites

- Node.js ^20.19.0 or >=22.12.0
- Python 3.13+
- MySQL 8.0+

### Configuration

Copy the template and fill in your credentials:

```bash
cp backend/app/env.yaml.template backend/app/env.yaml
```

Edit `backend/app/env.yaml`:

```yaml
ZHIPU:
  API_KEY: "your_zhipu_api_key"
  MODEL_NAME: "glm-4-flash-250414"

MYSQL:
  HOST: "localhost"
  PORT: 3306
  USER: "root"
  PASSWORD: "your_password"
  DB: "resume_db"
```

### Start Backend

```bash
cd backend/app

# Install dependencies
pip install uv
uv pip install -r ../../requirements.txt

# Start dev server
uvicorn main:app --reload --port 8000
```

### Start Frontend

```bash
cd resume_vue
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`. API requests are automatically proxied to the backend at `http://localhost:8000`.

### Docker

```bash
docker compose up -d --build
```

## API Documentation

After starting the backend:

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### Key Endpoints

| Category | Method | Path | Description |
|----------|--------|------|-------------|
| User | POST | `/api/v1/user/register` | Register |
| User | POST | `/api/v1/user/login` | Login |
| User | GET | `/api/v1/user/me` | Get current user |
| User | PUT | `/api/v1/user/me` | Update profile |
| User | GET | `/api/v1/user/` | List users (admin) |
| Resume | POST | `/api/v1/resume/upload` | Upload & analyze |
| Job | POST | `/api/v1/resume/job-recommend` | Get recommendations |
| Chat | POST | `/api/v1/chat/send` | Send message |
| Chat | GET | `/api/v1/chat/history` | Get history |
| RAG | POST | `/api/v1/rag/store/resume` | Store resume to vector DB |
| RAG | POST | `/api/v1/rag/search/resume` | Search similar resumes |

## Available Scripts

### Frontend

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Type check + production build |
| `npm run lint` | ESLint code quality check |
| `npm run lint:fix` | Auto-fix ESLint issues |
| `npm run format` | Prettier formatting |
| `npm run type-check` | TypeScript type checking |
| `npm run test:unit` | Run unit tests |

### Admin Setup

```sql
UPDATE user SET is_admin = 1 WHERE name = 'your_username';
```

## Development Guide

- **Code Style** -- Frontend follows Vue style guide + ESLint config; backend follows PEP 8
- **Commit Convention** -- Semantic commits: `feat:` / `fix:` / `refactor:` / `docs:`
- **CSS Variables** -- Theme colors defined in `assets/css/variables.css` -- change once, apply everywhere
- **Custom Agents** -- Extend `agents/base_agent.py` `BaseAgent` class for new AI agents

## License

MIT License.

## Contact

- Maintainer: PIMOU (Gitee) / P1M0U (GitHub)
- Repository: [GitHub](https://github.com/P1M0U/resume-assistant)
- Email: `p1m0u@foxmail.com`
