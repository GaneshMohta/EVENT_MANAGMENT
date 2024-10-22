const mongoose = require('mongoose');


const registrationSchema = new mongoose.Schema({

    userId: { type: String, ref: 'User', required: true },
    Eventid: { type: String, ref: 'Event', required: true },
    registeredAt: { type: Date, default: Date.now },
    location : {type: String},
    age : {type: Number},
    gender: {
        type: String,
        enum: ["Male", "Female", "Others"],
        required: true 
      },
});
module.exports = mongoose.model('Registration', registrationSchema);
