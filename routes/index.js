const express = require("express");
const router = express.Router();
const title = "Reformation Baptist Church of Edmonton";

/*
@route  GET /
@desc   This is the homepage
@access Public
*/
router.get("/", (req, res) => {
    res.render("index", { title });
});

/*
@route  GET /faith
@desc   This page displays the "Our Congregational Confession of Faith"
@access Public
*/
router.get("/faith", (req, res) => {
    res.render("faith", { title, subject: "Our Congregational Confession of Faith" });
});

/*
@route  GET /expectation
@desc   This page displays the "What can you expect?"
@access Public
*/
router.get("/expectation", (req, res) => {
    res.render("expectation", { title, subject: "What can you expect?" });
});

/*
@route  GET /distinctives
@desc   This page displays the "Distinctives"
@access Public
*/
router.get("/distinctives", (req, res) => {
    res.render("distinctives", { title, subject: "Distinctives" });
});

/*
@route  GET /pastor
@desc   This page displays the "Pastor/Teacher"
@access Public
*/
router.get("/pastor", (req, res) => {
    res.render("pastor", { title, subject: "Pastor/Teacher" });
});

/*
@route  GET /contact-us
@desc   This page displays the "Contact Us"
@access Public
*/
router.get("/contact-us", (req, res) => {
    res.render("contact", { title, subject: "Contact Us" });
});

module.exports = router;