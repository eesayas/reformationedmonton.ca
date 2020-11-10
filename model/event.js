const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    title: String,
    dayOfWeek: { type: String, enum: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] },
    date: Date,
    msg: String, //rich text
    link: String,
    time: String,
    location: [ { type: String } ],
    schedule: [{ activity: String, time: String }],
    coverPhoto: String,
}, {
    timestamps: true,
});

module.exports = mongoose.model("Event", EventSchema);