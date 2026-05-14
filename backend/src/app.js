const express = require('express');
const cors    = require('cors');

const eventsRoute   = require('./routes/events.route');
const sessionsRoute = require('./routes/sessions.route');
const heatmapRoute  = require('./routes/heatmap.route');
const statsRoute    = require('./routes/stats.route');

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN || '')
  .split(',').map(o => o.trim()).filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      cb(null, true);
    } else {
      cb(new Error('Not allowed by CORS'));
    }
  },
}));
app.use(express.json());

app.use('/api/events',   eventsRoute);
app.use('/api/sessions', sessionsRoute);
app.use('/api/heatmap',  heatmapRoute);
app.use('/api/stats',    statsRoute);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
