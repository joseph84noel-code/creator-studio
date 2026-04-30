# 🎬 Creator Studio — Vercel Deployment Guide

## What's in this folder

```
creator-studio/
├── index.html           ← App entry point
├── vite.config.js       ← Build config
├── package.json         ← Dependencies
├── src/
│   ├── main.jsx         ← React entry
│   └── App.jsx          ← Full app code
└── public/
    ├── manifest.json    ← PWA config (for iPhone home screen)
    ├── icon.svg         ← Favicon
    ├── icon-192.png     ← PWA icon
    ├── icon-512.png     ← PWA icon
    └── apple-touch-icon.png  ← iPhone home screen icon
```

---

## 🚀 Deploy to Vercel (Step by Step)

### Step 1 — Create a free account
Go to [vercel.com](https://vercel.com) and sign up for free.

### Step 2 — Upload your project

**Option A: Drag & Drop (easiest)**
1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Browse"** and upload this entire `creator-studio` folder
3. Vercel auto-detects it as a Vite project
4. Click **Deploy** — done in ~30 seconds ✅

**Option B: Via GitHub**
1. Push this folder to a GitHub repo
2. On Vercel, click **"Import Git Repository"**
3. Select your repo → Deploy

### Step 3 — Get your URL
Vercel gives you a free URL like:
`https://creator-studio-yourname.vercel.app`

---

## 📱 Add to iPhone Home Screen

1. Open your Vercel URL in **Safari** on your iPhone
2. Tap the **Share button** (box with arrow pointing up)
3. Scroll down and tap **"Add to Home Screen"**
4. Name it **"Creator Studio"** → tap **Add**

It will appear on your home screen like a real app! 🎉

---

## 💡 Notes

- Your data resets on page refresh (no database yet).
  If you want data to persist, let me know and I can add localStorage support.
- The app works offline once loaded on your iPhone.
- Free Vercel plan is more than enough for personal use.
