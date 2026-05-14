# Demo Store

## Overview
A standalone React SPA ("ShopDemo") — completely independent from the dashboard. Demonstrates the tracker script working on a real multi-page React application.

## Live URL
```
https://user-analytics-hq8r.vercel.app
```

---

## Tech
- React 19 + Vite
- React Router v7
- Vanilla CSS (no Tailwind)

---

## Folder Structure
```
demo/
├── public/
│   └── tracker.js           # Copy of tracker script
├── src/
│   ├── main.jsx
│   ├── App.jsx              # Router + nav layout
│   ├── style.css            # Demo store CSS
│   └── pages/
│       ├── Home.jsx         # /
│       ├── About.jsx        # /about
│       └── Products.jsx     # /products
├── index.html               # tracker.js injected here via <script> tag
├── vercel.json              # SPA rewrite rules
├── .env.example
└── package.json
```

---

## How Tracking Works

`tracker.js` is injected in `demo/index.html` as a `<script>` tag:

```html
<script src="/tracker.js" data-api="https://user-analytics-31fx.onrender.com"></script>
```

- Fires `page_view` on initial load
- Fires `page_view` on every React Router navigation (via `history.pushState` patch)
- Fires `click` on every user click with x/y coordinates
- No React hooks, no framework dependency — pure vanilla JS

---

## Routes

| URL | Page |
|-----|------|
| `/` | Home |
| `/about` | About |
| `/products` | Products (best for heatmap data) |

---

## Pages

### Home (`/`)
- Hero: "Welcome to ShopDemo" with Browse Products + Learn More buttons
- 4 feature cards: Fast Delivery, Secure Payments, Easy Returns, Loyalty Rewards
- Popular Right Now buttons: Shop Electronics, Shop Clothing, View All Categories

### About (`/about`)
- Hero: "About Us"
- Our Story section + stat box (50K+ customers, 1200+ products, 30-day returns, 4.9★)
- 3 values cards: Sustainability, Community, Innovation

### Products (`/products`)
- Hero: "Our Products"
- Electronics grid: Wireless Headphones, Smart Watch, Mirrorless Camera, Ultrabook Laptop
- Clothing grid: Running Shoes, Classic Cap, Winter Jacket, Leather Bag
- Best page for heatmap data — many spread-out clickable elements

---

## Environment Variables
No environment variables needed. The tracker reads the API URL directly from the `data-api` attribute in `index.html`.
