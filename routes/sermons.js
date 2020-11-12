const express = require('express');
const router = express.Router();
const title = 'Reformation Baptist Church of Edmonton';
const Sermon = require("../model/sermon");
const moment = require("moment");
const { isLoggedIn } = require("../middleware");

/**
 * @route GET /sermons
 * @desc INDEX - This will render all the sermons from db
 * @access Public
 */
router.get('/', async(req, res, next) => {

    let sermons = await Sermon.find({}).select("-title -desc -_id -url -thumbnail -__v -createdAt -updatedAt");

    sermons = sermons.map(sermon => {
        return moment(sermon.uploadDate).format("MMMM YYYY");
    });

    // get all archive month-year
    let archive = Array.from(new Set(sermons));
    archive = archive.map(archive => {
        return {
            text: archive,
            query: `${moment().month(archive.split(" ")[0]).format("M")}-${moment().year(archive.split(" ")[1]).format("Y")}`
        }
    });

    // if query exists
    if(req.query.archive){
        let month = req.query.archive.split("-")[0] - 1;
        let year = req.query.archive.split("-")[1];

        let lowerBound = new Date(moment().set('year', year).set("month", month).startOf("month"));
        let upperBound = new Date(moment().set('year', year).set("month", month).endOf("month"));

        sermons = await Sermon.find({
            uploadDate: { "$gte": lowerBound, "$lt": upperBound }
        }).sort({uploadDate: -1});

        return res.render("sermons/index", { title , sermons, archive });
    }

    // if no query
    sermons = await Sermon.find({}).sort({uploadDate: -1}).limit(30);
    return res.render('sermons/index', { title , sermons, archive });
});

/**
 * @route GET /sermons/new
 * @desc NEW - This will render a form where sermons can be created by a User
 * @access Private
 */
router.get('/new', isLoggedIn, (req, res, next) => {
    res.render('sermons/new', { title });
});

/**
 * @route POST /sermons
 * @desc CREATE - This will create a new Sermon in db by User
 * @access Private
 */
router.post("/", isLoggedIn, async(req, res, next) => {
    let { uploadDate, title, desc, url } = req.body;
    
    //configure thumbnail
    let videoId = url.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent("v").replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1");
    let thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    const sermon = await Sermon.create({
        uploadDate, title, desc, url: videoId, thumbnail
    });

    return res.redirect(`/sermons/${sermon._id}`);
});

/**
 * @route POST /sermons/new
 * @desc This is for IFTT webhook. this will automatically create a Sermon, after upload to Youtube
 * @access Public
 */
router.post("/new", async(req, res, next) => {
    console.log(req.body);
    // let { uploadDate, title, desc, url, token } = req.body;

    // try{
    //     if(token !== process.env.AUTH_WEBHOOK_TOKEN) throw Error("Webhook token not matching");

    //     //configure thumbnail
    //     let videoId = url.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent("v").replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1");
    //     let thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    //     const sermon = await Sermon.create({
    //         uploadDate, title, desc, url: videoId, thumbnail
    //     });
    //     if(!sermon) throw Error("Something went wrong while auto creating sermon");

        res.status(200).json({success: true});
    // } catch(e){
    //     res.status(400).json({msg: e.message});
    // }
});

/**
 * @route GET /sermons/:sermon_id
 * @desc SHOW - This will render a Sermon to be viewed in browser
 * @access Public
 */
router.get("/:sermon_id", async(req, res, next) => {
    const sermon = await Sermon.findById(req.params.sermon_id);
    if(!sermon) throw Error("Something went wrong while showing Sermon");

    return res.render("sermons/show", { title, sermon });
});

/**
 * @route GET /sermons/:sermon_id/edit
 * @desc EDIT - This will render a form to edit a Sermon
 * @access Private
 */
router.get("/:sermon_id/edit", isLoggedIn, async(req, res, next) => {
    const sermon = await Sermon.findById(req.params.sermon_id);
    if(!sermon) throw Error("Something went wrong while retrieving Sermon");

    return res.render("sermons/edit", { title, sermon });
});

/**
 * @route PUT /sermon/:sermon_id
 * @desc UPDATE - This will update a sermon in db
 * @access Private
 */
router.put("/:sermon_id", isLoggedIn, async(req, res, next) => {
    let { uploadDate, title, desc, url } = req.body;
    
    //configure thumbnail
    let videoId = url.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent("v").replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1");
    let thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    const sermon = await Sermon.findById(req.params.sermon_id);
    if(!sermon) throw Error("Something went wrong while retrieving Sermon to be updated");

    sermon.uploadDate = uploadDate;
    sermon.title = title;
    sermon.desc = desc;
    sermon.url = videoId;
    sermon.thumbnail = thumbnail;

    await sermon.save();
    return res.redirect(`/sermons/${sermon._id}`);
});

/**
 * @route DELETE /sermon/:sermon_id
 * @desc DELETE - This will delete the sermon from db
 * @access Private
 */
router.delete("/:sermon_id", isLoggedIn, async(req, res, next) => {
    try{
        const sermon = await Sermon.findById(req.params.sermon_id);
        if(!sermon) throw Error("Something went wrong while retrieving to delete Sermon");

        await sermon.remove();

        res.redirect("/sermons"); // redirect to index
    } catch(e){
        res.status(400).json({msg: e.message});
    }
});

module.exports = router;
