const express = require('express');
const router = express.Router();
const { indexEvents, showEvent } = require('../controllers/events');

router.get('/', indexEvents);
router.get('/:date_and_time', showEvent);

module.exports = router;