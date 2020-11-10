const express = require("express");
const router = express.Router();
const Contact = require("../model/contact");
const title = 'Reformation Baptist Church of Edmonton';

/**
 * @route GET /contacts
 * @desc  This will render a form
 * @access Public
 */
router.get("/", async (req, res, next) => {
    res.render("contact", { title, subject: "Contact Us" });
});

module.exports = router;