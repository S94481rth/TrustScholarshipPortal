// Schema for All Education
const mongoose = require('mongoose');
const SSLC = require('./SSLC.model').schema;
const PUC = require('./PUC.model').schema;
const Graduation = require('./Graduation.model').schema;

const educationSchema = new mongoose.Schema({
    CurrentlyStudying: {
        type: Boolean,      // Yes-->True, No-->False
        // required: true
    },
    PresentlyStudyingIn: {
        type: String,
        // required: true
    },
    sslc: {
        type: SSLC,
        required: true
    },
    puc: {
        type: PUC,
    },
    graduation: {
        type: Graduation,
    }
});

module.exports = mongoose.model('Education', educationSchema);