const mongoose = require('mongoose');
const motherSchema = require('./Mother.model').schema;
const fatherSchema = require('./Father.model').schema;
const brotherSchema = require('./Brother.model').schema;
const sisterSchema = require('./Sister.model').schema;
const guadianSchema = require('./Gaurdian').schema;

const familySchema = new mongoose.Schema({
    mother: {
        type: motherSchema,
        // required: true
    },
    father: {
        type: fatherSchema,
        // required: true
    },
    brother: {
        type: brotherSchema,  // brothers array
        // default: [],
        // required: true
    },
    sister: {
        type: sisterSchema,   //
        // default: [], 
        // required: true
    },
    guardian: {
        type: guadianSchema
    }
});

module.exports = mongoose.model('Family', familySchema);
