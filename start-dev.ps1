#!/usr/bin/env pwsh
# Travel Planner Development Server Starter - PowerShell Version

Write-Host @"
================================
Travel Planner - Multi-Project Start
================================
"@ -ForegroundColor Cyan

# Check Python
$pythonCheck = python --version 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Python is not installed or not in PATH" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Python: $pythonCheck"

# Check Node.js
$nodeCheck = node --version
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Node.js is not installed or not in PATH" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Node.js: $nodeCheck"

Write-Host "`nStarting servers...`n" -ForegroundColor Yellow

# Start Backend
Write-Host "Starting Backend Server on http://localhost:8000..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd $PSScriptRoot\backend; uvicorn src.main:app --reload --host 0.0.0.0 --port 8000"

Start-Sleep -Seconds 2

# Start Frontend
Write-Host "Starting Frontend Server on http://localhost:3000..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd $PSScriptRoot\frontend; npm run dev"

Write-Host @"
================================
Servers Starting...
Backend:  http://localhost:8000
Frontend: http://localhost:3000
Docs:     http://localhost:8000/docs
================================

Close these terminal windows to stop the servers.
"@ -ForegroundColor Cyan

# Keep script running
while ($true) {
    Start-Sleep -Seconds 10
}
