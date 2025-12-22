@echo off
echo Starting ScienceCare Coaching Website...
echo.
echo Installing dependencies...
call npm install
echo.
echo Starting development server...
echo The website will open at http://localhost:3000
echo Press Ctrl+C to stop the server
echo.
call npm run dev
pause

