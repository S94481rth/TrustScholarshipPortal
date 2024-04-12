const mongoose = require('mongoose');

const basicDetail = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    aadharno: {
        type: Number,
        unique: true,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    //removed true for residence type since fe team is not sending it!
    ResidenceType: {
        type: String,
        //required: true
    },
    //removed true for residence type since fe team is not sending it!

    Rent: {
        default: 0,
        type: Number,
        //required: true
    },
    //added gender attribute!
    gender : {
        type : String,
        required : true
    }
});


module.exports = mongoose.model('BasicDetail', basicDetail);