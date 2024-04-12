const mongoose = require('mongoose');

const motherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    officeaddress: {
        type: String,
        // required: true
    },
    age : {
        type : Number
    },
    qualification:{
        type :String
    },
    annual_income :{
        type :Number
    },
    working_at : {
        type :String
    }
});

module.exports = mongoose.model('Mother', motherSchema);