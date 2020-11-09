const express = require("express");
const router = express.Router();
const title = 'Reformation Baptist Church of Edmonton';

/**
 * @route GET /visit
 * @desc This will render a form where visitors can put their info
 * @access Private
 */
router.get('/', (req, res, next) => {
    res.render("visits/index", { title, subject: "Visit Us" });
});

/**
 * @route POST /visit
 * @access CREATE - This will send an email to anyone concerned about the new visit log
 * @access Public
 */
router.post("/", async(req, res, next) => {
    try{
        // send email
        
        
        // render status page
        res.render("visits/status", { title, success: true });
    } catch(e){
        res.render("visits/status", { title, success: false });
    }
});

module.exports = router;