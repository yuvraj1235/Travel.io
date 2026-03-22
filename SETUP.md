#!/bin/bash or use with PowerShell

# Travel Planner - Project Setup Guide

## Backend Setup

1. Install Python dependencies:
```bash
cd backend
pip install -r requirements.txt
```

2. Set up environment variables:
```bash
cp ..\.env.example .env
# Edit .env with your actual API keys and database URL
```

3. Generate or run Prisma migrations:
```bash
prisma migrate dev
```

4. Start the backend server:
```bash
uvicorn src.main:app --reload
```

The backend will be available at: http://localhost:8000

## Frontend Setup

1. Install Node.js dependencies:
```bash
cd frontend
npm install
```

2. Set up environment variables:
```bash
cp ..\.env.example .env.local
# Edit .env.local with your actual OAuth credentials
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at: http://localhost:3000

## Database Setup

Make sure PostgreSQL is running and the DATABASE_URL in .env points to a valid database.

### First time setup:
```bash
cd backend
prisma migrate dev --name init
```

This will:
- Create the database schema
- Generate Prisma client for Python
- Run seed.py if configured

## API Documentation

Once the backend is running, visit: http://localhost:8000/docs

This provides an interactive Swagger UI for all API endpoints.

## Troubleshooting

- **Python module not found**: Run `pip install -r requirements.txt` again
- **Database connection error**: Check DATABASE_URL in .env
- **Email validation errors**: Ensure pydantic[email] is installed
