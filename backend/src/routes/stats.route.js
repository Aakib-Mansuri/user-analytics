const router = require('express').Router();
const { getStats, getTimeline, getTopPages } = require('../controllers/stats.controller');

router.get('/',         getStats);
router.get('/timeline', getTimeline);
router.get('/top-pages', getTopPages);

module.exports = router;
