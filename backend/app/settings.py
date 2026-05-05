import yaml
import os
import sys
from loguru import logger
from pathlib import Path
from dotenv import load_dotenv

# 环境变量
# 后端根目录（app目录）
BACKEND_ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
logger.info(f"后端根目录: {BACKEND_ROOT_DIR}")

# 将app目录添加到Python路径
if BACKEND_ROOT_DIR not in sys.path:
    sys.path.insert(0, BACKEND_ROOT_DIR)
    logger.info(f"已将根目录添加到Python路径: {BACKEND_ROOT_DIR}")

# 新增：加载 .env 文件（如果存在）
env_path = Path(__file__).parent.parent.parent / ".env"
config_yaml = os.path.join(os.path.dirname(__file__), "config.yaml")
if env_path.exists():
    load_dotenv(env_path)
    logger.info(f"已加载环境变量文件: {env_path}")
else:
    logger.error("Loading .env file failed ! please check .env file is exists")
    logger.info("Then it will use config.yaml")
if not os.path.exists(config_yaml):
    logger.error(f"{config_yaml} is not found")
    raise FileNotFoundError(f"配置文件 {config_yaml} 不存在")

with open(config_yaml, "r", encoding="utf-8") as f:
    config = yaml.safe_load(f)
logger.info(f"已加载配置文件: {config_yaml}")



# 提取配置项为全局变量
ZHIPU = config['ZHIPU']
APP = config['APP']
MYSQL = config['MYSQL']
CHROMA = config.get('CHROMA', {})
RAG = config.get('RAG', {})
VECTOR_STORE = config.get('VECTOR_STORE', {})

# 智谱AI配置（环境变量优先）
ZHIPU_API_KEY = os.getenv('ZHIPU_API_KEY', ZHIPU['API_KEY'])
ZHIPU_MODEL_NAME = os.getenv('ZHIPU_MODEL_NAME', ZHIPU.get('MODEL_NAME', 'glm-4'))
ZHIPU_TEMPERATURE = float(os.getenv('ZHIPU_TEMPERATURE', ZHIPU.get('TEMPERATURE', 0.7)))
ZHIPU_MAX_TOKENS = int(os.getenv('ZHIPU_MAX_TOKENS', ZHIPU.get('MAX_TOKENS', 2000)))

# 应用配置（环境变量优先）
APP_DEBUG = os.getenv('APP_DEBUG', str(APP.get('DEBUG', True))).lower() == 'true'
APP_LOG_LEVEL = os.getenv('APP_LOG_LEVEL', APP.get('LOG_LEVEL', 'INFO'))

# MySQL配置（环境变量优先）
MYSQL_HOST = os.getenv('MYSQL_HOST', MYSQL['HOST'])
MYSQL_PORT = int(os.getenv('MYSQL_PORT', MYSQL['PORT']))
MYSQL_USER = os.getenv('MYSQL_USER', MYSQL['USER'])
MYSQL_PASSWORD = os.getenv('MYSQL_PASSWORD', MYSQL['PASSWORD'])
MYSQL_DB = os.getenv('MYSQL_DB', MYSQL['DB'])

# 提取配置项为全局变量
ZHIPU = config['ZHIPU']
APP = config['APP']
MYSQL = config['MYSQL']
CHROMA = config.get('CHROMA', {})
RAG = config.get('RAG', {})
VECTOR_STORE = config.get('VECTOR_STORE', {})

# 智谱AI配置（环境变量优先）
ZHIPU_API_KEY = os.getenv('ZHIPU_API_KEY', ZHIPU['API_KEY'])
ZHIPU_MODEL_NAME = os.getenv('ZHIPU_MODEL_NAME', ZHIPU.get('MODEL_NAME', 'glm-4'))
ZHIPU_TEMPERATURE = float(os.getenv('ZHIPU_TEMPERATURE', ZHIPU.get('TEMPERATURE', 0.7)))
ZHIPU_MAX_TOKENS = int(os.getenv('ZHIPU_MAX_TOKENS', ZHIPU.get('MAX_TOKENS', 2000)))

# 应用配置（环境变量优先）
APP_DEBUG = os.getenv('APP_DEBUG', str(APP.get('DEBUG', True))).lower() == 'true'
APP_LOG_LEVEL = os.getenv('APP_LOG_LEVEL', APP.get('LOG_LEVEL', 'INFO'))

# MySQL配置（环境变量优先）
MYSQL_HOST = os.getenv('MYSQL_HOST', MYSQL['HOST'])
MYSQL_PORT = int(os.getenv('MYSQL_PORT', MYSQL['PORT']))
MYSQL_USER = os.getenv('MYSQL_USER', MYSQL['USER'])
MYSQL_PASSWORD = os.getenv('MYSQL_PASSWORD', MYSQL['PASSWORD'])
MYSQL_DB = os.getenv('MYSQL_DB', MYSQL['DB'])

# ChromaDB配置（环境变量优先）
CHROMA_PERSIST_DIR = os.getenv('CHROMA_PERSIST_DIR', CHROMA.get('PERSIST_DIR', os.path.join(BACKEND_ROOT_DIR, 'chroma_db')))
CHROMA_COLLECTION_RESUME = os.getenv('CHROMA_COLLECTION_RESUME', CHROMA.get('COLLECTION_RESUME', 'resume_collection'))
CHROMA_COLLECTION_JOB = os.getenv('CHROMA_COLLECTION_JOB', CHROMA.get('COLLECTION_JOB', 'job_collection'))

# RAG配置（环境变量优先）
RAG_CHUNK_SIZE = int(os.getenv('RAG_CHUNK_SIZE', RAG.get('CHUNK_SIZE', '500')))
RAG_CHUNK_OVERLAP = int(os.getenv('RAG_CHUNK_OVERLAP', RAG.get('CHUNK_OVERLAP', '50')))
RAG_TOP_K = int(os.getenv('RAG_TOP_K', RAG.get('TOP_K', '3')))

# 向量存储配置（环境变量优先）
VECTOR_STORE_ENABLED = os.getenv('VECTOR_STORE_ENABLED', str(VECTOR_STORE.get('ENABLED', True))).lower() == 'true'
VECTOR_STORE_MAX_RETRIES = int(os.getenv('VECTOR_STORE_MAX_RETRIES', VECTOR_STORE.get('MAX_RETRIES', '5')))
VECTOR_STORE_RETRY_DELAY = float(os.getenv('VECTOR_STORE_RETRY_DELAY', VECTOR_STORE.get('RETRY_DELAY', '2.0')))
VECTOR_STORE_REQUEST_DELAY = float(os.getenv('VECTOR_STORE_REQUEST_DELAY', VECTOR_STORE.get('REQUEST_DELAY', '1.0')))

# 向量存储配置（环境变量优先）
VECTOR_STORE_ENABLED = os.getenv('VECTOR_STORE_ENABLED', 'true').lower() == 'true'
VECTOR_STORE_MAX_RETRIES = int(os.getenv('VECTOR_STORE_MAX_RETRIES', '5'))
VECTOR_STORE_RETRY_DELAY = float(os.getenv('VECTOR_STORE_RETRY_DELAY', '2.0'))
VECTOR_STORE_REQUEST_DELAY = float(os.getenv('VECTOR_STORE_REQUEST_DELAY', '1.0'))
