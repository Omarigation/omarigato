from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.config import settings

# Create MS SQL Server connection string with Windows Authentication
SQLALCHEMY_DATABASE_URL = f"mssql+pyodbc://{settings.DB_HOST}/{settings.DB_NAME}?driver={settings.DB_DRIVER}&trusted_connection=yes"

# Create SQLAlchemy engine
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# Create SessionLocal class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create Base class for database models
Base = declarative_base()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()