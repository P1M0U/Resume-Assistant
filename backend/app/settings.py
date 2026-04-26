import yaml
import os
import sys
from loguru import logger

# 加载配置文件
with open(os.path.join(os.path.dirname(__file__), "config.yaml"), "r", encoding="utf-8") as f:
    config = yaml.safe_load(f)

logger.info("配置文件加载成功")

# 环境变量
# 后端根目录（app目录）
BACKEND_ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
logger.info(f"后端根目录: {BACKEND_ROOT_DIR}")

# 将app目录添加到Python路径
if BACKEND_ROOT_DIR not in sys.path:
    sys.path.insert(0, BACKEND_ROOT_DIR)
    logger.info(f"已将根目录添加到Python路径: {BACKEND_ROOT_DIR}")
# 提取配置项为全局变量
ZHIPU = config['ZHIPU']
APP = config['APP']
MYSQL = config['MYSQL']

# 智谱AI配置
ZHIPU_API_KEY = ZHIPU['API_KEY']
ZHIPU_MODEL_NAME = ZHIPU.get('MODEL_NAME', 'glm-4')
ZHIPU_TEMPERATURE = ZHIPU.get('TEMPERATURE', 0.7)
ZHIPU_MAX_TOKENS = ZHIPU.get('MAX_TOKENS', 2000)

# 应用配置
APP_DEBUG = APP.get('DEBUG', True)
APP_LOG_LEVEL = APP.get('LOG_LEVEL', 'INFO')

# MySQL配置
MYSQL_HOST = MYSQL['HOST']
MYSQL_PORT = MYSQL['PORT']
MYSQL_USER = MYSQL['USER']
MYSQL_PASSWORD = MYSQL['PASSWORD']
MYSQL_DB = MYSQL['DB']
