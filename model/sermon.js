const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SermonSchema = new Schema({
    uploadDate: Date,
    title: String,
    desc: String,
    url: String,
    authorName: String,
    embedCode: String, 
}, {
    timestamps: true,
});

module.exports = mongoose.model("Sermon", SermonSchema);