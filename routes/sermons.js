const express = require('express');
const router = express.Router();
const { indexSermons, showSermon } = require('../controllers/sermons');

router.get('/', indexSermons);
router.get('/:date', showSermon);
router.post("/", (req, res, next) => {
    console.log(req.body);
});

module.exports = router;
