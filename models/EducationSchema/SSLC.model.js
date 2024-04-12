// Schema for SSLC / 10th or equivalent education details

const mongoose = require('mongoose');   

const sslcSchema = new mongoose.Schema({
    schoolname: {
        type: String,
        required: true
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
    },
    //added standard
    standard : {
        type : Number
    }
});

module.exports = mongoose.model('SSLC', sslcSchema);