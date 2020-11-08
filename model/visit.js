const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * @property name: the name of the person to visit
 * @property email: the email of the person
 * @property phone: the phone number of the person
 * @property event: the event to be visited
 */
const VisitSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    event: { type: Schema.Types.ObjectId, ref: "Event" },
    date: Date,
    msg: String,
    cancelled: { type: Boolean, default: false },
    updated: { type: Boolean, default: false },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Visit", VisitSchema);