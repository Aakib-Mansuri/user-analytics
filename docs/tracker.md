# Tracker Script

## Overview
A self-contained vanilla JavaScript file (~60 lines, zero dependencies) that can be embedded on **any webpage** via a single `<script>` tag to track `page_view` and `click` events.

## Location
```
frontend/public/tracker.js   ← served at /tracker.js by dashboard (Vercel)
demo/public/tracker.js       ← copy served at /tracker.js by demo (Vercel)
```

Both files are identical. `frontend/public/tracker.js` is the source of truth — sync to `demo/public/tracker.js` when updated.

---

## Usage

Add to any HTML page:
```html
<!-- Production -->
<script src="https://user-analytics-nine.vercel.app/tracker.js"
        data-api="https://user-analytics-31fx.onrender.com"></script>

<!-- Local development -->
<script src="http://localhost:5173/tracker.js" data-api="http://localhost:5000"></script>
```

The `data-api` attribute points to the backend URL. If omitted, defaults to the production Render URL.

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
The tracker patches `history.pushState` so it works with React, Vue, Angular, and any SPA that uses the History API — no extra configuration needed:

```js
var _pushState = history.pushState;
history.pushState = function() {
  _pushState.apply(history, arguments);
  sendPageView();
};
window.addEventListener('popstate', sendPageView);
```

---

## Event Payloads

```js
// page_view
{
  session_id : "uuid-v4-string",
  event_type : "page_view",
  page_url   : "https://user-analytics-hq8r.vercel.app/products",
  timestamp  : "2024-01-10T10:00:00.000Z"
}

// click
{
  session_id : "uuid-v4-string",
  event_type : "click",
  page_url   : "https://user-analytics-hq8r.vercel.app/products",
  timestamp  : "2024-01-10T10:00:05.000Z",
  x          : 450,
  y          : 320
}
```

---

## Session ID
- Stored in `localStorage` under key `ua_session_id`
- Persists across page navigations and SPA route changes
- Falls back to an in-memory variable if `localStorage` is blocked (e.g. incognito with strict settings)

---

## Guard Against Double Load
```js
if (window.__ua_loaded) return;
window.__ua_loaded = true;
```
Safe to include the script tag multiple times — it only initialises once per page load.
