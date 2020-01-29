const express = require('express');
const router = express.Router();
const { indexSermons, showSermon } = require('../controllers/sermons');

router.get('/', indexSermons);
router.get('/:date', showSermon);

module.exports = router;
