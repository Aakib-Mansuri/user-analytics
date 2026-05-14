# Frontend (Dashboard)

## Overview
React SPA analytics dashboard that visualises data collected by the tracking script. Three views: Overview, Sessions, and Heatmap.

## Live URL
```
https://user-analytics-nine.vercel.app
```

---

## Tech
- React 19 + Vite
- React Router v7
- Tailwind CSS v3
- Recharts (charts)
- Axios (API calls)

---

## Folder Structure
```
frontend/
├── public/
│   └── tracker.js          # Tracking script (served at /tracker.js)
├── src/
│   ├── main.jsx            # React entry point
│   ├── App.jsx             # Router + Navbar
│   ├── index.css           # Tailwind directives
│   ├── api/
│   │   └── index.js        # All axios API calls
│   ├── pages/
│   │   ├── Overview.jsx    # /overview — stats + charts
│   │   ├── Sessions.jsx    # /sessions — session list + journey
│   │   └── Heatmap.jsx     # /heatmap — click dot canvas
│   └── components/
│       ├── SessionTable.jsx    # Clickable sessions table
│       ├── EventList.jsx       # Ordered event journey panel
│       └── HeatmapCanvas.jsx   # Canvas with click dot rendering
├── vercel.json             # SPA rewrite rules
├── .env.example
└── package.json
```

---

## Routes
| Route | Page |
|-------|------|
| `/` | Redirects to `/overview` |
| `/overview` | Stats summary + charts |
| `/sessions` | Sessions list + user journey |
| `/heatmap` | Heatmap view |

---

## Overview Page
- 4 stat cards: Total Sessions, Total Events, Total Clicks, Total Page Views
- **Area chart** — events per day over the last 7 days (page views vs clicks)
- **Donut chart** — event type breakdown (page views vs clicks)
- **Bar chart** — top 6 pages by visits and clicks

## Sessions Page
- Table of all sessions: session ID (truncated), event count, first seen, last seen
- Click any row to expand the full ordered user journey below it
- Journey shows: event type badge, page URL, coordinates (for clicks), timestamp

## Heatmap Page
- Dropdown auto-populated with page URLs that have real click data
- First URL is auto-selected and loaded on page open
- Clicks rendered as radial gradient dots on an HTML5 Canvas (1280×720)
- Overlapping dots appear darker — natural density effect without a library

---

## Environment Variables
```
VITE_API_BASE_URL=http://localhost:5000
```
In production set to: `https://user-analytics-31fx.onrender.com`
