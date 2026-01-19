@echo off
echo ==========================================
echo 🇮🇳 AADHAAR INTELLIGENCE SYSTEM
echo    React + FastAPI Full Stack Dashboard
echo ==========================================
echo.

:: Check if Python is available
python --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Python not found. Please install Python 3.8+
    pause
    exit /b 1
)

:: Check if Node.js is available
node --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js not found. Please install Node.js 16+
    pause
    exit /b 1
)

echo ✅ Python and Node.js found!
echo.

:: Start Backend API
echo 🚀 Starting FastAPI Backend on port 8000...
cd /d "%~dp0"
start "Aadhaar API" cmd /k "cd backend && python -m uvicorn api:app --reload --host 0.0.0.0 --port 8000"

:: Wait for backend to start
timeout /t 3 /nobreak >nul

:: Start Frontend
echo 🚀 Starting React Frontend on port 3000...
cd /d "%~dp0frontend"
start "Aadhaar React" cmd /k "npm start"

echo.
echo ==========================================
echo ✅ DASHBOARD STARTED!
echo.
echo   🔗 Backend API:  http://localhost:8000
echo   🌐 React App:    http://localhost:3000
echo   📊 API Docs:     http://localhost:8000/docs
echo.
echo   Press any key to open the dashboard...
echo ==========================================
pause >nul

:: Open browser
start http://localhost:3000
