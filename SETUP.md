# YouTube Downloader - সম্পূর্ণ সেটআপ গাইড

## 📋 প্রজেক্ট ওভারভিউ

এটি একটি সম্পূর্ণ YouTube ভিডিও ও প্লেলিস্ট ডাউনলোডার ওয়েব অ্যাপ্লিকেশন। এটি:

✅ একক ভিডিও এবং সম্পূর্ণ প্লেলিস্ট ডাউনলোড করতে পারে  
✅ উচ্চ মানের অডিওসহ ভিডিও সরবরাহ করে  
✅ 1080p থেকে 240p পর্যন্ত বিভিন্ন মান অপশন প্রদান করে  
✅ রিয়েল-টাইম ডাউনলোড প্রগতি দেখায়  
✅ সুন্দর এবং প্রতিক্রিয়াশীল ওয়েব ইন্টারফেস প্রদান করে  

## 🏗️ প্রকল্প কাঠামো

```
YouTube-Downloader/
├── main.py                 # Backend (FastAPI)
├── requirements.txt        # Python dependencies
├── run.sh                  # Linux/Mac চালানোর স্ক্রিপ্ট
├── run.bat                 # Windows চালানোর স্ক্রিপ্ট
├── README.md               # সংক্ষিপ্ত গাইড
├── SETUP.md                # এই ফাইল (বিস্তারিত গাইড)
├── static/
│   ├── index.html          # ফ্রন্টএন্ড HTML
│   ├── style.css           # স্টাইলশীট
│   └── script.js           # JavaScript ফাংশনালিটি
├── venv/                   # Python virtual environment
└── downloads/              # ডাউনলোড করা ভিডিও (স্বয়ংক্রিয় তৈরি)
```

## 🚀 দ্রুত শুরু করুন

### Linux / Mac এ:

```bash
# প্রজেক্ট ডিরেক্টরিতে যান
cd ~/YouTube-Downloader

# চালানোর স্ক্রিপ্ট ব্যবহার করুন
./run.sh

# অথবা ম্যানুয়ালি:
source venv/bin/activate
python main.py
```

### Windows এ:

```cmd
cd YouTube-Downloader
run.bat

REM অথবা ম্যানুয়ালি:
venv\Scripts\activate.bat
python main.py
```

## 💻 ম্যানুয়াল সেটআপ

### ধাপ 1: প্রয়োজনীয়তা চেক করুন

```bash
python3 --version  # Python 3.8+ থাকা উচিত
pip --version      # pip থাকা উচিত
```

### ধাপ 2: Virtual Environment তৈরি করুন

```bash
cd ~/YouTube-Downloader
python3 -m venv venv
```

### ধাপ 3: Virtual Environment সক্রিয় করুন

**Linux/Mac:**
```bash
source venv/bin/activate
```

**Windows:**
```cmd
venv\Scripts\activate.bat
```

### ধাপ 4: Dependencies ইনস্টল করুন

```bash
pip install -r requirements.txt
```

### ধাপ 5: অ্যাপ্লিকেশন চালু করুন

```bash
python main.py
```

## 🌐 ব্রাউজারে অ্যাক্সেস করুন

একবার সার্ভার চলতে শুরু করলে, আপনার ব্রাউজারে এটি খুলুন:

```
http://localhost:8000
```

আপনি দেখতে পাবেন একটি সুন্দর ওয়েব ইন্টারফেস যেখানে আপনি:
1. YouTube URL পেস্ট করতে পারেন
2. ভিডিও/প্লেলিস্টের তথ্য পেতে পারেন
3. পছন্দের মান নির্বাচন করতে পারেন
4. ডাউনলোড শুরু করতে পারেন

## 📝 ব্যবহারের উদাহরণ

### একক ভিডিও ডাউনলোড করা

1. ইউটিউব ভিডিও লিঙ্ক কপি করুন: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
2. অ্যাপে লিঙ্ক পেস্ট করুন
3. "Get Info" ক্লিক করুন
4. পছন্দের মান নির্বাচন করুন (1080p, 720p ইত্যাদি)
5. "Download" ক্লিক করুন
6. ডাউনলোড সম্পন্ন হওয়ার জন্য অপেক্ষা করুন

### প্লেলিস্ট ডাউনলোড করা

1. প্লেলিস্ট URL পেস্ট করুন: `https://www.youtube.com/playlist?list=PLxxx`
2. "Get Info" ক্লিক করুন
3. প্লেলিস্টের বিবরণ দেখবেন
4. "Download" ক্লিক করুন
5. সমস্ত ভিডিও স্বয়ংক্রিয়ভাবে ডাউনলোড হবে

## ⚙️ API Endpoints

### তথ্য পান
```
GET /api/info?url=<youtube_url>
```
**প্রতিক্রিয়া:**
```json
{
    "type": "video|playlist",
    "title": "ভিডিও/প্লেলিস্ট শিরোনাম",
    "duration": 600,
    "formats": [...]
}
```

### ডাউনলোড শুরু করুন
```
POST /api/download?url=<youtube_url>&format_id=<format>&is_playlist=<true|false>
```

### প্রগতি চেক করুন
```
GET /api/progress
```
**প্রতিক্রিয়া:**
```json
{
    "status": "downloading",
    "percent": "45%",
    "speed": "2.5 MB/s",
    "eta": "00:30"
}
```

### ফলাফল পান
```
GET /api/result
```

## 🔒 নিরাপত্তা এবং আইনি বিষয়

⚠️ **গুরুত্বপূর্ণ:**
- এই টুল শুধুমাত্র আপনার নিজের ব্যবহারের জন্য ব্যবহার করুন
- YouTube এর Terms of Service মেনে চলুন
- কপিরাইট সুরক্ষিত সামগ্রী অননুমোদিত ডাউনলোড করবেন না
- সর্বদা কন্টেন্ট ক্রিয়েটরদের সম্মান করুন

## 🛠️ সমস্যা সমাধান

### ত্রুটি: "externally-managed-environment"
```bash
# Virtual environment ব্যবহার করুন
python3 -m venv venv
source venv/bin/activate  # Linux/Mac
# অথবা
venv\Scripts\activate.bat  # Windows
```

### ত্রুটি: "Module not found"
```bash
# Dependencies পুনরায় ইনস্টল করুন
pip install -r requirements.txt
```

### ত্রুটি: "Port 8000 already in use"
আপনার অন্য একটি অ্যাপ পোর্ট 8000 ব্যবহার করছে। `main.py` এ পোর্ট পরিবর্তন করুন:
```python
uvicorn.run(app, host="0.0.0.0", port=8080)  # 8080 এ পরিবর্তন করুন
```

## 📦 Dependencies

- **FastAPI** - ওয়েব ফ্রেমওয়ার্ক
- **Uvicorn** - ASGI সার্ভার
- **yt-dlp** - YouTube ভিডিও ডাউনলোডার
- **python-multipart** - ফাইল আপলোড হ্যান্ডলিং
- **aiofiles** - অ্যাসিঙ্ক ফাইল অপারেশন

## 🎨 ফ্রন্টএন্ড ফিচার

- আধুনিক, প্রতিক্রিয়াশীল ডিজাইন
- গ্রেডিয়েন্ট পটভূমি
- মসৃণ অ্যানিমেশন
- মোবাইল-বান্ধব ইন্টারফেস
- রিয়েল-টাইম প্রগতি ট্র্যাকিং
- ত্রুটি বার্তা প্রদর্শন
- সাফল্যের বিজ্ঞপ্তি

## 📧 যোগাযোগ এবং সহায়তা

যদি সমস্যার সম্মুখীন হন, তাহলে:
1. README.md এবং এই ফাইল পড়ুন
2. সমস্যা সমাধান বিভাগ দেখুন
3. ত্রুটি লগ পরীক্ষা করুন

## 📄 লাইসেন্স

MIT License - আপনি এটি অবাধে ব্যবহার, পরিবর্তন এবং বিতরণ করতে পারেন।

---

**সংস্করণ:** 1.0  
**শেষ আপডেট:** 2026-09-10  
**স্থিতি:** উৎপাদন-প্রস্তুত
