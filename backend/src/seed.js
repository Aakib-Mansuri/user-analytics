require('dotenv').config();
const mongoose = require('mongoose');
const Event    = require('./models/event.model');

const PAGES = [
  'http://localhost:5173/demo/index.html',
  'http://localhost:5173/demo/about.html',
  'http://localhost:5173/demo/products.html',
];

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');

  await Event.deleteMany({});
  console.log('Cleared existing events');

  const events = [];
  const sessionCount = 5;

  for (let s = 0; s < sessionCount; s++) {
    const sessionId = uuid();
    const baseTime  = Date.now() - randomBetween(0, 7 * 24 * 60 * 60 * 1000);
    let   offset    = 0;

    // visit 1-3 pages per session
    const pageVisits = randomBetween(1, 3);
    for (let p = 0; p < pageVisits; p++) {
      const page = PAGES[randomBetween(0, PAGES.length - 1)];

      // page_view
      events.push({
        session_id : sessionId,
        event_type : 'page_view',
        page_url   : page,
        timestamp  : new Date(baseTime + offset),
        x          : null,
        y          : null,
      });
      offset += randomBetween(1000, 3000);

      // 3-8 clicks per page
      const clickCount = randomBetween(3, 8);
      for (let c = 0; c < clickCount; c++) {
        events.push({
          session_id : sessionId,
          event_type : 'click',
          page_url   : page,
          timestamp  : new Date(baseTime + offset),
          x          : randomBetween(50, 1230),
          y          : randomBetween(50, 670),
        });
        offset += randomBetween(500, 2000);
      }
    }
  }

  await Event.insertMany(events);
  console.log(`Seeded ${sessionCount} sessions with ${events.length} events`);

  await mongoose.disconnect();
  console.log('Done');
}

seed().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
