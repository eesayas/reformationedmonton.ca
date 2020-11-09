const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    title: String,
    dayOfWeek: { type: String, enum: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] },
    date: Date,
    msg: String, //rich text
}, {
    timestamps: true,
});

module.exports = mongoose.model("Event", EventSchema);