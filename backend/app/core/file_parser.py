import os
import json
import pandas as pd
import re
from typing import Dict, Any, List, Optional
import magic
import asyncio
from app.models.file import File, ProcessingStatus
from sqlalchemy.orm import Session

class FileParser:
    """Handles parsing different file types and extracting information."""
    
    @staticmethod
    async def process_file(file_id: int, db: Session):
        """Process a file asynchronously."""
        # Update file status to processing
        file = db.query(File).filter(File.id == file_id).first()
        if not file:
            return {"error": "File not found"}
        
        file.status = ProcessingStatus.PROCESSING
        db.commit()
        
        try:
            # Detect file type using python-magic
            mime = magic.Magic(mime=True)
            mime_type = mime.from_file(file.file_path)
            
            # Process based on file type
            result = {}
            
            if mime_type.startswith('image/'):
                result = await FileParser._process_image(file.file_path)
            elif mime_type == 'application/pdf':
                result = await FileParser._process_pdf(file.file_path)
            elif mime_type in ['text/plain', 'text/csv']:
                result = await FileParser._process_text(file.file_path)
            elif mime_type in ['application/vnd.ms-excel', 
                           'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']:
                result = await FileParser._process_excel(file.file_path)
            else:
                result = {"message": f"Unsupported file type: {mime_type}"}
            
            # Update file with results
            file.status = ProcessingStatus.COMPLETED
            file.processing_result = json.dumps(result)
            db.commit()
            
            return result
            
        except Exception as e:
            # Update file status to failed
            file.status = ProcessingStatus.FAILED
            file.processing_result = json.dumps({"error": str(e)})
            db.commit()
            return {"error": str(e)}
    
    @staticmethod
    async def _process_image(file_path: str) -> Dict[str, Any]:
        """Process image files to extract metadata."""
        try:
            # This would normally use a library like PIL to get image metadata
            # For now, just get basic file info
            stats = os.stat(file_path)
            
            return {
                "file_size_bytes": stats.st_size,
                "last_modified": stats.st_mtime,
                "type": "image",
                "message": "Image processing completed successfully."
            }
        except Exception as e:
            return {"error": f"Error processing image: {str(e)}"}
    
    @staticmethod
    async def _process_pdf(file_path: str) -> Dict[str, Any]:
        """Process PDF files to extract text and metadata."""
        try:
            # This would normally use a library like PyPDF2 or pdfplumber
            # For now, just get basic file info
            stats = os.stat(file_path)
            
            return {
                "file_size_bytes": stats.st_size,
                "last_modified": stats.st_mtime,
                "type": "pdf",
                "message": "PDF processing completed successfully."
            }
        except Exception as e:
            return {"error": f"Error processing PDF: {str(e)}"}
    
    @staticmethod
    async def _process_text(file_path: str) -> Dict[str, Any]:
        """Process text files including CSV."""
        try:
            # Check if it's likely a CSV
            with open(file_path, 'r', encoding='utf-8') as f:
                first_line = f.readline()
                
            if ',' in first_line or ';' in first_line or '\t' in first_line:
                # Try to process as CSV
                try:
                    df = pd.read_csv(file_path)
                    return {
                        "type": "csv",
                        "rows": len(df),
                        "columns": len(df.columns),
                        "column_names": df.columns.tolist(),
                        "sample_data": df.head(5).to_dict(orient="records"),
                        "message": "CSV processing completed successfully."
                    }
                except:
                    pass
            
            # Process as regular text
            with open(file_path, 'r', encoding='utf-8') as f:
                text = f.read()
            
            line_count = len(text.splitlines())
            word_count = len(re.findall(r'\w+', text))
            char_count = len(text)
            
            return {
                "type": "text",
                "line_count": line_count,
                "word_count": word_count,
                "character_count": char_count,
                "preview": text[:500] + "..." if len(text) > 500 else text,
                "message": "Text processing completed successfully."
            }
        except Exception as e:
            return {"error": f"Error processing text file: {str(e)}"}
    
    @staticmethod
    async def _process_excel(file_path: str) -> Dict[str, Any]:
        """Process Excel files."""
        try:
            df = pd.read_excel(file_path)
            return {
                "type": "excel",
                "rows": len(df),
                "columns": len(df.columns),
                "column_names": df.columns.tolist(),
                "sheet_names": pd.ExcelFile(file_path).sheet_names,
                "sample_data": df.head(5).to_dict(orient="records"),
                "message": "Excel processing completed successfully."
            }
        except Exception as e:
            return {"error": f"Error processing Excel file: {str(e)}"}