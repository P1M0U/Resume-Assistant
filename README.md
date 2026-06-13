# AI简历助手

[中文简体](README.md) | [English](README-EN.md)

![项目状态](https://img.shields.io/badge/status-active-brightgreen) ![版本](https://img.shields.io/badge/version-1.1.0-blue) ![Python](https://img.shields.io/badge/python-3.13-blue) ![License](https://img.shields.io/badge/license-MIT-green) ![Vue](https://img.shields.io/badge/vue-3.5%2B-green) ![TypeScript](https://img.shields.io/badge/typescript-6.0%2B-blue) ![FastAPI](https://img.shields.io/badge/fastapi-0.136%2B-red) ![MySQL](https://img.shields.io/badge/mysql-8.0%2B-blue) ![LangChain](https://img.shields.io/badge/langchain-1.2%2B-orange) ![Element Plus](https://img.shields.io/badge/element--plus-2.13%2B-blue) ![Vite](https://img.shields.io/badge/vite-8.0%2B-yellow) ![ZhipuAI](https://img.shields.io/badge/zhipu--ai-glm--4-blueviolet)

---

## 项目简介

基于智谱AI大模型的智能简历分析与岗位推荐系统。支持 PDF/DOCX 格式简历上传，AI 自动解析并提供专业优化建议与岗位匹配推荐。

## 核心功能

- **简历智能分析** -- 上传 PDF/DOCX 简历，AI 自动提取个人信息、技能标签，多维度评分并给出优化建议
- **岗位智能推荐** -- 根据简历内容推荐匹配岗位，支持自定义期望岗位，分析技能匹配度与缺失项
- **AI 智能对话** -- 基于简历分析结果和岗位推荐结果，实时对话获取个性化职业规划指导
- **RAG 检索增强** -- 简历和岗位数据向量化存储，基于 ChromaDB 实现相似检索，提升分析准确性
- **用户认证系统** -- 完整的注册登录、JWT 身份认证、路由权限守卫
- **后台管理** -- 管理员用户管理、权限控制
- **结果导出** -- 支持导出简历分析报告和岗位推荐报告（JSON 格式）

## 技术栈

| 层级 | 技术 | 用途 |
|------|------|------|
| 前端框架 | Vue 3 + TypeScript 6 | 响应式界面 |
| UI 组件 | Element Plus 2 | 组件库 |
| 状态管理 | Pinia 3 | 状态管理 |
| 路由 | Vue Router 5 | 路由管理 |
| 构建工具 | Vite 8 | 前端构建 |
| HTTP 客户端 | Axios | API 通信 |
| 后端框架 | FastAPI 0.136 | RESTful API |
| LLM 框架 | LangChain 1.2 + LangChain-OpenAI | LLM 编排 |
| AI 模型 | 智谱 GLM-4-Flash + Embedding-3 | 文本生成与向量化 |
| ORM | SQLAlchemy 2.0 | 数据库操作 |
| 向量数据库 | ChromaDB | 语义检索 |
| 数据库 | MySQL 8.0 | 用户数据持久化 |
| 文件解析 | PyPDF / python-docx | PDF/DOCX 解析 |

## 项目结构

```
resume_assistant/
├── backend/app/              # 后端应用
│   ├── core/                 # 配置与安全模块
│   │   ├── security.py       # JWT + bcrypt 认证
│   │   └── config.py         # 配置定义
│   ├── dbs/mysql/            # 数据库层
│   │   ├── database.py       # SQLAlchemy 引擎与会话
│   │   └── models/           # 数据模型
│   ├── llm/zhipu/            # 智谱AI模块
│   │   ├── agents/           # Agent 智能体（简历分析/岗位推荐/AI对话）
│   │   ├── prompts/          # 提示词模板
│   │   ├── rag/              # RAG 检索增强链
│   │   ├── tools/            # LangChain 工具
│   │   └── utils/            # 工具函数（JSON提取、文件解析）
│   ├── routers/v1/           # API 路由（v1）
│   │   ├── resume_router.py  # 简历分析
│   │   ├── job_router.py     # 岗位推荐
│   │   ├── chat_router.py    # AI对话
│   │   ├── rag_router.py     # RAG 检索
│   │   └── user_router.py    # 用户管理
│   ├── schemas/              # Pydantic 数据模型
│   ├── services/             # 业务逻辑层
│   ├── main.py               # 应用入口
│   ├── settings.py           # 配置加载（YAML）
│   └── env.yaml              # 环境配置文件
├── resume_vue/               # 前端应用
│   └── src/
│       ├── assets/css/       # 全局样式（CSS 变量）
│       ├── components/       # Vue 组件
│       ├── composables/      # 组合式函数
│       ├── services/         # API 调用层
│       ├── stores/           # Pinia 状态管理
│       ├── utils/            # 工具函数
│       ├── views/            # 页面组件
│       └── router/           # 路由配置
├── docker-compose.yml        # Docker 编排
└── requirements.txt          # Python 依赖
```

## 快速开始

### 环境要求

- Node.js ^20.19.0 或 >=22.12.0
- Python 3.13+
- MySQL 8.0+

### 配置文件

复制模板并填写真实信息：

```bash
cp backend/app/env.yaml.template backend/app/env.yaml
```

编辑 `backend/app/env.yaml`，填入智谱 API Key 和 MySQL 连接信息：

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

### 启动后端

```bash
cd backend/app

# 安装依赖
pip install uv
uv pip install -r ../../requirements.txt

# 启动服务
uvicorn main:app --reload --port 8000
```

### 启动前端

```bash
cd resume_vue
npm install
npm run dev
```

前端默认运行在 `http://localhost:5173`，API 请求自动代理到后端 `http://localhost:8000`。

### Docker 部署

```bash
docker compose up -d --build
```

## API 文档

启动后端后访问：

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### 主要端点

| 分类 | 方法 | 路径 | 说明 |
|------|------|------|------|
| 用户 | POST | `/api/v1/user/register` | 注册 |
| 用户 | POST | `/api/v1/user/login` | 登录 |
| 用户 | GET | `/api/v1/user/me` | 获取当前用户 |
| 用户 | PUT | `/api/v1/user/me` | 更新个人信息 |
| 用户 | GET | `/api/v1/user/` | 用户列表（管理员） |
| 简历 | POST | `/api/v1/resume/upload` | 上传并分析简历 |
| 岗位 | POST | `/api/v1/resume/job-recommend` | 岗位推荐 |
| 对话 | POST | `/api/v1/chat/send` | 发送消息 |
| 对话 | GET | `/api/v1/chat/history` | 获取历史 |
| RAG | POST | `/api/v1/rag/store/resume` | 存储简历到向量库 |
| RAG | POST | `/api/v1/rag/search/resume` | 搜索相似简历 |

## 可用脚本

### 前端

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 类型检查 + 生产构建 |
| `npm run lint` | ESLint 代码规范检查 |
| `npm run lint:fix` | 自动修复 ESLint 问题 |
| `npm run format` | Prettier 格式化代码 |
| `npm run type-check` | TypeScript 类型检查 |
| `npm run test:unit` | 运行单元测试 |

### 管理员设置

```sql
UPDATE user SET is_admin = 1 WHERE name = 'your_username';
```

## 开发指南

- **代码规范** -- 前端遵循 Vue 官方风格指南 + ESLint 配置，后端遵循 PEP 8
- **提交规范** -- 语义化提交：`feat:` / `fix:` / `refactor:` / `docs:`
- **CSS 变量** -- 主题色定义在 `assets/css/variables.css`，修改一处即可全局生效
- **AI Agent** -- 自定义 Agent 请继承 `agents/base_agent.py` 中的 `BaseAgent` 基类

## 许可证

本项目采用 MIT 许可证。

## 联系方式

- 项目维护者：PIMOU (Gitee) / P1M0U (GitHub)
- 项目地址：[GitHub](https://github.com/P1M0U/resume-assistant)
- 邮箱：`p1m0u@foxmail.com`
