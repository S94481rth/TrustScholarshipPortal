const mongoose = require('mongoose');

// create a schema 
const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});


// export the schema
module.exports = mongoose.model('Admin', AdminSchema);