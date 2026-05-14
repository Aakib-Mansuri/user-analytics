const router = require('express').Router();
const { getHeatmap } = require('../controllers/sessions.controller');
const { getPages }   = require('../controllers/sessions.controller');

router.get('/',       getHeatmap);
router.get('/pages',  getPages);

module.exports = router;
