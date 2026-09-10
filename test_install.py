#!/usr/bin/env python3
"""
YouTube Downloader - Quick Test Script
ডাউনলোডার সঠিকভাবে কাজ করছে কি না তা পরীক্ষা করুন
"""

import subprocess
import sys
import os

def test_installation():
    """Test if all dependencies are properly installed"""
    
    print("=" * 50)
    print("YouTube Downloader - Installation Test")
    print("=" * 50)
    
    # Test Python
    print("\n✓ Testing Python...")
    python_version = sys.version
    print(f"  Python version: {python_version}")
    
    # Test FastAPI
    print("\n✓ Testing FastAPI...")
    try:
        import fastapi
        print(f"  FastAPI version: {fastapi.__version__}")
    except ImportError:
        print("  ❌ FastAPI not installed")
        return False
    
    # Test yt-dlp
    print("\n✓ Testing yt-dlp...")
    try:
        import yt_dlp
        print(f"  yt-dlp installed")
    except ImportError:
        print("  ❌ yt-dlp not installed")
        return False
    
    # Test Uvicorn
    print("\n✓ Testing Uvicorn...")
    try:
        import uvicorn
        print(f"  Uvicorn loaded")
    except ImportError:
        print("  ❌ Uvicorn not installed")
        return False
    
    print("\n" + "=" * 50)
    print("✓ All dependencies installed successfully!")
    print("=" * 50)
    
    print("\n🚀 Ready to start the app!")
    print("\nTo start the YouTube Downloader, run:")
    print("  python main.py")
    print("\nThen open your browser to:")
    print("  http://localhost:8000")
    
    return True

if __name__ == "__main__":
    success = test_installation()
    sys.exit(0 if success else 1)
