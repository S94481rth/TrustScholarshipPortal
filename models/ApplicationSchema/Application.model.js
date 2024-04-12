const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    CreatedOnDate: {
        type: Date,
        required: true
    },
    category: {
        type: String,
        // required: true
    },
    status: {
        type: String,
        default: 'Submitted',
        required: true
    },
    reasonForRejection: {
        type: String
    }
});

module.exports = mongoose.model('Application', applicationSchema);