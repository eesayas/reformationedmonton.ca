const express = require("express");
const User = require("../model/user");
const router = express.Router();
const title = "Reformation Baptist Church of Edmonton";
const passport = require('passport');
const Event = require("../model/event");

/**
@route  GET /
@desc   This is the homepage
@access Public
*/
router.get("/", async(req, res, next) => {
    const events = await Event.find({});
    res.render("index", { title, events });
});

/**
@route  GET /faith
@desc   This page displays the "Our Congregational Confession of Faith"
@access Public
*/
router.get("/faith", (req, res) => {
    res.render("faith", { title, subject: "Our Congregational Confession of Faith" });
});

/**
@route  GET /expectation
@desc   This page displays the "What can you expect?"
@access Public
*/
router.get("/expectation", (req, res) => {
    res.render("expectation", { title, subject: "What can you expect?" });
});

/**
@route  GET /distinctives
@desc   This page displays the "Distinctives"
@access Public
*/
router.get("/distinctives", (req, res) => {
    res.render("distinctives", { title, subject: "Distinctives" });
});

/**
@route  GET /pastor
@desc   This page displays the "Pastor/Teacher"
@access Public
*/
router.get("/pastor", (req, res) => {
    res.render("pastor", { title, subject: "Pastor/Teacher" });
});

/**
@route  GET /contact-us
@desc   This page displays the "Contact Us"
@access Public
*/
router.get("/contact-us", (req, res) => {
    res.render("contact", { title, subject: "Contact Us" });
});

/**
 * @route GET /login
 * @desc This will render a Login
 * @access Public
 */
router.get("/login", (req, res, next) =>{
    res.render("login", { title });
});

/**
 * @route POST /login
 * @desc This will login the user
 * @access Private
 */
router.post("/login", (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
      }) (req, res, next);
});

/**
@route  GET /logout
@desc   Logouts a user
@access Public
*/
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

/**
 * @route POST /register
 * @desc This will register user (MUST BE COMMENTED OUT)
 * @access Private
 */
router.post("/register", async(req, res, next) => {
    const newUser = new User({
        username: req.body.username,
    });

    await User.register(newUser, req.body.password);
    res.send(`${req.body.username} successfully registered`);
});


module.exports = router;