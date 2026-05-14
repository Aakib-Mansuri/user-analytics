# Local Setup Guide

Complete guide to running the project locally after cloning.

---

## Prerequisites
Make sure you have these installed:
- **Node.js** v18 or higher — https://nodejs.org
- **npm** v9 or higher (comes with Node.js)
- A **MongoDB Atlas** account (free) — https://mongodb.com/atlas

---

## Step 1 — Clone the Repository
```bash
git clone https://github.com/<your-username>/user-analytics.git
cd user-analytics
```

---

## Step 2 — Set Up MongoDB Atlas

1. Go to [mongodb.com/atlas](https://mongodb.com/atlas) and sign up (free)
2. Click **Create** → choose **M0 Free Tier** → any region → Create
3. Under **Security → Database Access** → Add a new user with username + password
   - Save the username and password — you'll need them in Step 3
4. Under **Security → Network Access** → Add IP Address → **Allow Access from Anywhere** (`0.0.0.0/0`)
5. Under **Deployment → Database** → click **Connect** → **Drivers**
6. Copy your connection string — it looks like:
   ```
   mongodb+srv://<username>:<db_password>@cluster0.xxxxx.mongodb.net/?appName=Cluster0
   ```

---

## Step 3 — Configure Environment Variables

### Backend
Create `backend/.env`:
```bash
cp backend/.env.example backend/.env
```

Open `backend/.env` and fill in your values:
```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/analytics?appName=Cluster0
PORT=5000
CORS_ORIGIN=http://localhost:5173
```

> Important: Add `/analytics` before the `?` in the connection string — this sets the database name.

### Frontend
Create `frontend/.env`:
```bash
cp frontend/.env.example frontend/.env
```

`frontend/.env` should contain:
```
VITE_API_BASE_URL=http://localhost:5000
```

---

## Step 4 — Install Dependencies

Run once from the **root** of the project:
```bash
npm run install:all
```

This installs dependencies for backend, frontend, and root (concurrently) in one shot.

If this fails on Windows, run them separately:
```bash
cd backend && npm install
cd ../frontend && npm install
cd .. && npm install
```

---

## Step 5 — Database Migration (Indexes)

No manual migration needed. When the backend starts and connects to MongoDB for the first time, **Mongoose automatically creates all indexes**:

| Index | Purpose |
|-------|---------|
| `session_id` | Fast session journey queries |
| `page_url + event_type` | Fast heatmap queries |
| `timestamp DESC` | Time-sorted event listing |

These are created once on first boot and never again.

---

## Step 6 — Seed Sample Data (optional)

If you want the dashboard pre-populated with data instead of starting empty:
```bash
cd backend
npm run seed
```

Output:
```
Connected to MongoDB
Cleared existing events
Seeded 5 sessions with ~87 events
Done
```

This inserts 5 sample sessions with realistic page views and click coordinates across all 3 demo pages.

> Skip this if you prefer to generate real data by using the demo site yourself.

---

## Step 7 — Start Everything

Run from the **root** of the project:
```bash
npm run dev
```

This starts both servers simultaneously with color-coded output:

```
[BACKEND] Connected to MongoDB
[BACKEND] Server running on port 5000
[FRONTEND] VITE ready in 362ms
[FRONTEND] ➜ Local: http://localhost:5173/
```

| Service | URL |
|---------|-----|
| Dashboard (React) | http://localhost:5173 |
| Demo Home | http://localhost:5174 |
| Demo About | http://localhost:5174/about |
| Demo Products | http://localhost:5174/products |
| Backend API | http://localhost:5000 |
| Health Check | http://localhost:5000/health |

---

## Step 8 — Verify It Works

1. Open **http://localhost:5000/health** — should return `{"status":"ok"}`
2. Open **http://localhost:5173** — dashboard loads with Sessions view
3. If you ran the seed, you'll see 5 sessions already listed
4. Open **http://localhost:5173/demo** — click around the demo store
5. Navigate between Home / About / Products — no page reloads, events fire on every route change
6. Refresh the dashboard — your new session appears
7. Click a session row → user journey expands below
8. Go to **Heatmap** → select a demo page URL → click **Load Heatmap** → dots appear

---

## Troubleshooting

**`EADDRINUSE: address already in use :::5000`**

Port 5000 is still occupied by a previous run. Kill all Node processes:
```bash
# Windows
taskkill /IM node.exe /F

# Mac/Linux
killall node
```
Then run `npm run dev` again.

**`npm run dev` fails with "MongoDB connection failed"**
- Double-check `MONGODB_URI` in `backend/.env`
- Make sure you replaced `<db_password>` with your actual password
- If password contains special characters (e.g. `@`, `#`), URL-encode them (e.g. `@` → `%40`)
- Check MongoDB Atlas → Network Access → confirm `0.0.0.0/0` is whitelisted

**Frontend opens on port 5174 instead of 5173**
- Port 5173 is occupied by a previous Vite process
- Kill all Node processes (see above) and restart

**Dashboard shows no sessions**
- Run the seed: `cd backend && npm run seed`
- Or open `http://localhost:5173/demo` and click around to generate real events
- Check browser console for CORS errors — make sure `CORS_ORIGIN` in `backend/.env` matches the frontend URL

**Heatmap dropdown is empty**
- No click events recorded yet — go to `http://localhost:5173/demo/products` and click the product cards
- Or run the seed script

**`npm run install:all` hangs or fails**
- Install each folder separately:
  ```bash
  cd backend && npm install
  cd ../frontend && npm install
  cd .. && npm install
  ```
