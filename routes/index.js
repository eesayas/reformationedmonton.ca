const express = require('express');
const router = express.Router();
const { indexPage, aboutPage, contactPage, visitPage } = require('../controllers/index');

router.get('/', indexPage);
router.get('/about-us', aboutPage);
router.get('/contact-us', contactPage);
router.get('/visit-us', visitPage);

module.exports = router;
