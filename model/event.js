const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    title: String,
    date: Date,
    msg: String, //rich text
}, {
    timestamps: true,
});

module.exports = mongoose.model("Event", EventSchema);