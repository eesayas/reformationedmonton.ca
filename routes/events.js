const express = require('express');
const router = express.Router();
const title = 'Reformation Baptist Church of Edmonton';

/**
 * @route GET /events
 * @desc INDEX - This will render out all events
 * @access Public
 */
router.get('/', (req, res, next) => {
    res.render("events/index", { title })
});



module.exports = router;