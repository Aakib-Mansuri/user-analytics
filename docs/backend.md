# Backend

## Overview
Node.js + Express REST API that receives tracking events, stores them in MongoDB, and serves aggregated data to the dashboard.

## Tech
- Node.js + Express
- Mongoose (MongoDB ODM)
- MongoDB Atlas (database)

## Folder Structure
```
backend/
├── src/
│   ├── server.js                      # Entry point — DB connect + start server
│   ├── app.js                         # Express setup, middleware, route mounts
│   ├── models/
│   │   └── event.model.js             # Mongoose schema + indexes
│   ├── controllers/
│   │   ├── events.controller.js       # POST /api/events logic
│   │   └── sessions.controller.js     # Sessions, heatmap, pages logic
│   └── routes/
│       ├── events.route.js
│       ├── sessions.route.js
│       └── heatmap.route.js
├── .env.example
└── package.json
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/events` | Receive and store a tracked event |
| GET | `/api/sessions` | List all sessions with event counts |
| GET | `/api/sessions/:sessionId/events` | All events for a session (user journey) |
| GET | `/api/heatmap?page=<url>` | Click x/y data for a specific page |
| GET | `/api/heatmap/pages` | List all page URLs that have click data |
| GET | `/health` | Health check |

## Event Schema (MongoDB)
```js
{
  session_id : String   // UUID — identifies the user session
  event_type : String   // "page_view" or "click"
  page_url   : String   // Full URL of the tracked page
  timestamp  : Date     // When the event occurred
  x          : Number   // Click X coordinate (null for page_view)
  y          : Number   // Click Y coordinate (null for page_view)
  created_at : Date     // When the record was inserted
}
```

## Environment Variables
```
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/analytics
PORT=5000
CORS_ORIGIN=http://localhost:5173
```
