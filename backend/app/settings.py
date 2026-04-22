import yaml
from loguru import logger

class Settings:
    """加载配置文件"""
    with open("app/config.yaml", "r") as f:
        config = yaml.safe_load(f)
    logger.info("配置文件加载成功")
    self.config = config
settings = Settings()