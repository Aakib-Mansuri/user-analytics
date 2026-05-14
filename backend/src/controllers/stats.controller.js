const Event = require('../models/event.model');

const getStats = async (req, res) => {
  try {
    const [counts, sessionCount] = await Promise.all([
      Event.aggregate([
        { $group: { _id: '$event_type', count: { $sum: 1 } } },
      ]),
      Event.distinct('session_id').then(ids => ids.length),
    ]);

    const clicks     = counts.find(c => c._id === 'click')?.count     || 0;
    const page_views = counts.find(c => c._id === 'page_view')?.count || 0;

    res.json({
      total_sessions:   sessionCount,
      total_events:     clicks + page_views,
      total_clicks:     clicks,
      total_page_views: page_views,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};

const getTimeline = async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 7;
    const since = new Date();
    since.setDate(since.getDate() - days);

    const data = await Event.aggregate([
      { $match: { timestamp: { $gte: since } } },
      {
        $group: {
          _id: {
            date:       { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
            event_type: '$event_type',
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.date': 1 } },
    ]);

    // pivot into { date, page_view, click }
    const map = {};
    data.forEach(({ _id, count }) => {
      if (!map[_id.date]) map[_id.date] = { date: _id.date, page_view: 0, click: 0 };
      map[_id.date][_id.event_type] = count;
    });

    res.json(Object.values(map));
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch timeline' });
  }
};

const getTopPages = async (req, res) => {
  try {
    const data = await Event.aggregate([
      {
        $group: {
          _id:        '$page_url',
          page_views: { $sum: { $cond: [{ $eq: ['$event_type', 'page_view'] }, 1, 0] } },
          clicks:     { $sum: { $cond: [{ $eq: ['$event_type', 'click'] }, 1, 0] } },
        },
      },
      { $sort: { page_views: -1 } },
      { $limit: 6 },
      {
        $project: {
          _id:        0,
          page:       '$_id',
          page_views: 1,
          clicks:     1,
        },
      },
    ]);

    // shorten to last path segment for display
    const result = data.map(d => {
      let label = '/';
      try {
        const parts = new URL(d.page).pathname.split('/').filter(Boolean);
        label = parts.length ? '/' + parts[parts.length - 1] : '/';
      } catch {}
      return { ...d, label };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch top pages' });
  }
};

module.exports = { getStats, getTimeline, getTopPages };
