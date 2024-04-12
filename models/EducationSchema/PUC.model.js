// Schema for PUC / 12th standard or equivalent education details

const mongoose = require('mongoose');

const pucSchema = new mongoose.Schema({
    collegename: {
        type: String,
        // required: true
    },
    address: {
        type: String,
        // required: true
    },
    year: {
        type: Number,
        // required: true
    },
    isCompleted: {
        type: Boolean,
        default: true,
        // required: true
    },
    percentage: {
        type: Number,
        // required: true
    }
});

module.exports = mongoose.model('PUC', pucSchema);