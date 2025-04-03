from pydantic import BaseModel
from typing import Optional, Dict, Any, List
from datetime import datetime
from app.models.file import ProcessingStatus

class FileBase(BaseModel):
    filename: str
    original_filename: str
    file_type: str
    file_size: int

class FileCreate(FileBase):
    file_path: str
    owner_id: int

class FileUpdate(BaseModel):
    status: Optional[ProcessingStatus] = None
    processing_result: Optional[str] = None

class FileInDB(FileBase):
    id: int
    owner_id: int
    file_path: str
    status: ProcessingStatus
    processing_result: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        orm_mode = True

class File(FileBase):
    id: int
    status: ProcessingStatus
    processing_result: Optional[Dict[str, Any]] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        orm_mode = True

class FileList(BaseModel):
    total: int
    files: List[File]