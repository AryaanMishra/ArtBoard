@echo off
REM ArtBoard Quick Start Script (Windows)

echo 🎨 ArtBoard - Starting development servers...
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js 16+ first.
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js %NODE_VERSION% detected
echo.

REM Install dependencies if needed
if not exist "backend\node_modules" (
    echo 📦 Installing backend dependencies...
    cd backend
    call npm install
    cd ..
)

if not exist "frontend\node_modules" (
    echo 📦 Installing frontend dependencies...
    cd frontend
    call npm install
    cd ..
)

echo.
echo 🚀 Starting development servers...
echo.
echo Backend will run on: http://localhost:3001
echo Frontend will run on: http://localhost:3000
echo.
echo Press Ctrl+C to stop servers
echo.

REM Start both servers in separate windows
start cmd /k "cd backend && npm run dev"
start cmd /k "cd frontend && npm run dev"

echo Servers started! Open http://localhost:3000 in your browser.
