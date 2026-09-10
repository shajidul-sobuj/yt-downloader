from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import yt_dlp
import os
import json
from pathlib import Path
import threading
from datetime import datetime

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create downloads directory
DOWNLOADS_DIR = Path("downloads")
DOWNLOADS_DIR.mkdir(exist_ok=True)

# Store download progress
download_progress = {}

def get_video_info(url):
    """Get video/playlist information without downloading"""
    try:
        ydl_opts = {
            'quiet': False,
            'no_warnings': False,
            'extract_flat': 'in_playlist',
        }
        
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            
            if 'entries' in info:  # Playlist
                videos = []
                for entry in info.get('entries', []):
                    if entry:
                        videos.append({
                            'id': entry.get('id'),
                            'title': entry.get('title'),
                            'duration': entry.get('duration'),
                            'url': entry.get('url'),
                        })
                
                return {
                    'type': 'playlist',
                    'title': info.get('title', 'Playlist'),
                    'video_count': len(videos),
                    'videos': videos[:5],  # Return first 5
                }
            else:  # Single video
                # Get available formats
                formats = []
                for fmt in info.get('formats', []):
                    if fmt.get('vcodec') != 'none' and fmt.get('acodec') != 'none':
                        formats.append({
                            'format_id': fmt.get('format_id'),
                            'format': fmt.get('format'),
                            'resolution': fmt.get('height'),
                            'filesize': fmt.get('filesize'),
                        })
                
                return {
                    'type': 'video',
                    'title': info.get('title'),
                    'duration': info.get('duration'),
                    'uploader': info.get('uploader'),
                    'thumbnail': info.get('thumbnail'),
                    'formats': formats[-5:],  # Return last 5 (usually best quality)
                }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


def download_progress_hook(d):
    """Hook for tracking download progress"""
    if d['status'] == 'downloading':
        percent = d.get('_percent_str', '0%')
        speed = d.get('_speed_str', 'N/A')
        eta = d.get('_eta_str', 'N/A')
        
        download_progress['current'] = {
            'status': 'downloading',
            'percent': percent,
            'speed': speed,
            'eta': eta,
        }
    elif d['status'] == 'finished':
        download_progress['current'] = {
            'status': 'finished',
            'percent': '100%',
        }


def download_video(url, format_id=None, is_playlist=False):
    """Download video or playlist"""
    try:
        output_template = str(DOWNLOADS_DIR / '%(title)s.%(ext)s')
        
        ydl_opts = {
            'format': format_id if format_id else 'best[ext=mp4]',
            'outtmpl': output_template,
            'quiet': False,
            'no_warnings': False,
            'progress_hooks': [download_progress_hook],
        }
        
        if is_playlist:
            ydl_opts['extract_flat'] = False
        
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)
            
            if 'entries' in info:
                filenames = []
                for entry in info.get('entries', []):
                    if entry:
                        filenames.append(entry.get('id'))
                return {
                    'type': 'playlist',
                    'count': len(filenames),
                    'message': f'Successfully downloaded {len(filenames)} videos'
                }
            else:
                return {
                    'type': 'video',
                    'filename': info.get('id'),
                    'title': info.get('title'),
                    'message': 'Video downloaded successfully'
                }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.get("/")
async def root():
    return {"message": "YouTube Downloader API"}


@app.get("/api/info")
async def get_info(url: str):
    """Get video/playlist information"""
    if not url:
        raise HTTPException(status_code=400, detail="URL is required")
    
    return get_video_info(url)


@app.post("/api/download")
async def download(url: str, format_id: str = None, is_playlist: bool = False):
    """Download video or playlist"""
    if not url:
        raise HTTPException(status_code=400, detail="URL is required")
    
    # Run download in background thread
    def run_download():
        try:
            result = download_video(url, format_id, is_playlist)
            download_progress['result'] = result
            download_progress['current'] = None
        except Exception as e:
            download_progress['error'] = str(e)
    
    thread = threading.Thread(target=run_download)
    thread.daemon = True
    thread.start()
    
    return {"message": "Download started"}


@app.get("/api/progress")
async def get_progress():
    """Get download progress"""
    return download_progress.get('current', {})


@app.get("/api/result")
async def get_result():
    """Get download result"""
    result = download_progress.get('result')
    if result:
        download_progress['result'] = None
        return result
    return {"message": "No download completed"}


# Mount static files
app.mount("/", StaticFiles(directory="static", html=True), name="static")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
