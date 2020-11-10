const express = require('express');
const router = express.Router();
const title = 'Reformation Baptist Church of Edmonton';
const Event = require("../model/event");

/**
 * @route GET /events
 * @desc INDEX - This will render out all events
 * @access Public
 */
router.get('/', async(req, res, next) => {
    const events = await Event.find({});
    return res.render("events/index", { title , events });
});

/**
 * @route GET /events/new
 * @desc NEW - This will render out a form where an Event can be created
 * @access Private
 */
router.get('/new', (req, res, next) => {
    res.render("events/new", { title });
});

/**
 * @route POST /events
 * @desc CREATE - This will create the Event in the db
 * @access Private
 */
router.post("/", async(req, res, next) => {
    const { title, dayOfWeek, date, msg, link, time, location, schedule } = JSON.parse(req.body.data);

    // create event via req.body
    const event = await Event.create({
        title, dayOfWeek, date, msg, link, time, location, schedule
    });

    // redirect to newly created event
    res.redirect(`/events/${event._id}`);
});

/**
 * @route GET /events/:event_id
 * @desc SHOW - This will show an Event on the browser
 * @access Public
 */
router.get("/:event_id", async(req, res, next) => {
    // get the event from body
    const event = await Event.findById(req.params.event_id);
    res.render("events/show", { title, event });
});

/**
 * @route GET /events/:event_id/edit
 * @desc EDIT - This will render a form to edit the Event
 * @access Private
 */
router.get("/:event_id/edit", async(req, res, next) => {
    //get the event from db
    const event = await Event.findById(req.params.event_id);
    res.render("events/edit", { event });
});

/**
 * @route PUT /events/:event_id
 * @desc UPDATE - This will update the event on db
 * @access Private
 */
router.put("/:event_id", async(req, res, next) => {
    const { title, dayOfWeek, date, msg, link } = req.body;

    // get the event from db
    const event = await Event.findById(req.params.event_id);

    event.title = title;
    event.dayOfWeek = dayOfWeek;
    event.date = date;
    event.msg = msg;
    event.link = link;

    await event.save();

    res.redirect(`/events/${event._id}`);
});

/**
 * @route DELETE /events/:event_id
 * @desc DELETE - This will delete the event from the db
 * @access Private
 */
router.delete("/:event_id", async(req, res, next) => {
    const event = await Event.findById(req.params.event_id);
    await event.remove();

    res.redirect("/events");
});

module.exports = router;