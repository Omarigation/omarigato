# Anime Portal

Anime Portal is a full-stack web application that allows users to upload, process, and analyze various file types with an anime-themed user interface. The application is built with FastAPI for the backend, React for the frontend, and MS SQL Server for the database.

## Features

- **User Authentication**: Register, login, and manage user accounts
- **Google OAuth Integration**: Allow users to login with their Google accounts
- **File Upload**: Upload various file types including images, PDFs, text files, CSVs, and Excel files
- **File Processing**: Automatic processing and analysis of uploaded files
- **File Management**: View, reprocess, and delete files
- **Responsive Design**: Anime-themed UI that works on all devices
- **JWT Authentication**: Secure API endpoints with JSON Web Tokens

## Tech Stack

### Backend
- **FastAPI**: High-performance Python framework for building APIs
- **SQLAlchemy**: ORM for database interactions
- **MS SQL Server**: Relational database for storing user and file data
- **PyJWT**: JWT token handling for authentication
- **Pandas**: Data analysis for processing files
- **Python-Magic**: File type detection

### Frontend
- **React**: JavaScript library for building user interfaces
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Axios**: HTTP client for API requests
- **Context API**: State management

### Infrastructure
- **Docker**: Containerization for easy deployment
- **Docker Compose**: Multi-container Docker applications

## Project Structure

```
anime-portal/
│
├── backend/                      # FastAPI Backend
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py               # FastAPI application entry point
│   │   ├── config.py             # Configuration settings
│   │   ├── database.py           # Database connection setup
│   │   ├── models/               # SQLAlchemy models
│   │   ├── schemas/              # Pydantic schemas
│   │   ├── api/                  # API routes
│   │   ├── core/                 # Core functionality
│   │   └── utils/                # Utility functions
│   ├── requirements.txt          # Python dependencies
│   └── Dockerfile                # Backend Dockerfile
│
├── frontend/                     # React Frontend
│   ├── public/                   # Static files
│   ├── src/
│   │   ├── components/           # Reusable components
│   │   ├── pages/                # App pages
│   │   ├── context/              # React context
│   │   ├── services/             # API services
│   │   ├── utils/                # Utility functions
│   │   ├── styles/               # CSS/SCSS styles
│   │   ├── App.jsx               # Main App component
│   │   └── index.js              # Entry point
│   ├── package.json              # npm dependencies
│   └── Dockerfile                # Frontend Dockerfile
│
├── docker-compose.yml           # Docker Compose configuration
└── README.md                    # Project documentation
```

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js and npm (for local frontend development)
- Python 3.9+ (for local backend development)
- MS SQL Server (or use the Docker container)

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Running with Docker Compose

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/anime-portal.git
   cd anime-portal
   ```

2. Build and start the containers
   ```bash
   docker-compose up --build
   ```

3. Access the application
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

### Running Locally (Development)

#### Backend

1. Navigate to the backend directory
   ```bash
   cd backend
   ```

2. Create a virtual environment
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies
   ```bash
   pip install -r requirements.txt
   ```

4. Run the development server
   ```bash
   uvicorn app.main:app --reload
   ```

#### Frontend

1. Navigate to the frontend directory
   ```bash
   cd frontend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Run the development server
   ```bash
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login for access token
- `POST /api/auth/google` - Login with Google OAuth
- `GET /api/auth/me` - Get current user info

### Users
- `GET /api/users/` - Get all users (admin only)
- `GET /api/users/{user_id}` - Get user by ID
- `PUT /api/users/me` - Update own user info
- `PUT /api/users/{user_id}` - Update a user (admin only)

### Files
- `POST /api/files/upload` - Upload a file
- `GET /api/files/` - Get all files for current user
- `GET /api/files/{file_id}` - Get file by ID
- `DELETE /api/files/{file_id}` - Delete a file
- `GET /api/files/{file_id}/status` - Get file processing status
- `POST /api/files/{file_id}/reprocess` - Reprocess a file

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- FastAPI for the amazing API framework
- React for the frontend library
- Tailwind CSS for the styling utilities
- All the open-source libraries used in this project#   o m a r i g a t o  
 