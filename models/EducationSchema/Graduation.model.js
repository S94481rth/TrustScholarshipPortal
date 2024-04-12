// schema for graduation details

const mongoose = require('mongoose');
const SemesterScoreSchema = require('./SemesterScore.model').schema; // Notice the `.schema`

const graduationSchema = new mongoose.Schema({
    collegename: {
        type: String,
        required: true
    },
    address: {
        type: String,
        // required: true
    },
    currentYear: {
        type: Number,
        // required: true
    },
    completedSemesters: {
        type: Number,
        // required: true
    },
    currentSemester: {
        type: Number,
        // required: true
    },
    score: {
        type: [SemesterScoreSchema], // Use the schema, not the model
        // required: true
    },
    cgpa : {
        type : Number
    },
    entrance_score : {
        type : Number
    }

});

module.exports = mongoose.model('Graduation', graduationSchema);