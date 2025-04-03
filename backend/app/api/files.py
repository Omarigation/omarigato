from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, BackgroundTasks
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from typing import Any, List
import os
import uuid
import shutil
import json
from datetime import datetime

from app.database import get_db
from app.models.user import User
from app.models.file import File as FileModel, ProcessingStatus
from app.schemas.file import File as FileSchema, FileList
from app.core.security import get_current_user
from app.config import settings
from app.core.file_parser import FileParser

router = APIRouter()

def get_extension(filename: str) -> str:
    """Get the file extension from the filename."""
    return filename.split(".")[-1] if "." in filename else ""

def is_valid_file_type(filename: str) -> bool:
    """Check if the file type is allowed."""
    ext = get_extension(filename).lower()
    return ext in settings.ALLOWED_EXTENSIONS

@router.post("/upload", response_model=FileSchema, status_code=status.HTTP_201_CREATED)
async def upload_file(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Any:
    """Upload a file for processing."""
    # Check if file type is allowed
    if not is_valid_file_type(file.filename):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"File type not allowed. Allowed types: {', '.join(settings.ALLOWED_EXTENSIONS)}"
        )
    
    # Create upload directory if it doesn't exist
    os.makedirs(settings.UPLOAD_FOLDER, exist_ok=True)
    
    # Generate unique filename to prevent overwriting
    ext = get_extension(file.filename)
    unique_filename = f"{uuid.uuid4()}.{ext}"
    file_path = os.path.join(settings.UPLOAD_FOLDER, unique_filename)
    
    # Save the file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Create file record in database
    db_file = FileModel(
        filename=unique_filename,
        original_filename=file.filename,
        file_path=file_path,
        file_size=os.path.getsize(file_path),
        file_type=file.content_type or "application/octet-stream",
        status=ProcessingStatus.PENDING,
        owner_id=current_user.id
    )
    
    db.add(db_file)
    db.commit()
    db.refresh(db_file)
    
    # Schedule file processing in background
    background_tasks.add_task(FileParser.process_file, db_file.id, db)
    
    return db_file

@router.get("/", response_model=FileList)
async def get_files(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Any:
    """Get files uploaded by the current user."""
    files = db.query(FileModel).filter(
        FileModel.owner_id == current_user.id
    ).offset(skip).limit(limit).all()
    
    total = db.query(FileModel).filter(
        FileModel.owner_id == current_user.id
    ).count()
    
    return {"total": total, "files": files}

@router.get("/{file_id}", response_model=FileSchema)
async def get_file(
    file_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Any:
    """Get a specific file by ID."""
    file = db.query(FileModel).filter(
        FileModel.id == file_id,
        FileModel.owner_id == current_user.id
    ).first()
    
    if not file:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="File not found"
        )
    
    # Parse processing_result from JSON string to dict
    if file.processing_result:
        try:
            file.processing_result = json.loads(file.processing_result)
        except json.JSONDecodeError:
            file.processing_result = {"error": "Invalid JSON in processing result"}
    
    return file

@router.delete("/{file_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_file(
    file_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> None:  # Change return type annotation to None
    """Delete a file."""
    file = db.query(FileModel).filter(
        FileModel.id == file_id,
        FileModel.owner_id == current_user.id
    ).first()
    
    if not file:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="File not found"
        )
    
    # Delete file from filesystem
    try:
        if os.path.exists(file.file_path):
            os.remove(file.file_path)
    except Exception as e:
        # Continue even if file deletion fails
        pass
    
    # Delete from database
    db.delete(file)
    db.commit()
    
    # Don't return anything for 204 response
    return

@router.get("/{file_id}/status", response_model=dict)
async def get_file_status(
    file_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Any:
    """Get the processing status of a file."""
    file = db.query(FileModel).filter(
        FileModel.id == file_id,
        FileModel.owner_id == current_user.id
    ).first()
    
    if not file:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="File not found"
        )
    
    # Parse processing_result from JSON string to dict if it exists
    processing_result = None
    if file.processing_result:
        try:
            processing_result = json.loads(file.processing_result)
        except json.JSONDecodeError:
            processing_result = {"error": "Invalid JSON in processing result"}
    
    return {
        "status": file.status,
        "updated_at": file.updated_at,
        "processing_result": processing_result
    }

@router.post("/{file_id}/reprocess", response_model=dict)
async def reprocess_file(
    file_id: int,
    background_tasks: BackgroundTasks,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Any:
    """Reprocess a file."""
    file = db.query(FileModel).filter(
        FileModel.id == file_id,
        FileModel.owner_id == current_user.id
    ).first()
    
    if not file:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="File not found"
        )
    
    # Update status to pending
    file.status = ProcessingStatus.PENDING
    file.processing_result = None
    db.commit()
    
    # Schedule file processing in background
    background_tasks.add_task(FileParser.process_file, file.id, db)
    
    return {"message": "File reprocessing started", "file_id": file_id}