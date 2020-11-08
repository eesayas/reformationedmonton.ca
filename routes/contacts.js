const express = require("express");
const router = express.Router();
const Contact = require("../model/contact");
const title = 'Reformation Baptist Church of Edmonton';

/**
 * @route GET /contacts
 * @desc INDEX - This will render all contacts
 * @access Private
 */
router.get("/", async (req, res, next) => {
    try{
        const contacts = await Contact.find({});
        if(!contacts) throw Error("Something went wrong while fetching contacts");

        res.render("contacts/index", { title, contacts });
    } catch(e){
        res.status(400).json({msg: e.message});
    }
});

/**
 * @route GET /contacts/new
 * @desc NEW - This will render a form where people can enter their contant info and msg
 * @access Public
 */
router.get("/new", (req, res, next) => {
    const { status } = req.query;
    let msg;
    if(status === "fail") msg = "There was an error. Please try again.";

    res.render("contacts/new", { title, msg });
});

/**
 * @route POST /contacts
 * @desc CREATE - This will create a new Contact
 * @access Public
 */
router.post("/", async(req, res, next) => {
    try{
        const contact = await Contact.create(req.body);
        if(!contact) throw Error("Something went wrong while creating Contact");

        res.redirect("/contacts/success"); // redirect to success page!
    } catch(e){

        res.redirect("/contacts/new?status=fail");
        res.status(400).json({msg: e.message});
    }
});

/**
 * @route GET /contacts/:contact_id
 * @desc SHOW - This will render a Contact
 * @access Private
 */
router.get("/:contact_id", async(req, res, next) => {
    try{
        const contact = await Contact.findById(req.params.contact_id);
        if(!contact) throw Error("Something went wrong while retrieving Contact");

        res.render("contacts/show", { title, contact });
    } catch(e){
        res.status(400).json({msg: e.message});
    }
});

/**
 * @route GET /contacts/:contact_id/edit
 * @desc EDIT - This will render a form for Contact to be edited by User
 * @access Private
 */
router.get("/:contact_id/edit", async(req, res, next) => {
    try{
        const contact = await Contact.findById(req.params.contact_id);
        if(!contact) throw Error("Something went wrong while retrieving Contact");

        res.render("contacts/edit", { title, contact });
    } catch(e){
        res.status(400).json({msg: e.message});
    }
});

/**
 * @route PUT /contacts/:contact_id
 * @desc UPDATE - This will update the contact in the db
 * @access Private
 */
router.put("/:contact_id", async(req, res, next) => {
    const { name, email, phone, msg } = req.body;
    
    try{
        const contact = await Contact.findById(req.params.contact_id);
        if(!contact) throw Error("Something went wrong while retrieving Contact");

        contact.name = name;
        contact.email = email;
        contact.phone = phone;
        contact.msg = msg;

        const updated = await contact.save();
        if(!updated) throw Error("Something went wrong while updating Contact");

        res.redirect(`/contacts/${req.params.contact_id}`);
    } catch(e){
        res.status(400).json({msg: e.message});
    }
});

/**
 * @route DELETE /contacts/:contact_id
 * @desc DELETE - This will delete the contact from db
 * @access Private
 */
router.delete("/:contact_id", async(req, res, next) => {
    try{
        const contact = await Contact.findById(req.params.contact_id);
        if(!contact) throw Error("Something went wrong while retrieving to delete Contact");

        const deleted = await contact.remove();
        if(!deleted) throw Error("Something went wrong while deleting Contact from db");

        res.redirect("/contacts"); // redirect to index
    } catch(e){
        res.status(400).json({msg: e.message});
    }
})



module.exports = router;