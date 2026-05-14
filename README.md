# User Analytics Application

A full-stack application that tracks user interactions on a webpage and displays them in an analytics dashboard.

Built as part of the CausalFunnel Full Stack Engineer assignment.

---

## Live Demo

| | URL |
|---|---|
| **Dashboard** | https://user-analytics-nine.vercel.app |
| **Demo Store** | https://user-analytics-hq8r.vercel.app |
| **Backend API** | https://user-analytics-31fx.onrender.com |

> The backend runs on Render's free tier and may take ~30–50 seconds to wake up on the first request.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend (Dashboard) | React 19, Vite, Tailwind CSS, Recharts |
| Frontend (Demo) | React 19, Vite, React Router |
| Backend | Node.js, Express |
| Database | MongoDB Atlas (Mongoose ODM) |
| Tracking Script | Vanilla JavaScript (zero dependencies) |
| Deployment | Vercel (frontend + demo), Render (backend) |

---

## Features

### Tracking Script (`tracker.js`)
- Embeddable on any webpage via a single `<script>` tag
- Tracks `page_view` and `click` events
- Works on both traditional multi-page sites and SPAs (React Router, etc.)
- Session ID persisted in `localStorage`
- Fails silently — never breaks the host page

### Dashboard
- **Overview** — total sessions, events, clicks, page views with area chart (7-day timeline), donut chart (event breakdown), and bar chart (top pages)
- **Sessions** — list of all sessions with event counts; click any row to expand the full ordered user journey
- **Heatmap** — select a page URL and visualise click positions as dots on a canvas

### Demo Store
- A 3-page React store (Home, About, Products) with `tracker.js` injected
- Demonstrates real-time tracking end-to-end

---

## Project Structure

```
user-analytics/
├── backend/          # Express REST API
├── frontend/         # React dashboard (Vite)
├── demo/             # Demo store (Vite React)
├── docs/             # Component documentation
├── plans/            # Deployment plan
└── README.md
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/events` | Store a tracked event |
| GET | `/api/sessions` | List all sessions with event counts |
| GET | `/api/sessions/:id/events` | All events for a session (user journey) |
| GET | `/api/heatmap?page=<url>` | Click coordinates for a page |
| GET | `/api/heatmap/pages` | All page URLs with click data |
| GET | `/api/stats` | Overview counts |
| GET | `/api/stats/timeline` | Events per day (last 7 days) |
| GET | `/api/stats/top-pages` | Top pages by visits and clicks |
| GET | `/health` | Health check |

---

## Local Setup

### Prerequisites
- Node.js v18+
- A free [MongoDB Atlas](https://mongodb.com/atlas) account

### 1. Clone the repository
```bash
git clone https://github.com/Aakib-Mansuri/user-analytics.git
cd user-analytics
```

### 2. Set up MongoDB Atlas
1. Create a free M0 cluster
2. Create a database user
3. Whitelist `0.0.0.0/0` under Network Access
4. Copy the connection string from **Connect → Drivers**

### 3. Configure environment variables

`backend/.env`:
```
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/analytics?appName=Cluster0
PORT=5000
```

`frontend/.env`:
```
VITE_API_BASE_URL=http://localhost:5000
```

`demo/.env`:
```
VITE_API_BASE_URL=http://localhost:5000
```

### 4. Install dependencies
```bash
npm run install:all
```

### 5. (Optional) Seed sample data
```bash
cd backend
npm run seed
```

### 6. Start everything
```bash
npm run dev
```

| Service | URL |
|---------|-----|
| Dashboard | http://localhost:5173 |
| Demo Store | http://localhost:5174 |
| Backend API | http://localhost:5000 |

---

## Assumptions & Trade-offs

**No separate Sessions collection**
Sessions are derived by aggregating the `events` collection grouped by `session_id`. This avoids dual-write complexity and keeps the schema simple. The trade-off is slightly heavier aggregation queries, which is acceptable at this scale.

**Tracker.js patches `history.pushState`**
To support SPA navigation without requiring framework-specific code, the tracker patches `history.pushState`. This is the same approach used by analytics tools like Segment and Mixpanel. The trade-off is it must load before the SPA framework initialises.

**Canvas-based heatmap (no library)**
The heatmap uses a plain HTML5 Canvas with radial gradient dots rather than a dedicated library like heatmap.js. This keeps the bundle small. The trade-off is it doesn't support zoom or overlay on a screenshot — it's coordinate-only.

**Open CORS policy**
CORS is open to all origins (`*`) to keep the tracker embeddable on any site without configuration. A production version would restrict this to known domains.

**Render free tier cold starts**
The backend is hosted on Render's free tier which spins down after 15 minutes of inactivity. The first request after sleep takes ~30–50 seconds. This is acceptable for a demo but would need an upgrade for production.

**Fixed canvas size (1280×720)**
The heatmap canvas is fixed at 1280×720 to match a typical desktop viewport. Clicks recorded on different screen sizes will be slightly offset. A production version would record viewport dimensions per event and normalise coordinates.
