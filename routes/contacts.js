const express = require("express");
const router = express.Router();
const title = 'Reformation Baptist Church of Edmonton';
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

//define oauth client
const oauth2Client = new OAuth2(
    process.env.OAUTH2_CLIENT_ID,
    process.env.OAUTH2_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
);
oauth2Client.setCredentials({
    refresh_token: process.env.OAUTH2_REFRESH_TOKEN
});

/**
 * @route GET /contact
 * @desc  This will render a form
 * @access Public
 */
router.get("/", async(req, res, next) => {
    res.render("contact", { title, subject: "Contact Us" });
});

/**
 * @route POST /contact
 * @desc This will email
 * @access Public
 */
router.post("/", async(req, res, next) => {
    const { name, email, phone, msg } = JSON.parse(req.body.data);
    try{
        //get new access token
        const accessToken = await oauth2Client.getAccessToken(); 

        //config transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: process.env.GMAIL_ADDRESS,
                clientId: process.env.OAUTH2_CLIENT_ID,
                clientSecret: process.env.OAUTH2_CLIENT_SECRET,
                refreshToken: process.env.OAUTH2_REFRESH_TOKEN,
                accessToken: accessToken.token,
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // SEND EMAIL CONFIRMATION
        // configure body of letter
        var body = `
            <p>To ${name},</p>
            <p>You have successfully submitted an inquiry.</p>            
            <p>For your purposes, these are the informations you've provided us:</p>
            <p>Name : ${name}</p>
            <p>Email : ${email}</p>
            <p>Phone : ${phone !== "" ? phone : "N/A"}</p>
            <p>Message : ${msg !== "" ? msg : "N/A"}</p>
        `;

        //config mail options
        var mailOptions = {
            from: `"Reformation Baptist Church of Edmonton" <${process.env.GMAIL_ADDRESS}>`,
            to: email,
            subject: "You have submitted a question.",
            html: body,
        };

        //send
        var mail = transporter.sendMail(mailOptions);
        if(!mail) throw Error(`Email was not sent to ${email}`);

        // email to admins

        // config body
        body = `
            <p>${name} has a question</p>
            <p>${name}'s provided info:</p>
            <p>Name : ${name}</p>
            <p>Email : ${email}</p>
            <p>Phone : ${phone !== "" ? phone : "N/A"}</p>
            <p>Message : ${msg !== "" ? msg : "N/A"}</p>
        `
        // config mail options 
        mailOptions = {
            from: `"Reformation Baptist Church of Edmonton" <${process.env.GMAIL_ADDRESS}>`,
            to: [ process.env.GMAIL_ADDRESS ],
            subject: `[INQUIRY] ${name} has a question`,
            html: body,
        }

        //send
        mail = transporter.sendMail(mailOptions);
        if(!mail) throw Error(`Email was not sent to admins`);

        res.status(200).json({success: true});
    } catch(err){
        res.status(400).json({msg: err.message});
    }

});


module.exports = router;