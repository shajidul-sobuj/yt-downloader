# GitHub + Render - দ্রুত ডিপ্লয় (৫ মিনিট)

## ✅ সবার জন্য সহজ ধাপ

### ধাপ ১: GitHub অ্যাকাউন্ট
```
https://github.com/signup
```

### ধাপ ২: নতুন রেপো তৈরি করুন
```
https://github.com/new
Name: YouTube-Downloader
Public করুন
Create করুন
```

### ধাপ ৩: কোড পুশ করুন (টার্মিনালে)

**গিট ইনস্টল আছে কি?**
```bash
git --version
```

থাকলে এই কমান্ডগুলো চালান:

```bash
cd ~/YouTube-Downloader

git init
git config user.name "Your Name"
git config user.email "your@email.com"

git add .
git commit -m "YouTube Downloader App"

# আপনার GitHub username দিয়ে পরিবর্তন করুন
git remote add origin https://github.com/YOUR_USERNAME/YouTube-Downloader.git
git branch -M main
git push -u origin main
```

**পাসওয়ার্ড চাইবে:**
```
https://github.com/settings/tokens
"Generate new token" → "repo" চেক করুন
টোকেন কপি করে পেস্ট করুন
```

### ধাপ ৪: Render.com এ সাইন আপ করুন
```
https://render.com
GitHub দিয়ে সাইন আপ করুন (সহজ!)
```

### ধাপ ৫: Render এ ডিপ্লয় করুন

১. Dashboard খুলুন: https://dashboard.render.com
২. **New** → **Web Service** ক্লিক করুন
৩. GitHub এ অনুমোদন করুন
৪. **YouTube-Downloader** নির্বাচন করুন
৫. এই সেটিংস রাখুন:
```
Name: youtube-downloader
Environment: Python 3
Build Command: pip install -r requirements.txt
Start Command: python main.py
```
৬. **Create Web Service** ক্লিক করুন

### ধাপ ৬: অপেক্ষা করুন (২-৩ মিনিট)

Render নিজে থেকে সেটআপ করবে। তারপর আপনাকে একটি URL দেবে:
```
https://youtube-downloader-XXXXX.onrender.com
```

---

## 🎉 সম্পন্ন!

এখন আপনার অ্যাপ লাইভ:
```
https://youtube-downloader.onrender.com
```

---

## 🔄 ভবিষ্যতে আপডেট করতে

কোড পরিবর্তন করুন এবং এই কমান্ড চালান:

```bash
git add .
git commit -m "Your message"
git push origin main
```

Render স্বয়ংক্রিয়ভাবে আপডেট করবে!

---

## 🆘 সমস্যা হলে?

**বিস্তারিত গাইড পড়ুন:** `GITHUB_RENDER_GUIDE.md`
