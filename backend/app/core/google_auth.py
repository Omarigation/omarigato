from google.oauth2 import id_token
from google.auth.transport import requests
from app.config import settings
from app.models.user import User
from sqlalchemy.orm import Session
import secrets
import string
from app.core.security import get_password_hash

def verify_google_token(token: str):
    """Verify the Google OAuth token."""
    try:
        # Specify the CLIENT_ID of the app that accesses the backend
        idinfo = id_token.verify_oauth2_token(
            token, 
            requests.Request(), 
            settings.GOOGLE_CLIENT_ID
        )

        # ID token is valid
        return idinfo
    except ValueError:
        # Invalid token
        return None

def get_or_create_google_user(db: Session, user_info: dict):
    """Get or create a user from Google OAuth information."""
    # Check if user already exists with this Google ID
    user = db.query(User).filter(User.google_id == user_info['sub']).first()
    
    if user:
        return user
    
    # Check if email already exists
    user_by_email = db.query(User).filter(User.email == user_info['email']).first()
    
    if user_by_email:
        # Update existing user with Google ID
        user_by_email.google_id = user_info['sub']
        if 'picture' in user_info:
            user_by_email.profile_picture = user_info['picture']
        db.commit()
        db.refresh(user_by_email)
        return user_by_email
    
    # Create new user
    username_base = user_info.get('name', '').replace(' ', '') or user_info['email'].split('@')[0]
    username = username_base
    
    # Check if username exists, if so, add random characters
    while db.query(User).filter(User.username == username).first():
        random_suffix = ''.join(secrets.choice(string.ascii_letters + string.digits) for _ in range(4))
        username = f"{username_base}_{random_suffix}"
    
    # Generate a random password for Google users (they'll login with Google, not password)
    random_password = ''.join(secrets.choice(string.ascii_letters + string.digits) for _ in range(16))
    hashed_password = get_password_hash(random_password)
    
    new_user = User(
        email=user_info['email'],
        username=username,
        hashed_password=hashed_password,
        google_id=user_info['sub'],
        profile_picture=user_info.get('picture')
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return new_user