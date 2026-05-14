const router = require('express').Router();
const { storeEvent } = require('../controllers/events.controller');

router.post('/', storeEvent);

module.exports = router;
