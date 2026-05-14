# Tracker Script

## Overview
A self-contained vanilla JavaScript file (~60 lines, zero dependencies) that can be embedded on **any webpage** via a single `<script>` tag to track `page_view` and `click` events.

## Location
```
frontend/public/tracker.js   ← served at /tracker.js by dashboard (Vercel)
demo/public/tracker.js       ← copy served at /tracker.js by demo (Vercel)
```

Both are identical files. The one in `frontend/public/` is the source of truth — sync to `demo/public/` when updated.

---

## Usage

Add to any HTML page:
```html
<!-- Local development -->
<script src="http://localhost:5173/tracker.js" data-api="http://localhost:5000"></script>

<!-- Production -->
<script src="https://your-dashboard.vercel.app/tracker.js"
        data-api="https://your-backend.onrender.com"></script>
```

The `data-api` attribute points to the backend URL. If omitted, defaults to `http://localhost:5000`.

---

## How It Works

1. On script load → generates/reuses `session_id` from `localStorage`
2. Fires `page_view` immediately
3. Patches `history.pushState` + listens to `popstate` → fires `page_view` on every SPA route change
4. Listens to `document` click → fires `click` with x/y coordinates
5. POSTs each event to `{data-api}/api/events`
6. Fails silently — never breaks the host page

---

## SPA Support
The tracker patches `history.pushState` so it works on React, Vue, Angular, and any other SPA that uses the History API — no extra configuration needed:

```js
// tracker.js patches this internally
history.pushState = function() { ... sendPageView(); }
window.addEventListener('popstate', sendPageView);
```

---

## Event Payloads

```js
// page_view
{
  session_id : "uuid-v4-string",
  event_type : "page_view",
  page_url   : "http://localhost:5174/products",
  timestamp  : "2024-01-10T10:00:00.000Z"
}

// click
{
  session_id : "uuid-v4-string",
  event_type : "click",
  page_url   : "http://localhost:5174/products",
  timestamp  : "2024-01-10T10:00:05.000Z",
  x          : 450,
  y          : 320
}
```

---

## Session ID
- Stored in `localStorage` under key `ua_session_id`
- Persists across page navigations and SPA route changes
- Falls back to in-memory variable if `localStorage` is blocked
