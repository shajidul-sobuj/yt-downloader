#!/bin/bash

# YouTube Downloader - Start Script

cd "$(dirname "$0")" || exit

# Activate virtual environment
source venv/bin/activate

# Run the app
python main.py
