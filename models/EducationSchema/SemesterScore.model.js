// Schema for Semester Score

const mongoose = require('mongoose');

const semesterScoreSchema = new mongoose.Schema({
    semester: {
        type: Number,
        required: true
    },
    score: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('SemesterScore', semesterScoreSchema);