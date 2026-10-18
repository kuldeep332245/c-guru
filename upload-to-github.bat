@echo off
title 1-Click GitHub Code Uploader - C Guru
color 0b
echo ======================================================================
echo          [1-CLICK GITHUB AUTOMATIC CODE UPLOADER]
echo ======================================================================
echo.
echo [1/5] Checking Git installation...
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    color 0c
    echo [ERROR] Git is not installed or not in PATH!
    echo Please install Git from https://git-scm.com/downloads
    pause
    exit /b 1
)

echo [OK] Git is ready!
echo.

echo [2/5] Initializing Git repository...
if not exist ".git" (
    git init
)
git branch -M main

echo.
echo [3/5] Staging files safely (.gitignore protects tokens and data)...
git add .

echo.
echo [4/5] Creating commit...
git commit -m "C Guru Platform Auto Update with MongoDB & Security"

echo.
echo [5/5] Checking GitHub Remote...
git remote get-url origin >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [SETUP] No GitHub repository linked yet.
    echo Please paste your GitHub repository URL:
    echo (Example: https://github.com/your-username/your-repo.git)
    echo.
    set /p REPO_URL="Enter GitHub Repo URL: "
    if "%REPO_URL%"=="" (
        color 0c
        echo [ERROR] No URL entered. Aborted.
        pause
        exit /b 1
    )
    git remote add origin %REPO_URL%
)

echo.
echo Pushing code to GitHub main branch...
git push -u origin main --force

if %ERRORLEVEL% EQU 0 (
    color 0a
    echo.
    echo ======================================================================
    echo        [SUCCESS] ALL CODE UPLOADED TO GITHUB SUCCESSFULLY!
    echo ======================================================================
    echo Your updated code is now on GitHub!
) else (
    color 0e
    echo.
    echo [Push Alert] If GitHub asked for login, please sign in or use a GitHub Personal Access Token.
)

pause
