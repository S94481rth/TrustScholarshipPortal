const mongoose = require('mongoose');

const contactDetailSchema = new mongoose.Schema({
    MobileNumber: {
        type: String,
        required: true
    },
    AlternateMobileNumber: {
        type: String,
        required: true
    },  
    Email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    permanent_address : {
        type : String,
        require : true
    }
});

module.exports = mongoose.model('ContactDetail', contactDetailSchema);