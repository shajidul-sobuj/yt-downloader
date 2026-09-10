@echo off
REM YouTube Downloader - Start Script for Windows

cd /d "%~dp0"

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Run the app
python main.py
