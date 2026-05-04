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
