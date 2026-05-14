const router = require('express').Router();
const { getSessions, getSessionEvents } = require('../controllers/sessions.controller');

router.get('/',                   getSessions);
router.get('/:sessionId/events',  getSessionEvents);

module.exports = router;
