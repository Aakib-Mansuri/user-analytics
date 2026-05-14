# Demo Pages

## Overview
A standalone React SPA ("ShopDemo") — completely independent from the dashboard.
Demonstrates the tracker script working on a real multi-page React application.

## Location
```
demo/                        ← standalone Vite React project (port 5174)
├── public/
│   └── tracker.js           ← tracker script injected via <script> tag
├── src/
│   ├── main.jsx
│   ├── App.jsx              # Router + nav layout
│   ├── style.css            # Original CSS styling
│   └── pages/
│       ├── Home.jsx         # /
│       ├── About.jsx        # /about
│       └── Products.jsx     # /products
├── index.html               # tracker.js injected here
├── .env.example
└── package.json
```

---

## How Tracking Works

`tracker.js` is injected in `demo/index.html` as a `<script>` tag — exactly as the assignment requires:

```html
<script src="/tracker.js" data-api="http://localhost:5000"></script>
```

- Fires `page_view` on initial load
- Fires `page_view` on every React Router navigation (via `history.pushState` patch)
- Fires `click` on every user click with x/y coordinates
- No React hooks, no framework dependency — pure vanilla JS

---

## Routes

| URL | Page |
|-----|------|
| `http://localhost:5174/` | Home |
| `http://localhost:5174/about` | About |
| `http://localhost:5174/products` | Products (best for heatmap data) |

---

## Pages

### Home (`/`)
- Hero: "Welcome to ShopDemo" with Browse Products + Learn More buttons
- 4 feature cards: ⚡ Fast Delivery, 🔒 Secure Payments, ↩️ Easy Returns, 🎁 Loyalty Rewards
- Popular Right Now buttons: Shop Electronics, Shop Clothing, View All Categories

### About (`/about`)
- Hero: "About Us"
- Our Story text + stat box (50K+ customers, 1200+ products, 30 day returns, 4.9★)
- 3 values cards: 🌱 Sustainability, 🤝 Community, 💡 Innovation

### Products (`/products`)
- Hero: "Our Products"
- Electronics grid: 🎧 Wireless Headphones, ⌚ Smart Watch, 📷 Mirrorless Camera, 💻 Ultrabook Laptop
- Clothing grid: 👟 Running Shoes, 🧢 Classic Cap, 🧥 Winter Jacket, 👜 Leather Bag
- Best page for heatmap data — many spread-out clickable elements

---

## Environment Variables
```
VITE_API_BASE_URL=http://localhost:5000   ← not used by tracker.js directly
```

The tracker reads the API URL from the `data-api` attribute in `index.html`, not from env vars.

---

## Run Standalone
```bash
cd demo
npm install
npm run dev
# → http://localhost:5174
```
