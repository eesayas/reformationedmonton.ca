const express = require('express');
const router = express.Router();
const { newLog } = require('../controllers/visitors-log');

router.get('/new', newLog);
router.get('/calendar', (req, res, next) => {
    res.render('visitors-log/calendar');
});

module.exports = router;