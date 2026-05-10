# tools/__init__.py
from llm.zhipu.tools.job_tools import JOB_TOOLS
from llm.zhipu.tools.resume_tools import RESUME_TOOLS

ALL_TOOLS = JOB_TOOLS + RESUME_TOOLS

__all__ = ['JOB_TOOLS', 'RESUME_TOOLS', 'ALL_TOOLS']
