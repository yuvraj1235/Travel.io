@echo off
REM Start Travel Planner Backend and Frontend

echo.
echo ================================
echo Travel Planner - Multi-Project Start
echo ================================
echo.

REM Check for Python
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    exit /b 1
)

REM Check for Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    exit /b 1
)

REM Start Backend in new window
echo Starting Backend Server...
start "Travel.io Backend" cmd /k "cd backend && uvicorn src.main:app --reload --host 0.0.0.0 --port 8000"
timeout /t 2

REM Start Frontend in new window  
echo Starting Frontend Server...
start "Travel.io Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ================================
echo Servers Starting...
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:3000
echo Docs:     http://localhost:8000/docs
echo ================================
echo.
echo Press Ctrl+C in either window to stop that server
pause
