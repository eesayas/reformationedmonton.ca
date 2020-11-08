const express = require('express');
const router = express.Router();
const title = 'Reformation Baptist Church of Edmonton';
const Sermon = require("../model/sermon");

/**
 * @route GET /sermons
 * @desc INDEX - This will render all the sermons from db
 * @access Public
 */
router.get('/', (req, res, next) => {
    res.render('sermons/index', { title });
});

/**
 * @route GET /sermons/new
 * @desc NEW - This will render a form where sermons can be created by a User
 * @access Private
 */
router.get('/new', (req, res, next) => {
    res.render('sermons/new', { title });
});

/**
 * @route POST /sermons
 * @desc CREATE - This will create a new Sermon in db by User
 * @access Private
 */
router.post("/", async(req, res, next) => {
    // console.log(req.body);
    try{
        const sermon = await Sermon.create(req.body);
        if(!sermon) throw Error("Something went wrong while creating Sermon");

        // go to SHOW route   
        res.redirect(`/sermons/${sermon._id}`);
        // res.send(req.body);
    } catch(e){
        res.status(400).json({msg: e.message});
    }
});

/**
 * @route GET /sermons/:sermon_id
 * @desc SHOW - This will render a Sermon to be viewed in browser
 * @access Public
 */
router.get("/:sermon_id", async(req, res, next) => {
    try{
        const sermon = await Sermon.findById(req.params.sermon_id);
        if(!sermon) throw Error("Something went wrong while showing Sermon");

        res.render("sermons/show", { title, sermon });
    } catch(e){
        res.status(400).json({msg: e.message});
    }
});

/**
 * @route GET /sermons/:sermon_id/edit
 * @desc EDIT - This will render a form to edit a Sermon
 * @access Private
 */
router.get("/:sermon_id/edit", async(req, res, next) => {
    try{
        const sermon = await Sermon.findById(req.params.sermon_id);
        if(!sermon) throw Error("Something went wrong while retrieving Sermon");

        res.render("sermons/edit", { title, sermon });
    } catch(e){
        res.status(400).json({msg: e.message});
    }
});

/**
 * @route PUT /sermon/:sermon_id
 * @desc UPDATE - This will update a sermon in db
 * @access Private
 */
router.put("/:sermon_id", async(req, res, next) => {
    const { CreatedAt, Title, Description, Url, AuthorName, EmbedCode } = req.body;
    try{
        const sermon = await Sermon.findById(req.params.sermon_id);
        if(!sermon) throw Error("Something went wrong while retrieving Sermon to be updated");

        sermon.uploadDate = CreatedAt;
        sermon.title = Title;
        sermon.desc = Description;
        sermon.url = Url;
        sermon.authorName = AuthorName;
        sermon.embedCode = EmbedCode;

        await sermon.save();

        res.redirect(`/sermons/${sermon._id}`);
    } catch(e){
        res.status(400).json({msg: e.message});
    }
});

/**
 * @route DELETE /sermon/:sermon_id
 * @desc DELETE - This will delete the sermon from db
 * @access Private
 */
router.delete("/:sermon_id", async(req, res, next) => {
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
