const express = require("express");
const router = express.Router();
const title = 'Reformation Baptist Church of Edmonton';
const Visit = require("../model/visit");

/**
 * @route GET /visits
 * @desc INDEX - This will render all visit
 * @access Private
 */
router.get('/', (req, res, next) => {
    res.render("visits/index", { title });
});

/**
 * @route GET /visits/new
 * @desc NEW - This will render a form where people can send
 * @access Public
 */
router.get("/new", (req, res, next) => {
    res.render("visits/new", { title });
});

/**
 * @route POST /visits
 * @access CREATE - This will create a new Visit in db by people
 * @access Public
 */
router.post("/", async(req, res, next) => {
    try{
        const visit = await Visit.create(req.body);
        if(!visit) throw Error("Something went wrong while creating visit log");

        res.redirect("/visits/success");
    } catch(e){
        res.status(400).json({msg: e.message});
    }
});

/**
 * @route GET /visits/:visit_id
 * @desc SHOW - This will render a Visit to be viewed in browser
 * @access Private
 */
router.get("/:visit_id", async(req, res, next) => {
    try{
        const visit = await Visit.findById(req.params.visit_id);
        if(!visit) throw Error("Something went wrong while retrieving Visit");

        res.render("visits/show", { title, visit });
    } catch(e){
        res.status(400).json({msg: e.message});
    }
});

/**
 * @route GET /visits/:visit_id/edit
 * @desc EDIT - This will render a form to edit a Visit
 * @access Public
 */
router.get("/:visit_id/edit", async(req, res, next) => {
    const { status } = req.query;
    let msg;

    try{
        const visit = await Visit.findById(req.params.visit_id);
        if(!visit) throw Error("Something went wrong while retrieving Visit to edit");

        if(status === "fail"){
            msg = "Something went wrong while updating you visit. Please try again.";

        } else if(status === "success"){
            msg = "Updating your visit was successful."
        }

        res.render("visits/edit", { title, visit, msg });
    } catch(e){
        res.status(400).json({msg: e.message});
    }
});

/**
 * @route PUT /visits/:visit_id
 * @desc UPDATE - This will update the visit in the db
 * @access Public
 */
router.put("/:visit_id", async(req, res, next) => {
    // the person can edit msg, and if they want to cancel it or not
    const { msg, cancelled } = req.body;

    try{
        const visit = await Visit.findById(req.params.visit_id);
        if(!visit) throw Error("Something went wrong while retrieving Visit from db");

        visit.msg = msg;
        visit.cancelled = cancelled;

        const updated = await visit.save();
        if(!updated) throw Error("Something went wrong while updating visit");


        // if update was successful 
        res.redirect(`/visits/${req.params.visit_id}/edit?status=success`);
    } catch(e){
        console.log(e);

        // if there is an error on updating, redirect back to edit with failure query
        res.redirect(`/visits/${req.params.visit_id}/edit?status=fail`);
    }
});

/**
 * @route DELETE /visits/:visit_id
 * @desc DELETE - This will delete the visit from db
 * @access Private
 */
router.delete("/:visit_id", async(req, res, next) => {
    try{
        const visit = await Visit.findById(req.params.visit_id);
        if(!visit) throw Error("Something went wrong while retrieving to delete Visit");

        const deleted = await visit.remove();
        if(!deleted) throw Error("Something went wrong while deleting Visit from db");

        res.redirect("/visits"); // redirect to index
    } catch(e){
        res.status(400).json({msg: e.message});
    }
});

module.exports = router;