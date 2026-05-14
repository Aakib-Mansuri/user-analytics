# Backend

## Overview
Node.js + Express REST API that receives tracking events, stores them in MongoDB Atlas, and serves aggregated data to the dashboard.

## Live URL
```
https://user-analytics-31fx.onrender.com
```

> Hosted on Render free tier — spins down after 15 min inactivity. First request after sleep takes ~30–50 seconds.

---

## Tech
- Node.js + Express
- Mongoose (MongoDB ODM)
- MongoDB Atlas M0 (free tier)

---

## Folder Structure
```
backend/
├── src/
│   ├── server.js                      # Entry point — DB connect + start server
│   ├── app.js                         # Express setup, CORS, route mounts
│   ├── models/
│   │   └── event.model.js             # Mongoose schema + indexes
│   ├── controllers/
│   │   ├── events.controller.js       # POST /api/events
│   │   ├── sessions.controller.js     # Sessions, heatmap, pages
│   │   └── stats.controller.js        # Overview stats, timeline, top pages
│   └── routes/
│       ├── events.route.js
│       ├── sessions.route.js
│       ├── heatmap.route.js
│       └── stats.route.js
├── seed.js                            # Sample data seeder
├── .env.example
└── package.json
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/events` | Receive and store a tracked event |
| GET | `/api/sessions` | List all sessions with event counts |
| GET | `/api/sessions/:id/events` | All events for a session (user journey) |
| GET | `/api/heatmap?page=<url>` | Click x/y data for a specific page |
| GET | `/api/heatmap/pages` | All page URLs that have click data |
| GET | `/api/stats` | Total sessions, events, clicks, page views |
| GET | `/api/stats/timeline` | Events per day for the last 7 days |
| GET | `/api/stats/top-pages` | Top 6 pages by visits and clicks |
| GET | `/health` | Health check — returns `{"status":"ok"}` |

---

## Event Schema (MongoDB)
```js
{
  session_id : String   // UUID — identifies the user session
  event_type : String   // "page_view" or "click"
  page_url   : String   // Full URL of the tracked page
  timestamp  : Date     // When the event occurred (ISO string from tracker)
  x          : Number   // Click X coordinate (null for page_view)
  y          : Number   // Click Y coordinate (null for page_view)
  created_at : Date     // Insertion timestamp (auto)
}
```

### Indexes
| Index | Purpose |
|-------|---------|
| `session_id` | Fast session journey lookups |
| `page_url + event_type` | Fast heatmap queries |
| `timestamp DESC` | Time-sorted listing and timeline aggregation |

---

## Sessions — No Separate Collection
Sessions are derived dynamically via MongoDB aggregation (`$group` by `session_id`). There is no separate sessions collection. This keeps the schema simple and avoids dual-write complexity.

---

## Environment Variables
```
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/analytics?appName=Cluster0
PORT=5000
```

> `CORS_ORIGIN` is no longer used — the backend allows all origins to keep the tracker embeddable on any site.
