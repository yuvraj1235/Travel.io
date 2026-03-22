#!/usr/bin/env pwsh
# ============================================
# Travel Planner - Easy Local Start
# ============================================
# Run this from the project root directory

Write-Host @"
=================================================
   🚀 TRAVEL PLANNER - LOCAL STARTUP
=================================================
" -ForegroundColor Cyan

# Check Python
Write-Host "Checking Python..." -ForegroundColor Yellow
$pythonCheck = python --version 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Python not found! Install from python.org" -ForegroundColor Red
    exit 1
}
Write-Host "✅ $pythonCheck" -ForegroundColor Green

# Check Node
Write-Host "Checking Node.js..." -ForegroundColor Yellow
$nodeCheck = node --version
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Node.js not found! Install from nodejs.org" -ForegroundColor Red
    exit 1
}
Write-Host "✅ $nodeCheck" -ForegroundColor Green

# Install backend dependencies
Write-Host "`n📦 Installing backend dependencies..." -ForegroundColor Yellow
Set-Location "$PSScriptRoot\backend"
pip install -q -r requirements.txt

# Setup database
Write-Host "🗄️  Setting up database..." -ForegroundColor Yellow
$env:PRISMA_INTERNALS_ENGINE_TYPE = "library"
prisma migrate dev --name "init" --skip-generate 2>&1 | Out-Null
prisma generate 2>&1 | Out-Null

Write-Host "✅ Database ready" -ForegroundColor Green

# Start backend
Write-Host "`n🔙 Starting Backend Server..." -ForegroundColor Green
Write-Host "📍 http://localhost:8000" -ForegroundColor Cyan
Start-Process powershell -ArgumentList @"
-NoExit
-Command
"cd '$PSScriptRoot\backend'; uvicorn src.main:app --reload --host 0.0.0.0 --port 8000"
"@

Start-Sleep -Seconds 2

# Install frontend dependencies
Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Yellow
Set-Location "$PSScriptRoot\frontend"
npm install -q

# Start frontend
Write-Host "🔷 Starting Frontend Server..." -ForegroundColor Green
Write-Host "📍 http://localhost:3000" -ForegroundColor Cyan
Start-Process powershell -ArgumentList @"
-NoExit
-Command
"cd '$PSScriptRoot\frontend'; npm run dev"
"@

Write-Host @"
=================================================
✅ SERVERS STARTING!

🌐 Open in your browser now:
   http://localhost:3000/login

📚 API Docs:
   http://localhost:8000/docs

Test Login (any credentials work):
   Email: test@example.com
   Password: anything

=================================================
Keep both PowerShell windows open to keep servers running
=================================================
"@ -ForegroundColor Green

# Keep script alive
while ($true) {
    Start-Sleep -Seconds 10
}
