// models/Event.js
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const postSchema = new mongoose.Schema({
    _id: { type: String, default: uuidv4 },
    Adminid : {type: String},
    eventType: { type: String, required: true },
    eventName: { type: String, required: true },
    speakerName: { type: String, required: true },
    price: { type: Number, required: true },
    eventDescription: { type: String, required: true },
    registrationSeats: { type: Number, required: true },
    eventImage: { type: String },
    Date: { type: Date, required: true },
});

module.exports = mongoose.model('Event', postSchema);
