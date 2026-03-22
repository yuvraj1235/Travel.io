# Travel Planner - AI-Powered Travel Application

A full-stack travel planning application with AI recommendations, trip management, and itinerary planning.

## 🏗️ Project Architecture

### Tech Stack
- **Backend**: FastAPI (Python) + PostgreSQL + Prisma ORM
- **Frontend**: Next.js 16 + React 19 + NextAuth.js + TailwindCSS
- **Database**: PostgreSQL with Prisma migrations
- **Authentication**: NextAuth for email/password and Google OAuth

### Project Structure
```
Travel.io/
├── backend/          # Python FastAPI backend
│   ├── src/
│   │   ├── main.py   # FastAPI application entry point
│   │   ├── database.py # Prisma database connection
│   │   ├── routes/   # API route handlers
│   │   ├── schemas/  # Request/Response data models
│   │   └── services/ # External API integrations
│   ├── prisma/       # Database schema and migrations
│   └── requirements.txt # Python dependencies
├── frontend/         # Next.js frontend
│   ├── app/          # App router pages and API routes
│   ├── components/   # Reusable React components
│   └── package.json  # Node dependencies
└── .env.example      # Environment variables template
```

## 🚀 Quick Start

### Prerequisites
- Python 3.10+
- Node.js 18+
- PostgreSQL 14+

### Backend Setup

1. **Install Python dependencies**:
```bash
cd backend
pip install -r requirements.txt
```

2. **Configure environment variables**:
```bash
# Copy the template
cp ../.env.example .env

# Edit .env with your configuration
# Required keys:
# - DATABASE_URL: PostgreSQL connection string
# - GOOGLE_CLIENT_ID: For Google OAuth
# - GOOGLE_CLIENT_SECRET: For Google OAuth
# - GOOGLE_MAPS_API_KEY: For location services
# - UNSPLASH_ACCESS_KEY: For city photos
```

3. **Initialize database**:
```bash
# Generate Prisma client and run migrations (first time)
prisma migrate dev --name init

# Or if schema exists, just generate client
prisma generate
```

4. **Start backend server**:
```bash
uvicorn src.main:app --reload
```

Backend API will be available at: **http://localhost:8000**
API Documentation: **http://localhost:8000/docs**

### Frontend Setup

1. **Install Node dependencies**:
```bash
cd frontend
npm install
```

2. **Configure environment variables**:
```bash
# Copy template
cp ../.env.example .env.local

# Edit .env.local with your configuration
# Required keys:
# - NEXT_PUBLIC_API_URL: Backend API URL
# - NEXTAUTH_URL: Frontend URL
# - NEXTAUTH_SECRET: Session secret (generate with: openssl rand -base64 32)
# - NEXT_PUBLIC_GOOGLE_CLIENT_ID: Google OAuth ID
# - GOOGLE_CLIENT_SECRET: Google OAuth secret
```

3. **Start frontend server**:
```bash
npm run dev
```

Frontend will be available at: **http://localhost:3000**

### Automated Startup

Use the provided startup scripts to run both servers:

**Windows (CMD)**:
```bash
start-dev.bat
```

**Windows (PowerShell)**:
```powershell
.\start-dev.ps1
```

## 📚 API Documentation

Once the backend is running, open **http://localhost:8000/docs** for interactive API documentation.

### Key Endpoints

#### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Email/password login
- `POST /api/auth/google` - Google OAuth login
- `POST /api/auth/preferences` - Save user preferences

#### Trips
- `POST /api/trips/` - Create new trip
- `GET /api/trips/user/{user_id}` - Get user's trips
- `GET /api/trips/details/{trip_id}` - Get trip details

#### Itinerary
- `GET /api/itinerary/{trip_id}` - Get trip itinerary items
- `POST /api/itinerary/item` - Add activity to itinerary
- `DELETE /api/itinerary/item/{item_id}` - Remove activity

## 🔧 Configuration

### Database Setup

Create a PostgreSQL database and update `DATABASE_URL` in `.env`:

```
DATABASE_URL="postgresql://username:password@localhost:5432/travel_planner_db"
```

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials (Web Application)
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `http://localhost:3000/api/auth/callback/credentials`
6. Copy Client ID and Secret to `.env` files

### Unsplash API (Optional - for city photos)

1. Sign up at [Unsplash](https://unsplash.com/)
2. Create a developer application
3. Get your Access Key
4. Add to `.env` as `UNSPLASH_ACCESS_KEY`

## 🛠️ Development

### Running Tests
```bash
# Backend
cd backend
pytest

# Frontend
cd frontend
npm run test
```

### Linting
```bash
# Backend
cd backend
pylint src/

# Frontend
cd frontend
npm run lint
```

### Code Formatting
```bash
# Backend
cd backend
black src/

# Frontend
cd frontend
npm run format
```

## 🐛 Troubleshooting

### Backend Issues

**Python module not found**
```bash
pip install -r requirements.txt
```

**Database connection error**
- Ensure PostgreSQL is running
- Check DATABASE_URL in .env
- Verify database exists

**Prisma client generation fails**
```bash
cd backend
prisma generate
```

### Frontend Issues

**Dependencies not installing**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

**NextAuth not working**
- Ensure NEXTAUTH_SECRET is set (use: `openssl rand -base64 32`)
- Check NEXTAUTH_URL matches your frontend URL
- Verify OAuth credentials in .env.local

## 📝 Environment Variables Reference

### Backend (.env)
```env
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/db

# Google
GOOGLE_CLIENT_ID=your_id
GOOGLE_CLIENT_SECRET=your_secret
GOOGLE_MAPS_API_KEY=your_key

# External APIs
UNSPLASH_ACCESS_KEY=your_key

# Optional
DEBUG=true
```

### Frontend (.env.local)
```env
# API
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generated_secret

# Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_id
GOOGLE_CLIENT_SECRET=your_secret
```

## 🚢 Deployment

### Backend Deployment (Heroku example)
```bash
cd backend
heroku create your-app-name
heroku addons:create heroku-postgresql:standard-0
heroku config:set \
  GOOGLE_CLIENT_ID=xxx \
  GOOGLE_CLIENT_SECRET=xxx \
  GOOGLE_MAPS_API_KEY=xxx \
  UNSPLASH_ACCESS_KEY=xxx
git push heroku main
```

### Frontend Deployment (Vercel)
```bash
cd frontend
npm install -g vercel
vercel
# Follow prompts and set environment variables
```

## 📄 License

ISC License

## 👨‍💻 Support

For issues and questions, please open an issue in the repository.
