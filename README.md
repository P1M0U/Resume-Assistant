# 🤖 AI简历助手

[中文简体](README.md) | [English](README-EN.md)

![项目状态](https://img.shields.io/badge/status-active-brightgreen) ![Python](https://img.shields.io/badge/python-3.13-blue) ![Vue](https://img.shields.io/badge/vue-3.5%2B-green) ![TypeScript](https://img.shields.io/badge/typescript-6.0%2B-blue) ![FastAPI](https://img.shields.io/badge/fastapi-0.136%2B-red) ![MySQL](https://img.shields.io/badge/mysql-8.0%2B-blue) ![LangChain](https://img.shields.io/badge/langchain-1.2%2B-orange) ![Element Plus](https://img.shields.io/badge/element--plus-2.13%2B-blue) ![Vite](https://img.shields.io/badge/vite-8.0%2B-yellow) ![智谱AI](https://img.shields.io/badge/zhipu--ai-glm--4-purple)

## 🚀 项目简介

基于智谱AI大模型的智能简历分析与岗位推荐系统。支持PDF/DOCX格式简历上传，提供专业的优化建议和岗位匹配推荐。

### ✨ 核心功能

- 📄 **简历智能分析** - 上传PDF/DOCX简历，AI自动解析并提供优化建议
- 💼 **岗位智能推荐** - 根据简历内容推荐匹配岗位，支持自定义期望岗位
- 🤖 **AI智能对话** - 实时对话获取简历优化建议和职业规划指导
- 📊 **结果导出** - 支持导出简历分析报告和岗位推荐报告（JSON格式）
- 🔄 **实时同步** - 简历分析结果实时同步到岗位推荐模块

## 🛠️ 技术栈

**前端**：Vue 3 + TypeScript + Element Plus + Pinia + Vue Router + Vite

**后端**：FastAPI + LangChain + SQLAlchemy + ChromaDB

**AI**：智谱AI GLM-4 + Embedding-3 + RAG

**数据库**：MySQL 8.0+ + ChromaDB

## 📁 项目结构

```
resume_assistant/
├── backend/app/           # 后端应用
│   ├── llm/zhipu/        # 智谱AI模块（智能体、提示词、RAG、工具）
│   ├── routers/v1/       # API路由（简历分析、岗位推荐、AI对话、RAG）
│   ├── main.py           # 应用入口
│   └── settings.py       # 配置管理
├── resume_vue/           # 前端应用
│   └── src/
│       ├── components/   # Vue组件
│       ├── views/        # 页面组件
│       ├── stores/       # 状态管理
│       └── services/     # API服务
└── requirements.txt      # Python依赖
```

## ⚙️ 快速开始

### 环境要求

- Node.js ^20.19.0 || >=22.12.0
- Python 3.13+
- MySQL 8.0+

### 前端运行

```bash
cd resume_vue
npm install
npm run dev
```

### 后端运行

```bash
cd backend/app

# 安装依赖（推荐使用UV）
pip install uv
uv pip install -r ../../requirements.txt

# 配置智谱AI和数据库
# 编辑 config.yaml 文件，填入 API_KEY 和数据库信息

# 启动服务
uvicorn main:app --reload
```

### 配置文件

编辑 `backend/app/config.yaml` 或者 `.env`：

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

## 🔗 API文档

启动后端服务后访问：
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### 主要API端点

**AI对话**
- `POST /api/v1/chat/send` - 发送消息
- `GET /api/v1/chat/history` - 获取对话历史

**简历分析**
- `POST /api/v1/resume/upload` - 上传并分析简历

**岗位推荐**
- `POST /api/v1/job/recommend` - 获取岗位推荐

**RAG功能**
- `POST /api/v1/rag/store-resume` - 存储简历到向量库
- `POST /api/v1/rag/search-resumes` - 搜索相似简历

## 📊 核心数据模型

**简历分析结果**
- `score` - 综合评分（0-100）
- `personal_info` - 个人信息
- `highlights` - 简历亮点
- `suggestions` - 优化建议

**岗位匹配结果**
- `target_job` - 目标岗位
- `match_score` - 匹配度评分（0-100）
- `matched_skills` - 匹配技能
- `missing_skills` - 缺失技能
- `recommendations` - 推荐岗位

## 🔧 系统配置

### 配置优先级

```
环境变量 > config.yaml
```

### 主要配置项

**智谱AI**
- `ZHIPU_API_KEY` - API密钥
- `ZHIPU_MODEL_NAME` - 模型名称（默认：glm-4-flash-250414）

**MySQL**
- `MYSQL_HOST` - 数据库地址
- `MYSQL_PASSWORD` - 数据库密码
- `MYSQL_DB` - 数据库名称

**ChromaDB**
- `CHROMA_PERSIST_DIR` - 向量数据库存储目录

### 前端配置

创建 `.env` 文件：
```env
VITE_API_BASE_URL=http://localhost:8000
```

## 📝 开发指南

### 代码风格
- 前端：遵循Vue官方风格指南，使用Prettier格式化
- 后端：遵循PEP 8规范

### 提交规范

使用语义化提交：
```
feat: 新功能
fix: 修复bug
docs: 文档更新
refactor: 代码重构
```

## 🎯 核心特性

### 智能简历分析
- 支持PDF和DOCX格式
- 自动提取个人信息、教育背景、工作经历
- 智能识别亮点和待改进项
- 提供专业优化建议

### 精准岗位推荐
- 支持输入期望岗位或AI自动推荐
- 分析技能匹配度和缺失技能
- 推荐多个相关岗位

### AI智能对话
- 实时对话获取优化建议
- 职业规划指导
- 对话历史记忆

### RAG检索增强
- 基于ChromaDB的向量存储
- 相似简历和岗位检索
- 优雅降级机制

## 🤝 贡献指南

欢迎贡献！请按以下步骤操作：

1. Fork本仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'feat: add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启Pull Request

## 📜 许可证

本项目采用MIT许可证

## 📧 联系方式

- 项目维护者：PIMOU(Gitee) / P1M0U(Github)
- 项目地址：[Github](https://github.com/P1M0U/resume-assistant)
- 个人邮箱：`p1m0u@foxmail.com`
- 如果觉得有用，请点个star ⭐

---

## 🎯 后续优化方向

1. 🔐 增加用户认证和权限管理
2. 📱 优化移动端响应式体验
3. 🌐 支持更多简历格式（OCR识别）
4. 🤖 集成更多AI模型
5. 📊 添加简历评分历史趋势分析
6. 🔍 增加岗位搜索和筛选功能
7. 💾 支持简历模板生成和下载

感谢使用AI简历助手！🎉