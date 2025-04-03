from pydantic import BaseModel, EmailStr, validator, Field
from typing import Optional
from datetime import datetime

# Base User Schema (shared properties)
class UserBase(BaseModel):
    email: EmailStr
    username: str = Field(..., min_length=3, max_length=50)
    is_active: bool = True
    is_admin: bool = False
    profile_picture: Optional[str] = None

# Schema for creating a new user
class UserCreate(UserBase):
    password: str = Field(..., min_length=8)
    confirm_password: str
    
    @validator('confirm_password')
    def passwords_match(cls, v, values, **kwargs):
        if 'password' in values and v != values['password']:
            raise ValueError('Passwords do not match')
        return v

# Schema for Google OAuth user creation
class GoogleUserCreate(UserBase):
    google_id: str

# Schema for updating user
class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    username: Optional[str] = Field(None, min_length=3, max_length=50)
    password: Optional[str] = Field(None, min_length=8)
    is_active: Optional[bool] = None
    profile_picture: Optional[str] = None

# Schema for user in DB response
class UserInDB(UserBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    google_id: Optional[str] = None
    hashed_password: Optional[str] = None
    
    class Config:
        orm_mode = True

# Schema for public user data
class User(UserBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        orm_mode = True

# Schema for token
class Token(BaseModel):
    access_token: str
    token_type: str

# Schema for token data
class TokenData(BaseModel):
    user_id: Optional[int] = None