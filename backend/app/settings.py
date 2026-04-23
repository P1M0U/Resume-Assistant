import yaml
import os
from loguru import logger

config = None
with open(os.path.join(os.path.dirname(__file__), "config.yaml"), "r") as f:
    config = yaml.safe_load(f)
logger.info("配置文件加载成功")
settings = config
