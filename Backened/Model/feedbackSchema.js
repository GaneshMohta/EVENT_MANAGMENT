const mongoose = require('mongoose');


const feedbackSchema= mongoose.Schema({
    userId: { type: String, ref: 'User', required: true },
    _id: { type: String, ref: 'Event', required: true },
    sp_feedback : {type: Number},
    event_feedback : {type:Number}
})
