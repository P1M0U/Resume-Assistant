import os
import sys
import yaml
from loguru import logger
from pathlib import Path

BACKEND_ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
logger.info(f"后端根目录: {BACKEND_ROOT_DIR}")

if BACKEND_ROOT_DIR not in sys.path:
    sys.path.insert(0, BACKEND_ROOT_DIR)
    logger.info(f"已将根目录添加到Python路径: {BACKEND_ROOT_DIR}")


def detect_environment():
    """
    自动检测当前运行环境
    优先级: ENV环境变量 > Docker检测 > Windows检测 > 默认
    """
    explicit_env = os.getenv('ENV', '').lower()
    if explicit_env in ['windows', 'linux', 'production', 'development']:
        return explicit_env

    if os.path.exists('/.dockerenv') or os.environ.get('DOCKER_CONTAINER'):
        return 'linux'

    if sys.platform == 'win32':
        return 'windows'

    return 'linux'


ENV_NAME = detect_environment().upper()
logger.info(f"检测到运行环境: {ENV_NAME}")

config_file = Path(__file__).parent / "env.yaml"
if not config_file.exists():
    logger.error(f"配置文件不存在: {config_file}")
    raise FileNotFoundError(f"配置文件 {config_file} 不存在")

with open(config_file, "r", encoding="utf-8") as f:
    all_config = yaml.safe_load(f)

if ENV_NAME not in all_config:
    logger.error(f"配置文件中未找到环境: {ENV_NAME}")
    raise KeyError(f"配置文件中未找到环境: {ENV_NAME}")

config = all_config[ENV_NAME]
logger.info(f"已加载配置文件: {config_file} [{ENV_NAME}]")

ZHIPU = config.get('ZHIPU', {})
APP = config.get('APP', {})
MYSQL = config.get('MYSQL', {})
CHROMA = config.get('CHROMA', {})
RAG = config.get('RAG', {})
VECTOR_STORE = config.get('VECTOR_STORE', {})

ZHIPU_API_KEY = ZHIPU.get('API_KEY', '')
ZHIPU_MODEL_NAME = ZHIPU.get('MODEL_NAME', 'glm-4-flash-250414')
ZHIPU_TEMPERATURE = float(ZHIPU.get('TEMPERATURE', 0.7))
ZHIPU_MAX_TOKENS = int(ZHIPU.get('MAX_TOKENS', 4096))

APP_DEBUG = str(APP.get('DEBUG', False)).lower() == 'true'
APP_LOG_LEVEL = APP.get('LOG_LEVEL', 'INFO')

MYSQL_HOST = MYSQL.get('HOST', 'localhost')
MYSQL_PORT = int(MYSQL.get('PORT', 3306))
MYSQL_USER = MYSQL.get('USER', 'root')
MYSQL_PASSWORD = MYSQL.get('PASSWORD', '')
MYSQL_DB = MYSQL.get('DB', 'resume_assistant')

CHROMA_PERSIST_DIR = CHROMA.get(
    'PERSIST_DIR', os.path.join(BACKEND_ROOT_DIR, 'chroma_db'))
CHROMA_COLLECTION_RESUME = CHROMA.get('COLLECTION_RESUME', 'resume_collection')
CHROMA_COLLECTION_JOB = CHROMA.get('COLLECTION_JOB', 'job_collection')

RAG_CHUNK_SIZE = int(RAG.get('CHUNK_SIZE', 500))
RAG_CHUNK_OVERLAP = int(RAG.get('CHUNK_OVERLAP', 50))
RAG_TOP_K = int(RAG.get('TOP_K', 3))

VECTOR_STORE_ENABLED = str(VECTOR_STORE.get('ENABLED', True)).lower() == 'true'
VECTOR_STORE_MAX_RETRIES = int(VECTOR_STORE.get('MAX_RETRIES', 5))
VECTOR_STORE_RETRY_DELAY = float(VECTOR_STORE.get('RETRY_DELAY', 2.0))
VECTOR_STORE_REQUEST_DELAY = float(VECTOR_STORE.get('REQUEST_DELAY', 1.0))
