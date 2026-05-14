# Local Setup Guide

Complete guide to running the project locally after cloning.

---

## Prerequisites
- **Node.js** v18 or higher — https://nodejs.org
- **npm** v9 or higher (comes with Node.js)
- A **MongoDB Atlas** account (free) — https://mongodb.com/atlas

---

## Step 1 — Clone the Repository
```bash
git clone https://github.com/Aakib-Mansuri/user-analytics.git
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
6. Copy your connection string:
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

### Demo
Create `demo/.env`:
```bash
cp demo/.env.example demo/.env
```

`demo/.env` should contain:
```
VITE_API_BASE_URL=http://localhost:5000
```

> Note: The demo's tracker.js reads the API URL from the `data-api` attribute in `index.html`, not from env vars. The env file is only used if you extend the demo with direct API calls.

---

## Step 4 — Install Dependencies

Run once from the **root** of the project:
```bash
npm run install:all
```

This installs dependencies for backend, frontend, and demo in one shot.

If this fails on Windows, run them separately:
```bash
cd backend && npm install
cd ../frontend && npm install
cd ../demo && npm install
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

This starts all three services simultaneously with color-coded output:

```
[BACKEND]   Connected to MongoDB
[BACKEND]   Server running on port 5000
[DASHBOARD] VITE ready in 362ms
[DASHBOARD] ➜ Local: http://localhost:5173/
[DEMO]      VITE ready in 280ms
[DEMO]      ➜ Local: http://localhost:5174/
```

| Service | URL |
|---------|-----|
| Dashboard | http://localhost:5173 |
| Demo Store | http://localhost:5174 |
| Backend API | http://localhost:5000 |
| Health Check | http://localhost:5000/health |

---

## Step 8 — Verify It Works

1. Open **http://localhost:5000/health** — should return `{"status":"ok"}`
2. Open **http://localhost:5173** — dashboard loads, redirects to Overview
3. If you ran the seed, stats and charts are already populated
4. Open **http://localhost:5174** — demo store loads
5. Click around all 3 pages (Home, About, Products)
6. Return to the dashboard — your session appears in Sessions view
7. Click the session row → user journey expands
8. Go to **Heatmap** → a page URL is auto-selected → dots appear on the canvas

---

## Troubleshooting

**`EADDRINUSE: address already in use :::5000`**

Port 5000 is still occupied by a previous run. Kill all Node processes:
```bash
# Windows (PowerShell)
Get-Process -Name node | Stop-Process -Force

# Mac/Linux
killall node
```
Then run `npm run dev` again.

**MongoDB connection failed**
- Double-check `MONGODB_URI` in `backend/.env`
- Make sure you replaced `<password>` with your actual password
- If password contains special characters (`@`, `#`, `!`), URL-encode them (e.g. `@` → `%40`)
- In MongoDB Atlas → Network Access → confirm `0.0.0.0/0` is active

**Dashboard shows no data**
- Run the seed: `cd backend && npm run seed`
- Or open `http://localhost:5174` and click around to generate real events

**Heatmap dropdown is empty**
- No click events recorded yet — go to `http://localhost:5174/products` and click the product cards
- Or run the seed script

**`npm run install:all` hangs or fails**
- Install each folder separately as shown in Step 4
