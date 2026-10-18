#!/bin/bash
# 1-Click GitHub Code Uploader for Linux/macOS
echo "======================================================================"
echo "          [1-CLICK GITHUB AUTOMATIC CODE UPLOADER]"
echo "======================================================================"

if ! command -v git &> /dev/null; then
    echo "[ERROR] Git is not installed! Please install git first."
    exit 1
fi

[ ! -d ".git" ] && git init
git branch -M main
git add .
git commit -m "C Guru Platform Auto Update with MongoDB & Security"

if ! git remote get-url origin &> /dev/null; then
    echo "Enter your GitHub Repo URL (e.g. https://github.com/username/repo.git):"
    read -r REPO_URL
    if [ -n "$REPO_URL" ]; then
        git remote add origin "$REPO_URL"
    else
        echo "[ERROR] No URL provided. Aborted."
        exit 1
    fi
fi

echo "Pushing code to GitHub..."
git push -u origin main --force
echo "======================================================================"
echo "[SUCCESS] All code uploaded to GitHub successfully!"
echo "======================================================================"
