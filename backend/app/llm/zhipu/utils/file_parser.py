# 文件解析工具（PDF、DOCX）
from pypdf import PdfReader
from docx import Document
from loguru import logger


class FileParser:
    def parse_pdf(self, file_path: str):
        """
        解析PDF文件

        Args:
            file_path: PDF文件路径

        Returns:
            提取的文本内容
        """
        logger.info(f"开始解析PDF文件：{file_path}")
        reader = PdfReader(file_path)
        pages = reader.pages
        text = ""
        for i, page in enumerate(pages, 1):
            page_text = page.extract_text()
            text += page_text
            logger.info(f"第{i}页提取文本长度：{len(page_text)}")

        logger.info(f"PDF解析完成，总文本长度：{len(text)}")
        return text

    def parse_docx(self, file_path: str):
        """
        解析DOCX文件（包括段落和表格）

        Args:
            file_path: DOCX文件路径

        Returns:
            提取的文本内容
        """
        logger.info(f"开始解析DOCX文件：{file_path}")

        doc = Document(file_path)
        text = ""

        # 提取段落文本
        logger.info(f"文档包含 {len(doc.paragraphs)} 个段落")
        for i, para in enumerate(doc.paragraphs, 1):
            if para.text.strip():
                text += para.text + "\n"

        logger.info(f"段落提取完成，文本长度：{len(text)}")

        # 提取表格文本
        logger.info(f"文档包含 {len(doc.tables)} 个表格")
        for i, table in enumerate(doc.tables, 1):
            logger.info(f"正在提取第{i}个表格")
            for row in table.rows:
                row_text = []
                for cell in row.cells:
                    if cell.text.strip():
                        row_text.append(cell.text.strip())
                if row_text:
                    text += " | ".join(row_text) + "\n"

        logger.info(f"DOCX解析完成，总文本长度：{len(text)}")

        # 如果文本长度为0，记录警告
        if len(text.strip()) == 0:
            logger.warning(f"DOCX文件解析结果为空，可能文件格式不正确或内容为空")

        return text
