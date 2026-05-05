# 工具模块初始化
from llm.zhipu.tools.resume_tools import RESUME_TOOLS
from llm.zhipu.tools.job_tools import JOB_TOOLS
from llm.zhipu.tools.web_tools import WEB_TOOLS

ALL_TOOLS = RESUME_TOOLS + JOB_TOOLS + WEB_TOOLS

__all__ = ['RESUME_TOOLS', 'JOB_TOOLS', 'WEB_TOOLS', 'ALL_TOOLS']
