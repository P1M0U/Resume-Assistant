# 🤖 AI简历助手

[中文简体](README.md) | [English](README-EN.md)

![项目状态](https://img.shields.io/badge/status-active-brightgreen) ![Python](https://img.shields.io/badge/python-3.13-blue) ![Vue](https://img.shields.io/badge/vue-3.5%2B-green) ![TypeScript](https://img.shields.io/badge/typescript-6.0%2B-blue) ![FastAPI](https://img.shields.io/badge/fastapi-0.136%2B-red) ![MySQL](https://img.shields.io/badge/mysql-8.0%2B-blue) ![LangChain](https://img.shields.io/badge/langchain-1.2%2B-orange) ![Element Plus](https://img.shields.io/badge/element--plus-2.13%2B-blue) ![Vite](https://img.shields.io/badge/vite-8.0%2B-yellow) ![智谱AI](https://img.shields.io/badge/zhipu--ai-glm--4-purple)

## 🚀 项目简介

**AI简历助手**是一个基于智谱AI大模型的智能简历分析与岗位推荐系统。用户可以上传简历文件（PDF或DOCX格式），系统会智能解析简历内容，提供专业的优化建议，并根据简历内容推荐匹配度高的岗位。

### ✨ 核心功能

- 📄 **简历智能分析**：上传PDF/DOCX格式简历，AI自动解析并提供专业优化建议
- 💼 **岗位智能推荐**：根据简历内容和期望岗位，推荐匹配度高的岗位
- 🤖 **AI智能对话**：与AI助手实时对话，获取简历优化建议和职业规划指导
- 🎯 **技能匹配评估**：分析简历技能与岗位要求的匹配度
- 💡 **优化建议生成**：提供个性化的简历优化建议
- 📊 **分析结果导出**：支持导出简历分析报告和岗位推荐报告
- 🔄 **实时数据更新**：简历分析结果实时同步到岗位推荐模块

## 🛠️ 技术栈

### 前端技术栈

| 技术/框架 | 版本 | 用途 |
|---------|------|------|
| Vue.js | ^3.5.0 | 前端框架 |
| TypeScript | ~6.0.0 | 类型系统 |
| Vue Router | ^5.0.4 | 路由管理 |
| Pinia | ^3.0.4 | 状态管理 |
| Element Plus | ^2.13.7 | UI组件库 |
| Axios | ^1.15.2 | HTTP客户端 |
| Vite | ^8.0.8 | 构建工具 |

### 后端技术栈

| 技术/框架 | 版本 | 用途 |
|---------|------|------|
| FastAPI | 0.136.0 | 后端API框架 |
| LangChain | 1.2.15 | LLM应用框架 |
| LangChain OpenAI | 1.2.1 | OpenAI兼容接口 |
| Pydantic | 2.13.0 | 数据验证 |
| SQLAlchemy | 2.0.49 | ORM框架 |
| Uvicorn | 0.46.0 | ASGI服务器 |
| PyPDF | 6.10.2 | PDF解析 |
| Python-docx | 1.2.0 | DOCX解析 |
| Loguru | 0.7.3 | 日志管理 |
| ChromaDB | - | 向量数据库 |
| httpx | - | HTTP客户端 |

### AI技术栈

| 技术/框架 | 版本 | 用途 |
|---------|------|------|
| 智谱AI GLM-4 | - | 大语言模型 |
| 智谱AI Embedding-3 | - | 文本向量化 |
| LangChain Agents | 1.2.15 | 智能体框架 |
| LangChain Tools | - | 工具集成 |
| RAG | - | 检索增强生成 |

## 📁 项目结构

```
resume_assistant/
├── .trae/                      # Trae配置目录
│   └── rules/                  # 规则配置
│       └── resume-assistant-agents.md  # 项目规则
├── backend/                    # 后端应用
│   ├── app/                    # 应用主目录
│   │   ├── llm/                # LLM相关模块
│   │   │   └── zhipu/          # 智谱AI模块
│   │   │       ├── agents/     # 智能体
│   │   │       │   ├── __init__.py      # 模块初始化
│   │   │       │   ├── chat_agent.py    # AI对话智能体
│   │   │       │   ├── job_agent.py     # 岗位推荐智能体
│   │   │       │   └── resume_agent.py  # 简历分析智能体
│   │   │       ├── prompts/    # 提示词模板
│   │   │       │   ├── job_prompt.py    # 岗位推荐提示词
│   │   │       │   └── resume_prompt.py # 简历分析提示词
│   │   │       ├── rag/        # RAG模块
│   │   │       │   ├── __init__.py      # 模块初始化
│   │   │       │   ├── rag_chain.py     # RAG链
│   │   │       │   ├── text_splitter.py # 文本分块
│   │   │       │   └── vector_store.py  # 向量存储
│   │   │       ├── schemas/    # 数据模型
│   │   │       │   └── resume_schema.py  # 简历相关数据模型
│   │   │       ├── tools/      # 工具集
│   │   │       │   ├── __init__.py      # 模块初始化
│   │   │       │   ├── job_tools.py     # 岗位相关工具
│   │   │       │   └── resume_tools.py  # 简历相关工具
│   │   │       ├── utils/      # 工具函数
│   │   │       │   ├── file_parser.py    # 文件解析
│   │   │       │   └── text_processor.py # 文本处理
│   │   │       ├── chat.py              # 聊天模块
│   │   │       └── embeddings.py        # 向量化模块
│   │   ├── routers/            # API路由
│   │   │   └── v1/              # API版本1
│   │   │       ├── chat_router.py      # AI对话路由
│   │   │       ├── job_router.py       # 岗位推荐路由
│   │   │       ├── main_router.py      # 主路由聚合
│   │   │       ├── rag_router.py       # RAG功能路由
│   │   │       └── resume_router.py    # 简历分析路由
│   │   ├── main.py             # 应用入口
│   │   └── settings.py         # 配置管理
│   └── Dockerfile              # Docker镜像构建文件
├── resume_vue/                 # 前端应用
│   ├── public/                 # 静态资源
│   │   └── favicon.ico         # 网站图标
│   ├── src/                    # 源代码
│   │   ├── __tests__/          # 测试文件
│   │   │   └── App.spec.ts     # App组件测试
│   │   ├── assets/             # 资源文件
│   │   │   ├── css/             # 样式文件
│   │   │   │   ├── AiChatView.css        # AI对话样式
│   │   │   │   ├── App.css              # 应用全局样式
│   │   │   │   ├── HomeView.css         # 首页样式
│   │   │   │   ├── JobRecommend.css     # 岗位推荐样式
│   │   │   │   ├── ResumeAnalysis.css   # 简历分析样式
│   │   │   │   └── SettingsView.css     # 设置样式
│   │   │   └── ts/              # TypeScript逻辑
│   │   │       ├── AiChatView.ts        # AI对话逻辑
│   │   │       ├── HomeView.ts         # 首页逻辑
│   │   │       ├── JobRecommend.ts     # 岗位推荐逻辑
│   │   │       ├── ResumeAnalysis.ts   # 简历分析逻辑
│   │   │       └── SettingsView.ts     # 设置逻辑
│   │   ├── components/         # Vue组件
│   │   │   ├── JobRecommend.vue        # 岗位推荐组件
│   │   │   └── ResumeAnalysis.vue      # 简历分析组件
│   │   ├── router/             # 路由配置
│   │   │   └── index.ts        # 路由定义
│   │   ├── services/           # API服务
│   │   │   ├── chat_api.ts      # AI对话API服务
│   │   │   ├── index.ts         # 主API服务
│   │   │   └── resume_api.ts    # 简历API服务
│   │   ├── stores/             # Pinia状态管理
│   │   │   ├── counter.ts      # 计数器示例
│   │   │   └── resume.ts       # 简历状态管理
│   │   ├── views/              # 页面组件
│   │   │   ├── AiChatView.vue          # AI对话页面
│   │   │   ├── HomeView.vue            # 首页
│   │   │   ├── JobRecommendView.vue    # 岗位推荐页面
│   │   │   ├── ResumeAnalysisView.vue  # 简历分析页面
│   │   │   └── SettingsView.vue        # 设置页面
│   │   ├── App.vue             # 根组件
│   │   └── main.ts             # 应用入口
│   ├── .gitignore              # Git忽略文件
│   ├── .prettierrc.json        # Prettier配置
│   ├── Dockerfile              # Docker镜像构建文件
│   ├── README.md               # 前端项目说明
│   ├── env.d.ts                # 环境变量类型定义
│   ├── index.html              # HTML入口文件
│   ├── nginx.conf              # Nginx配置文件
│   ├── package-lock.json       # 依赖锁定文件
│   ├── package.json            # 项目配置
│   ├── tsconfig.app.json       # 应用TypeScript配置
│   ├── tsconfig.json           # TypeScript主配置
│   ├── tsconfig.node.json      # Node TypeScript配置
│   ├── tsconfig.vitest.json    # Vitest TypeScript配置
│   ├── vite.config.ts          # Vite配置
│   └── vitest.config.ts        # Vitest配置
├── .gitattributes              # Git属性配置
├── .gitignore                  # Git忽略文件
├── docker-compose.yml          # Docker Compose配置
├── LICENSE                     # 许可证文件
├── requirements.txt            # Python依赖列表
├── README.md                   # 项目说明文档
└── README-EN.md                # 英文说明文档
```

## ⚙️ 快速开始

### 环境要求

- **前端**：Node.js ^20.19.0 || >=22.12.0
- **后端**：Python 3.13+
- **数据库**：MySQL 8.0+
- **包管理器**：UV（Python）、npm（Node.js）

### 前端安装与运行

1. 进入前端目录
```bash
cd resume_vue
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

4. 构建生产版本
```bash
npm run build
```

### 后端安装与运行

1. 进入后端目录
```bash
cd backend/app
```

2. 使用UV安装依赖（推荐）
```bash
# 安装UV包管理器
pip install uv

# 使用UV安装依赖
uv pip install -r ../../requirements.txt
```

或使用传统方式：
```bash
pip install -r ../../requirements.txt
```

3. 配置智谱AI和数据库

编辑 `backend/app/config.yaml` 文件：
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

CHROMA:
  PERSIST_DIR: "chroma_db"
  COLLECTION_RESUME: "resume_collection"
  COLLECTION_JOB: "job_collection"

RAG:
  CHUNK_SIZE: 500
  CHUNK_OVERLAP: 50
  TOP_K: 3

VECTOR_STORE:
  ENABLED: true
  MAX_RETRIES: 3
  RETRY_DELAY: 2.0
  REQUEST_DELAY: 1.0

4. 启动后端服务
```bash
uvicorn main:app --reload
```

## 🔗 API文档

后端服务启动后，可以通过以下地址访问自动生成的API文档：

- **Swagger UI**：http://localhost:8000/docs
- **ReDoc**：http://localhost:8000/redoc

### 主要API端点

#### AI对话
- `POST /api/v1/chat/send` - 发送消息给AI助手
- `GET /api/v1/chat/history` - 获取对话历史
- `POST /api/v1/chat/clear` - 清空对话历史

#### 简历分析
- `POST /api/v1/resume/upload` - 上传并分析简历
- `POST /api/v1/resume/analyze` - 分析已上传的简历
- `GET /api/v1/resume/history` - 获取分析历史

#### 岗位推荐
- `POST /api/v1/job/recommend` - 获取岗位推荐

#### RAG功能
- `POST /api/v1/rag/store-resume` - 存储简历到向量库
- `POST /api/v1/rag/search-resumes` - 搜索相似简历
- `POST /api/v1/rag/store-job` - 存储岗位信息到向量库
- `POST /api/v1/rag/search-jobs` - 搜索相似岗位
- `POST /api/v1/rag/chat` - RAG增强对话

#### 系统信息
- `GET /health` - 健康检查
- `GET /welcome` - 欢迎信息

## 📊 数据模型

### 简历分析结果（ResumeAnalysisResult）
- `score`：综合评分（0-100）
- `personal_info`：个人信息（姓名、电话、邮箱、地址）
- `highlights`：简历亮点列表
- `issues`：待改进项列表
- `suggestions`：优化建议列表

### 岗位匹配结果（JobMatchResult）
- `target_job`：目标岗位
- `match_score`：匹配度评分（0-100）
- `matched_skills`：匹配技能列表
- `missing_skills`：缺失技能列表
- `recommendations`：推荐岗位列表
- `optimization_suggestions`：优化建议列表

## 🔧 系统配置

### 配置文件说明

本项目使用**环境变量优先级**的配置策略，支持两种配置方式：

#### 配置优先级

```
环境变量 > config.yaml
```

#### 配置文件说明

| 文件 | 用途 | 是否提交到Git | 说明 |
|------|------|--------------|------|
| `config.yaml` | 默认配置 | ❌ 不提交 | 本地开发默认配置 |
| `.env` | 实际配置 | ❌ 不提交 | 包含真实敏感信息 |
| `.env.example` | 配置模板 | ✅ 提交 | 配置示例，不包含敏感信息 |

### 本地开发配置

1. **创建本地配置文件**

```bash
# 复制配置模板
cp backend/app/config.yaml.example backend/app/config.yaml

# 复制环境变量模板
cp .env.example .env
```

2. **编辑 config.yaml**（本地开发默认配置）

```yaml
ZHIPU:
  API_KEY: "your_zhipu_api_key_here"  # 智谱AI API密钥
  MODEL_NAME: "glm-4-flash-250414"
  TEMPERATURE: 0.7
  MAX_TOKENS: 2000

APP:
  DEBUG: true
  LOG_LEVEL: "INFO"

MYSQL:
  HOST: "localhost"
  PORT: 3306
  USER: "root"
  PASSWORD: "your_mysql_password"  # MySQL密码
  DB: "resume_db"
```

3. **编辑 .env**（可选，优先级更高）

```env
# 智谱AI API密钥
ZHIPU_API_KEY=your_real_api_key_here

# MySQL配置
MYSQL_PASSWORD=your_real_password
```

### Docker 部署配置

Docker 部署时，使用 `.env` 文件配置环境变量：

```env
# 智谱AI API密钥
ZHIPU_API_KEY=your_real_api_key_here
ZHIPU_MODEL_NAME=glm-4-flash-250414

# MySQL配置
MYSQL_HOST=mysql
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_secure_password
MYSQL_DB=resume_db
```

### 配置项说明

#### 智谱AI配置

| 配置项 | 环境变量 | 说明 | 默认值 |
|--------|---------|------|--------|
| API_KEY | ZHIPU_API_KEY | 智谱AI API密钥 | - |
| MODEL_NAME | ZHIPU_MODEL_NAME | 模型名称 | glm-4-flash-250414 |
| TEMPERATURE | ZHIPU_TEMPERATURE | 温度参数 | 0.7 |
| MAX_TOKENS | ZHIPU_MAX_TOKENS | 最大token数 | 2000 |

#### MySQL配置

| 配置项 | 环境变量 | 说明 | 默认值 |
|--------|---------|------|--------|
| HOST | MYSQL_HOST | 数据库地址 | localhost |
| PORT | MYSQL_PORT | 数据库端口 | 3306 |
| USER | MYSQL_USER | 数据库用户 | root |
| PASSWORD | MYSQL_PASSWORD | 数据库密码 | - |
| DB | MYSQL_DB | 数据库名称 | resume_db |

#### ChromaDB配置

| 配置项 | 环境变量 | 说明 | 默认值 |
|--------|---------|------|--------|
| PERSIST_DIR | CHROMA_PERSIST_DIR | 向量数据库存储目录 | chroma_db |
| COLLECTION_RESUME | CHROMA_COLLECTION_RESUME | 简历集合名称 | resume_collection |
| COLLECTION_JOB | CHROMA_COLLECTION_JOB | 岗位集合名称 | job_collection |

#### RAG配置

| 配置项 | 环境变量 | 说明 | 默认值 |
|--------|---------|------|--------|
| CHUNK_SIZE | RAG_CHUNK_SIZE | 文本分块大小 | 500 |
| CHUNK_OVERLAP | RAG_CHUNK_OVERLAP | 分块重叠大小 | 50 |
| TOP_K | RAG_TOP_K | 检索返回数量 | 3 |

#### 向量存储配置

| 配置项 | 环境变量 | 说明 | 默认值 |
|--------|---------|------|--------|
| ENABLED | VECTOR_STORE_ENABLED | 是否启用向量存储 | true |
| MAX_RETRIES | VECTOR_STORE_MAX_RETRIES | 最大重试次数 | 3 |
| RETRY_DELAY | VECTOR_STORE_RETRY_DELAY | 重试基础延迟（秒） | 2.0 |
| REQUEST_DELAY | VECTOR_STORE_REQUEST_DELAY | 请求间延迟（秒） | 1.0 |

### 前端配置

前端通过环境变量进行配置，在项目根目录创建 `.env` 文件：
```env
# 开发环境
VITE_API_BASE_URL=http://localhost:8000

# 生产环境
# VITE_API_BASE_URL=https://api.yourdomain.com
```

## 📝 开发指南

### 代码风格

- **前端**：遵循Vue官方风格指南，使用Prettier格式化代码
- **后端**：遵循PEP 8规范

### 提交规范

使用语义化版本控制，提交信息格式：

```
类型: 描述

详细描述（可选）
```

类型包括：
- `feat`：新功能
- `fix`：修复bug
- `docs`：文档更新
- `style`：代码风格调整
- `refactor`：代码重构
- `test`：测试相关
- `chore`：构建或配置更改

## 🎯 核心特性

### 1. 智能简历分析
- 支持PDF和DOCX格式简历上传
- 自动提取个人信息、教育背景、工作经历等
- 智能识别简历亮点和待改进项
- 提供专业的优化建议

### 2. 精准岗位推荐
- 支持输入期望岗位进行精准推荐
- 支持不输入期望岗位，由AI自动推荐
- 分析技能匹配度和缺失技能
- 推荐多个相关岗位

### 3. AI智能对话
- 与AI助手实时对话
- 获取简历优化建议
- 提供职业规划指导
- 分享面试技巧和薪资谈判策略
- 对话历史记忆功能

### 4. 数据临时存储
- 分析结果仅在当前会话中保留
- 刷新页面后自动重置数据
- 保护用户隐私安全

### 5. 结果导出
- 支持导出简历分析报告（JSON格式）
- 支持导出岗位推荐报告（JSON格式）

### 6. RAG检索增强
- 基于ChromaDB的向量存储
- 智能文本分块与向量化
- 相似简历和岗位检索
- RAG增强的智能对话
- 优雅降级机制（向量存储失败不影响核心功能）

## 🤝 贡献指南

欢迎对本项目进行贡献！请按照以下步骤操作：

1. Fork本仓库
2. 创建您的功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m 'feat: add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启一个Pull Request

## 📜 许可证

本项目采用MIT许可证

## 📧 联系方式

- 项目维护者：PIMOU(Gitee)/P1M0U(Github)
- 项目地址：[Github-P1M0U](https://github.com/P1M0U/resume-assistant)
- 个人邮箱：`p1m0u@foxmail.com`
- 如果觉得对你有用，麻烦请您帮我点一下star ⭐

---

## 🎯 后续优化方向

1. ✅ ~~添加数据库持久化存储分析结果~~
2. 🔐 增加用户认证和权限管理
3. 📱 优化移动端响应式体验
4. 🌐 支持更多简历格式（如图片简历OCR识别）
5. 🤖 集成更多AI模型（如OpenAI GPT、文心一言等）
6. 📊 添加简历评分历史趋势分析
7. 🔍 增加岗位搜索和筛选功能
8. 💾 支持简历模板生成和下载
9. 🚀 使用本地Embedding模型替代API调用（避免限流）

感谢使用AI简历助手！🎉