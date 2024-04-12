const mongoose = require('mongoose');
const BasicDetail = require('./BasicDetailsSchema/BasicDetail.model').schema;
const EducationDetail = require('../EducationSchema/Education.model').schema;
const FamilyDetail = require('../FamilySchema/Family.model').schema;
const ContactDetail = require('./ContactDetailsSchema/ContactDetail.model').schema;
const BankDetail = require('../BankSchema/BankDetails.model').schema;

// just removed requried true from eveywhere
const userSchema = new mongoose.Schema({
    userid : {
        type: String,
        required: true
    },
    basicDetail : {
        type: BasicDetail,
    },
    educationDetail : {
        type: EducationDetail,
    },
    familyDetail : {
        type: FamilyDetail,
    },
    contactDetail : {
        type: ContactDetail,
    },
    bankDetail : {
        type: BankDetail
    }
});

module.exports = mongoose.model('User', userSchema);