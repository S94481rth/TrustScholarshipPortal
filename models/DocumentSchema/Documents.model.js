const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    sslc: {
        type: String,
        contentType: String
    },
    puc: {
        type: String,
        contentType: String
    },
    graduation: {
        type: String,
        contentType: String
    },
    aadhar: {
        type: String,
        contentType: String
    },
    Father_bank_statement: {
        type: String,
        contentType: String
    },
    Mother_bank_statement: {
        type: String,
        contentType: String
    },
    Brother_bank_statement: {
        type: String,
        contentType: String
    },
    Sister_bank_statement: {
        type: String,
        contentType: String
    },
    bank_account: {
        type: String,
        contentType: String
    },
});

module.exports = mongoose.model('Document', documentSchema);