# Deployment Plan

## Stack

| Component | Platform | Free | URL Pattern |
|-----------|----------|------|-------------|
| MongoDB   | MongoDB Atlas (M0) | ✅ | internal |
| Backend   | Render (Web Service) | ✅ | https://user-analytics-api.onrender.com |
| Dashboard | Vercel | ✅ | https://user-analytics-dashboard.vercel.app |
| Demo      | Vercel (separate project) | ✅ | https://user-analytics-demo.vercel.app |

> Render free tier sleeps after 15 min inactivity. First request takes ~30s to wake up.

---

## Step 1 — MongoDB Atlas (already done)
- Cluster: `cluster0.ka77f1r.mongodb.net`
- Database: `analytics`
- Network Access: `0.0.0.0/0` whitelisted ✅

---

## Step 2 — Push to GitHub

```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/<username>/user-analytics.git
git push -u origin main
```

`.gitignore` excludes:
```
node_modules/
backend/.env
frontend/.env
demo/.env
```

---

## Step 3 — Deploy Backend → Render

1. render.com → New → **Web Service** → connect GitHub repo
2. Settings:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `node src/server.js`
3. Environment Variables:
   ```
   MONGODB_URI  = mongodb+srv://aakibmansuri958_db_user:<password>@cluster0.ka77f1r.mongodb.net/analytics?appName=Cluster0
   CORS_ORIGIN  = https://user-analytics-dashboard.vercel.app,https://user-analytics-demo.vercel.app
   ```
4. Deploy → note down the URL

---

## Step 4 — Deploy Dashboard → Vercel

1. vercel.com → New Project → import repo
2. Settings:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Vite
3. Environment Variables:
   ```
   VITE_API_BASE_URL = https://user-analytics-api.onrender.com
   ```
4. Deploy → note down the URL

---

## Step 5 — Deploy Demo → Vercel

1. Vercel → New Project → import **same** repo
2. Settings:
   - **Root Directory:** `demo`
   - **Framework Preset:** Vite
3. No environment variables needed
4. Deploy → note down the URL

---

## Step 6 — Update tracker.js After Deploy

Update `demo/index.html` with live backend URL:
```html
<script src="/tracker.js" data-api="https://user-analytics-api.onrender.com"></script>
```

Update default fallback in `demo/public/tracker.js` and `frontend/public/tracker.js`:
```js
const API_URL = document.currentScript?.getAttribute('data-api')
  || 'https://user-analytics-api.onrender.com';
```

Commit and push — both Vercel projects redeploy automatically.

---

## Step 7 — Verify End-to-End

1. Open `https://user-analytics-demo.vercel.app` — click around all 3 pages
2. Open `https://user-analytics-dashboard.vercel.app`
3. Overview — sessions and events visible
4. Heatmap — select a page, dots appear

---

## Final URLs

| What | URL |
|------|-----|
| Dashboard | https://user-analytics-nine.vercel.app |
| Demo Site | https://user-analytics-hq8r.vercel.app |
| Backend API | https://user-analytics-31fx.onrender.com |
