import os
import shutil
from typing import List, Optional
import random
import string
import re

def get_random_string(length: int = 8) -> str:
    """Generate a random string of fixed length."""
    letters = string.ascii_lowercase + string.digits
    return ''.join(random.choice(letters) for _ in range(length))

def clean_directory(directory: str) -> bool:
    """Clean a directory by removing all files in it."""
    if not os.path.exists(directory):
        return False
    
    for filename in os.listdir(directory):
        file_path = os.path.join(directory, filename)
        try:
            if os.path.isfile(file_path) or os.path.islink(file_path):
                os.unlink(file_path)
            elif os.path.isdir(file_path):
                shutil.rmtree(file_path)
        except Exception as e:
            print(f"Failed to delete {file_path}. Reason: {e}")
            return False
    
    return True

def is_valid_username(username: str) -> bool:
    """
    Check if a username is valid.
    Rules:
    - 3-20 characters
    - Can contain letters, numbers, underscores, and hyphens
    - Cannot start or end with underscore or hyphen
    """
    pattern = r'^[a-zA-Z0-9][a-zA-Z0-9_-]{1,18}[a-zA-Z0-9]$'
    return bool(re.match(pattern, username)) and len(username) >= 3 and len(username) <= 20

def is_valid_password(password: str) -> bool:
    """
    Check if a password is strong enough.
    Rules:
    - At least 8 characters
    - Contains at least one lowercase letter
    - Contains at least one uppercase letter
    - Contains at least one digit
    - Contains at least one special character
    """
    if len(password) < 8:
        return False
    
    has_lowercase = bool(re.search(r'[a-z]', password))
    has_uppercase = bool(re.search(r'[A-Z]', password))
    has_digit = bool(re.search(r'\d', password))
    has_special = bool(re.search(r'[!@#$%^&*(),.?":{}|<>]', password))
    
    return has_lowercase and has_uppercase and has_digit and has_special

def get_file_size_readable(size_bytes: int) -> str:
    """Convert file size in bytes to a readable format."""
    if size_bytes < 1024:
        return f"{size_bytes} B"
    elif size_bytes < 1024 * 1024:
        return f"{size_bytes / 1024:.2f} KB"
    elif size_bytes < 1024 * 1024 * 1024:
        return f"{size_bytes / (1024 * 1024):.2f} MB"
    else:
        return f"{size_bytes / (1024 * 1024 * 1024):.2f} GB"

def sanitize_filename(filename: str) -> str:
    """Sanitize a filename to remove unsafe characters."""
    # Remove any directory paths
    filename = os.path.basename(filename)
    
    # Remove special characters and keep only alphanumeric, dashes, and dots
    return re.sub(r'[^\w\-.]', '_', filename)