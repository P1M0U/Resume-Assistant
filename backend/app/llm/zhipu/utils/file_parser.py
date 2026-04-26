# 文件解析工具（PDF、DOCX）
from pypdf import PdfReader
from docx import Document

class FileParser:
    def parse_pdf(self,file_path:str):
        reader = PdfReader(file_path)
        pages = reader.pages
        text = ""
        for page in pages:
            text += page.extract_text()
        return text
    
    def parse_docx(self,file_path:str):
        doc = Document(file_path)
        text = ""
        for para in doc.paragraphs:
            text += para.text + "\n"
        return text