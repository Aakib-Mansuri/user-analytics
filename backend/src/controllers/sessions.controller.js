const Event = require('../models/event.model');

const getSessions = async (req, res) => {
  try {
    const sessions = await Event.aggregate([
      {
        $group: {
          _id:         '$session_id',
          event_count: { $sum: 1 },
          first_seen:  { $min: '$timestamp' },
          last_seen:   { $max: '$timestamp' },
        },
      },
      { $sort: { last_seen: -1 } },
      {
        $project: {
          _id:         0,
          session_id:  '$_id',
          event_count: 1,
          first_seen:  1,
          last_seen:   1,
        },
      },
    ]);

    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
};

const getSessionEvents = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const events = await Event.find({ session_id: sessionId })
      .sort({ timestamp: 1 })
      .select('-__v -created_at');

    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch session events' });
  }
};

const getHeatmap = async (req, res) => {
  try {
    const { page } = req.query;

    if (!page) {
      return res.status(400).json({ error: 'page query param is required' });
    }

    const clicks = await Event.find({ event_type: 'click', page_url: page })
      .select('x y timestamp -_id');

    res.json(clicks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch heatmap data' });
  }
};

const getPages = async (req, res) => {
  try {
    const urls = await Event.distinct('page_url', { event_type: 'click' });
    res.json(urls);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch pages' });
  }
};

module.exports = { getSessions, getSessionEvents, getHeatmap, getPages };
