const Application = require("./models/ApplicationSchema/Application.model")
const mongoose = require('./middleware/db')
const User=  require("./models/UserSchema/User.model")
const Basic = require("./models/UserSchema/BasicDetailsSchema/BasicDetail.model")
const Contact = require("./models/UserSchema/ContactDetailsSchema/ContactDetail.model")
const Education = require("./models/EducationSchema/Education.model")
const PUC = require("./models/EducationSchema/PUC.model")
const SSLC = require("./models/EducationSchema/SSLC.model")

const b = new Basic({name : "Saurav", aadharno : 891256789, dob : new Date("2002-01-04"), ResidenceType : "Own", Rent : 0, gender : "male"})
const c = new Contact({MobileNumber : "89245125", AlternateMobileNumber : "9254875462", address : "5th street, 6nd Colony, Blore - 87", Email : "saurav@mail.co.in", permanent_address :"5th street, 6nd Colony, Blore - 87"})

const s = new SSLC({schoolname : "dps", address : "uttarahalli road", year : 2018, isCompleted : true, percentage : 92})
const p = new PUC({collegename : "rv",  address : "jayanagar", year : 2020, isCompleted : true, percentage : 91})
const e = new Education({CurrentlyStudying : true, PresentlyStudyingIn : "pes", sslc : s, puc : p})

const u = new User({userid : "967584323", basicDetail : b, contactDetail : c, educationDetail : e})
// const a = new Application({userid : "967584323", CreatedOnDate : new Date("2022-11-15"), category : "puc", status : "Submitted", reasonForRejection : ""})
// a.save()
u.save().then(() => console.log("user save success"))

//add family too when ure bored



const personal_insformation = {
    "full_name": "Akash",
    "email_address": "akash@gmail",
    "mobile_number": "7676874524",
    "date_of_birth": "2002-04-06",
    "gender": "male",
    "aadhar_number": 1243456789,
    "country": "India",
    "state": "Karnataka",
    "current_address": "chamrajpet",
    "permanent_address": "chamrajpet"
}