const express = require("express");
const router = express.Router();
const title = 'Reformation Baptist Church of Edmonton';
const Event = require("../model/event");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const moment = require("moment");

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
 * @route GET /visit
 * @desc This will render a form where visitors can put their info
 * @access Public
 */
router.get('/', async(req, res, next) => {
    const events = await Event.find({}); //get all events
    res.render("visit", { title, subject: "Visit Us", events });
});

/**
 * @route POST /visit
 * @access CREATE - This will send an email to anyone concerned about the new visit log
 * @access Public
 */
router.post("/", async(req, res, next) => {
    const { name, email, phone, event, date, msg } = JSON.parse(req.body.data);

    try{   
        const { time, location, title } = await Event.findById(event);

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

        // SEND EMAIL CONFIRMATION TO VISITOR

        // configure body of letter
        var body = `
            <p>To ${name},</p>
            <p>We look forward to seeing you on ${moment(date).format("LL - dddd")} at ${time}.</p>
            <p>The location would be: ${location.join(" or ")}</p>
            <p>If you plan to attend virtually, please click the GoToMeeting link at the event page on the day of the event:</p>
            <p>${process.env.WEBSITE_ROOT}/events/${event}</p>
            <em>*The link is subject to change every week. Therefore it would be best to use the link on the day of the event.</em>
            <br>
            <p>Please let us know of any questions or concerns by replying to this email.</p>
            <br>
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
            subject: "We are looking forward to meeting you!",
            html: body,
        };

        //send
        var mail = transporter.sendMail(mailOptions);
        if(!mail) throw Error(`Email was not sent to ${email}`);

        // cc email admins

        // config body
        body = `
            <p>${name} is planning to attend ${title} on ${moment(date).format("LL - dddd")}.</p>
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
            subject: `[VISIT] ${name} is planning to attend`,
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