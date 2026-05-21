# 后端 Dockerfile
FROM docker.m.daocloud.io/library/python:3.13-slim

# 设置工作目录
WORKDIR /app

# 设置环境变量
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    PYTHONPATH=/app/app

# 安装系统依赖
# RUN apt-get update && apt-get install -y --no-install-recommends \
#     && rm -rf /var/lib/apt/lists/*

# 复制依赖文件
COPY requirements.txt .

# 第一步：安装 numpy (体积最大，必须单独安装)
# 使用阿里云源，跳过编译，设置超时
# ------------------------------------------------------------
RUN pip install --no-cache-dir -i https://mirrors.aliyun.com/pypi/simple/ \
    numpy==2.4.4 \
    --timeout 1000

# ------------------------------------------------------------
# 第二步：安装 onnxruntime (体积大)
# ------------------------------------------------------------
RUN pip install --no-cache-dir -i https://mirrors.aliyun.com/pypi/simple/ \
    onnxruntime==1.25.1 \
    --timeout 1000

# ------------------------------------------------------------
# 第三步：安装 chromadb (体积大)
# ------------------------------------------------------------
RUN pip install --no-cache-dir -i https://mirrors.aliyun.com/pypi/simple/ \
    chromadb==1.5.9 \
    --timeout 1000

# ------------------------------------------------------------
# 第四步：安装核心框架 (fastapi, uvicorn, pydantic 等)
# ------------------------------------------------------------
RUN pip install --no-cache-dir -i https://mirrors.aliyun.com/pypi/simple/ \
    fastapi==0.136.0 \
    uvicorn==0.46.0 \
    pydantic==2.13.0 \
    pydantic-settings==2.14.0 \
    sqlalchemy==2.0.49 \
    openai==2.32.0 \
    langgraph==1.1.9 \
    --timeout 1000

# ------------------------------------------------------------
# 第五步：安装 langchain 系列 (体积大)
# ------------------------------------------------------------
RUN pip install --no-cache-dir -i https://mirrors.aliyun.com/pypi/simple/ \
    langchain==1.2.15 \
    langchain-community==0.4.1 \
    langchain-core==1.3.2 \
    langchain-openai==1.2.1 \
    --timeout 1000

# ------------------------------------------------------------
# 第六步：安装剩余的轻量级包 (过滤掉已安装的)
# ------------------------------------------------------------
RUN grep -v "numpy" requirements.txt | \
    grep -v "onnxruntime" | \
    grep -v "chromadb" | \
    grep -v "fastapi" | \
    grep -v "uvicorn" | \
    grep -v "pydantic" | \
    grep -v "pydantic-settings" | \
    grep -v "sqlalchemy" | \
    grep -v "openai" | \
    grep -v "langgraph" | \
    grep -v "langchain" | \
    grep -v "langchain-community" | \
    grep -v "langchain-core" | \
    grep -v "langchain-openai" | \
    xargs pip install --no-cache-dir -i https://mirrors.aliyun.com/pypi/simple/ --timeout 1000 || true

# 安装 Python 依赖（使用阿里云 PyPI 镜像源）
# RUN pip install --no-cache-dir -r requirements.txt -i https://mirrors.aliyun.com/pypi/simple/ --trusted-host mirrors.aliyun.com

# 复制应用代码
COPY app/ ./app/

# 暴露端口
EXPOSE 8000

# 启动命令
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
