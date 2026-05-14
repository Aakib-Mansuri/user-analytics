const Event = require('../models/event.model');

const storeEvent = async (req, res) => {
  try {
    const { session_id, event_type, page_url, timestamp, x, y } = req.body;

    if (!session_id || !event_type || !page_url || !timestamp) {
      return res.status(400).json({ error: 'Missing required fields: session_id, event_type, page_url, timestamp' });
    }

    if (!['page_view', 'click'].includes(event_type)) {
      return res.status(400).json({ error: 'event_type must be page_view or click' });
    }

    if (event_type === 'click' && (x == null || y == null)) {
      return res.status(400).json({ error: 'x and y are required for click events' });
    }

    const event = await Event.create({
      session_id,
      event_type,
      page_url,
      timestamp: new Date(timestamp),
      x: event_type === 'click' ? x : null,
      y: event_type === 'click' ? y : null,
    });

    res.status(201).json({ success: true, id: event._id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to store event' });
  }
};

module.exports = { storeEvent };
