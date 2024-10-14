const mongoose = require('mongoose');


const registrationSchema = new mongoose.Schema({

    userId: { type: String, ref: 'User', required: true },
    eventId: { type: String, ref: 'Event', required: true },
    registeredAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Registration', registrationSchema);
