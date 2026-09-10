# GitHub এবং Render.com ডিপ্লয়মেন্ট গাইড

## 📌 পূর্বশর্ত

- GitHub অ্যাকাউন্ট (বিনামূল্যে): https://github.com
- Render.com অ্যাকাউন্ট (বিনামূল্যে): https://render.com

---

## 🚀 ধাপ ১: GitHub রেপোজিটরি তৈরি করুন

### 1.1 GitHub.com এ যান
```
https://github.com/new
```

### 1.2 নিম্নলিখিত তথ্য পূরণ করুন:
```
Repository name: YouTube-Downloader
Description: YouTube video and playlist downloader web app
Visibility: Public
```

### 1.3 "Create repository" ক্লিক করুন

---

## 📤 ধাপ ২: প্রজেক্ট GitHub এ পুশ করুন

### 2.1 টার্মিনালে কমান্ড চালান:

```bash
cd ~/YouTube-Downloader

# Git ইনিশিয়ালাইজ করুন
git init

# Remote যোগ করুন (আপনার ইউজারনেম দিয়ে পরিবর্তন করুন)
git remote add origin https://github.com/YOUR_USERNAME/YouTube-Downloader.git

# সব ফাইল যোগ করুন
git add .

# কমিট করুন
git commit -m "Initial commit: YouTube Downloader web app with FastAPI, yt-dlp, and React-like UI"

# Main branch এ পুশ করুন
git branch -M main
git push -u origin main
```

### 2.2 প্রথম বার পাসওয়ার্ড চাইবে

**GitHub Personal Access Token ব্যবহার করুন:**

1. GitHub এ যান: https://github.com/settings/tokens
2. "Generate new token (classic)" ক্লিক করুন
3. Name: `YouTube-Downloader-Deployment`
4. Scopes: `repo` চেক করুন
5. "Generate token" ক্লিক করুন
6. টোকেন কপি করুন এবং পাসওয়ার্ড হিসেবে পেস্ট করুন

---

## 🌐 ধাপ ৩: Render.com এ ডিপ্লয় করুন

### 3.1 Render.com এ যান এবং সাইন আপ করুন
```
https://render.com
```

### 3.2 Dashboard এ যান
```
https://dashboard.render.com
```

### 3.3 নতুন Web Service তৈরি করুন

1. **"+ New +"** ক্লিক করুন
2. **"Web Service"** নির্বাচন করুন

### 3.4 GitHub রেপোজিটরি সংযুক্ত করুন

1. **"Connect a repository"** ক্লিক করুন
2. GitHub অ্যাকাউন্ট অনুমোদন করুন
3. **YouTube-Downloader** রেপো নির্বাচন করুন
4. **Connect** ক্লিক করুন

### 3.5 ডিপ্লয়মেন্ট সেটিংস কনফিগার করুন

```
Name: youtube-downloader
Environment: Python 3
Build Command: pip install -r requirements.txt
Start Command: python main.py
```

### 3.6 পরিবেশ ভেরিয়েবল যোগ করুন (অপশনাল)

```
PYTHON_VERSION = 3.12.3
```

### 3.7 **Create Web Service** ক্লিক করুন

---

## ⏳ অপেক্ষা করুন

Render স্বয়ংক্রিয়ভাবে:
1. ✅ গিট রেপো ক্লোন করবে
2. ✅ Dependencies ইনস্টল করবে (requirements.txt থেকে)
3. ✅ অ্যাপ্লিকেশন চালু করবে
4. ✅ একটি URL প্রদান করবে (যেমন: https://youtube-downloader.onrender.com)

---

## 🎯 আপনার লাইভ অ্যাপ অ্যাক্সেস করুন

একবার ডিপ্লয় সম্পন্ন হলে:

```
https://youtube-downloader.onrender.com
```

এই URL খুলুন এবং ভিডিও ডাউনলোড করুন!

---

## 📝 GitHub থেকে Render এ স্বয়ংক্রিয় আপডেট

যখনই আপনি GitHub এ পুশ করবেন, Render স্বয়ংক্রিয়ভাবে:
1. নতুন কোড ক্লোন করবে
2. নতুন বিল্ড তৈরি করবে
3. অ্যাপ্লিকেশন পুনরায় চালু করবে

```bash
# আপডেট করতে শুধুমাত্র করুন:
git add .
git commit -m "Update: your message"
git push origin main
```

---

## 🔄 কোড আপডেট করার উদাহরণ

ধরুন আপনি কোয়ালিটি অপশন যোগ করতে চান:

```bash
# 1. ফাইল সম্পাদনা করুন
nano main.py      # বা VS Code এ খুলুন

# 2. পরিবর্তন সংরক্ষণ করুন

# 3. GitHub এ পুশ করুন
git add .
git commit -m "Add new quality options"
git push origin main

# 4. Render স্বয়ংক্রিয়ভাবে আপডেট করবে!
```

---

## 🛡️ নিরাপত্তা টিপস

1. **API কী লুকান** (থাকলে)
   ```python
   # Render এ পরিবেশ ভেরিয়েবল যোগ করুন
   API_KEY = os.getenv('API_KEY')
   ```

2. **সংবেদনশীল তথ্য GitHub এ পুশ করবেন না**
   ```
   .env ফাইল .gitignore এ যোগ করুন
   ```

3. **Regular commits করুন**
   ```bash
   git log                    # History দেখুন
   git revert <commit_hash>   # পিছনে ফিরুন
   ```

---

## 🐛 সমস্যা সমাধান

### সমস্যা 1: "Build failed"

**সমাধান:**
```bash
# Render logs দেখুন:
# Dashboard → youtube-downloader → Logs

# সম্ভাব্য কারণ:
# - requirements.txt গুম
# - Python সংস্করণ সমস্যা
# - Syntax error কোডে
```

### সমস্যা 2: "Application crashed"

**সমাধান:**
```bash
# Render logs দেখুন
# main.py এ ত্রুটি খুঁজুন
```

### সমস্যা 3: "Download timeout"

**সমাধান:**
- Render এর ফ্রি প্ল্যানে বড় ফাইল সমস্যা হতে পারে
- Paid plan এ আপগ্রেড করুন

---

## 💰 Render.com মূল্য নির্ধারণ

| প্ল্যান | মূল্য | বৈশিষ্ট্য |
|--------|-------|---------|
| Free | $0/মাস | ছোট প্রজেক্টের জন্য |
| Starter | $7/মাস | বেশি শক্তিশালী |
| Pro | $12+/মাস | উৎপাদনের জন্য |

ফ্রি প্ল্যান যথেষ্ট হবে শুরুতে।

---

## 📊 GitHub এবং Render সংযোগ চেক করুন

```bash
# GitHub রিমোট দেখুন
git remote -v

# আউটপুট:
# origin  https://github.com/YOUR_USERNAME/YouTube-Downloader.git (fetch)
# origin  https://github.com/YOUR_USERNAME/YouTube-Downloader.git (push)
```

---

## 🎉 সবকিছু সেটআপ!

এখন আপনার YouTube Downloader:
- ✅ GitHub এ সংরক্ষিত
- ✅ Render এ লাইভ চলছে
- ✅ যেকোনো জায়গা থেকে অ্যাক্সেসযোগ্য
- ✅ স্বয়ংক্রিয় আপডেট সক্ষম

---

## 📱 বন্ধুদের সাথে শেয়ার করুন

```
আপনার লাইভ URL শেয়ার করুন:
https://youtube-downloader.onrender.com
```

---

## 🔗 দরকারি লিঙ্কস

- GitHub: https://github.com/YOUR_USERNAME/YouTube-Downloader
- Render: https://dashboard.render.com
- আপনার লাইভ অ্যাপ: https://youtube-downloader.onrender.com

---

**সংস্করণ:** 1.0  
**তৈরি:** 2026-09-10  
**অবস্থা:** সম্পূর্ণ
