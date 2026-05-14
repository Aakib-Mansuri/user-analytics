# Frontend (Dashboard)

## Overview
React SPA dashboard with two views — Sessions and Heatmap — that visualise data collected by the tracking script.

## Tech
- React 19 + Vite
- React Router v7
- Tailwind CSS v3
- Axios

## Folder Structure
```
frontend/
├── public/
│   ├── tracker.js          # Tracking script (served at /tracker.js)
│   └── demo/               # Demo pages (served at /demo/)
├── src/
│   ├── main.jsx            # React entry point
│   ├── App.jsx             # Router + Navbar
│   ├── index.css           # Tailwind directives
│   ├── api/
│   │   └── index.js        # All axios API calls
│   ├── pages/
│   │   ├── Sessions.jsx    # /sessions route
│   │   └── Heatmap.jsx     # /heatmap route
│   └── components/
│       ├── SessionTable.jsx    # Clickable sessions table
│       ├── EventList.jsx       # Ordered event journey panel
│       └── HeatmapCanvas.jsx   # Canvas with click dot rendering
├── .env.example
└── package.json
```

## Routes
| Route | Page |
|-------|------|
| `/` | Redirects to `/sessions` |
| `/sessions` | Sessions list + user journey |
| `/heatmap` | Heatmap view |

## Sessions View
- Table of all sessions showing session ID, event count, first seen, last seen
- Click any row to expand the full ordered user journey below it
- Journey shows: event type, page URL, coordinates (for clicks), timestamp

## Heatmap View
- Dropdown populated with page URLs that have real click data (from `/api/heatmap/pages`)
- Type or select a URL → click **Load Heatmap**
- Clicks rendered as radial gradient dots on an HTML5 canvas (1280×720)
- Overlapping dots appear darker, creating a natural density effect

## Environment Variables
```
VITE_API_BASE_URL=http://localhost:5000
```
