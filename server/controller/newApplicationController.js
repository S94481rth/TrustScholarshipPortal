

const Basic = require("../../models/UserSchema/BasicDetailsSchema/BasicDetail.model")
const Contact = require("../../models/UserSchema/ContactDetailsSchema/ContactDetail.model")
const applicationDAO = require("../dao/applicationDataAccess")

const Education = require("../../models/EducationSchema/Education.model")

const School = require("../../models/EducationSchema/SSLC.model")
const PUC = require("../../models/EducationSchema/PUC.model")
const University = require("../../models/EducationSchema/Graduation.model")

const Family = require("../../models/FamilySchema/Family.model")
const Father = require("../../models/FamilySchema/Father.model")
const Mother = require("../../models/FamilySchema/Mother.model")
const Brother = require("../../models/FamilySchema/Brother.model")
const Sister = require("../../models/FamilySchema/Sister.model")
const Guardian = require("../../models/FamilySchema/Gaurdian")

const BankDetails = require("../../models/BankSchema/BankDetails.model")

const Application = require("../../models/ApplicationSchema/Application.model")

exports.personalDetails =async (req,res) => {

    const full_name = req.body.full_name
    const email_address = req.body.email_address
    const mobile_number = req.body.mobile_number
    const date_of_birth = req.body.date_of_birth
    const gender = req.body.gender
    const aadhar_number =  req.body.aadhar_number
    const country =  req.body.country
    const state = req.body.state
    const current_address = req.body.current_address
    const permanent_address = req.body.permanent_address

    const basic = new Basic({name : full_name, aadharno : aadhar_number, dob : new Date(date_of_birth), gender : gender})
    const contact = new Contact({MobileNumber : mobile_number, AlternateMobileNumber : mobile_number, address : current_address, permanent_address :permanent_address, Email : email_address})
    try{
        console.log(`before insertion`)
        const userid = await applicationDAO.insertPersonaldDetails(basic, contact)
        console.log(`user id in the controlelr : ${userid}`)
        res.status(200).json({msg : "Success inserted Personal details, please send the user_id in req.body for the remaining pages of the application", user_id : userid})
    }catch(e){
        res.status(500).json({msg : `failed to insert personal details : \n${e}`})
    }

}




exports.academicDetails = async (req,res) => {

    const user_id = req.body.user_id
    const school_name = req.body.school_name
    const standard = req.body.currently_studying
    const puc_name = req.body.pu_college_name
    const sslc_marks = req.body.sslc_marks
    const college_name = req.body.college_name
    const puc_marks =  req.body.puc_marks
    const entrance_score = req.body.entrance_score

    let puc_obj, school_obj, college_obj
    school_obj = new School({schoolname : school_name || "na", standard : standard || 10 , percentage : sslc_marks || 0})
    puc_obj = new PUC({collegename : puc_name || "na", percentage : puc_marks || 0})
    college_obj = new University({collegename : college_name || "na", entrance_score : entrance_score || 0})
    const e = new Education({sslc : school_obj, puc : puc_obj, graduation : college_obj})

    try{
        const response = await applicationDAO.insertEducationDetails(e, user_id)
        res.status(200).json({msg : "Success inserted Education details"})

    }catch(e){
        res.status(500).json({msg : `failed to insert education details : \n${e}`})
    }
}

exports.familyDetails = async (req,res) => {
    const user_id = req.body.user_id

    const father_name = req.body.father_name
    const father_age = req.body.father_age
    const father_qualification = req.body.father_qualification
    const father_annual_income = req.body.father_annual_income
    const father_designation = req.body.father_designation
    const father_organization = req.body.father_name_of_organization

    const father_obj = new Father({name : father_name || "na", occupation : father_designation || "na", age: father_age || 0, qualification : father_qualification || "na", annual_income : father_annual_income || 0, working_at: father_organization || ""})


    const mother_name = req.body.mother_name;
    const mother_age = req.body.mother_age;
    const mother_qualification = req.body.mother_qualification;
    const mother_annual_income = req.body.mother_annual_income;
    const mother_designation = req.body.mother_designation;
    const mother_organization = req.body.mother_name_of_organization;

    const mother_obj = new Mother({
        name: mother_name || "na",
        occupation: mother_designation || "na",
        age: mother_age || 0,
        qualification: mother_qualification || "na",
        annual_income: mother_annual_income || 0,
        working_at: mother_organization || ""
    });

    const brother_name = req.body.brother_name;
    const brother_age = req.body.brother_age;
    const brother_qualification = req.body.brother_qualification;
    const brother_annual_income = req.body.brother_annual_income;
    const brother_designation = req.body.brother_designation;
    const brother_organization = req.body.brother_name_of_organization;

    const brother_obj = new Brother({
        name: brother_name || "na",
        occupation: brother_designation || "na",
        age: brother_age || 0,
        qualification: brother_qualification || "na",
        annual_income: brother_annual_income || 0,
        working_at: brother_organization || ""
    });

    const sister_name = req.body.sister_name;
    const sister_age = req.body.sister_age;
    const sister_qualification = req.body.sister_qualification;
    const sister_annual_income = req.body.sister_annual_income;
    const sister_designation = req.body.sister_designation;
    const sister_organization = req.body.sister_name_of_organization;

    const sister_obj = new Sister({
        name: sister_name || "na",
        occupation: sister_designation || "na",
        age: sister_age || 0,
        qualification: sister_qualification || "na",
        annual_income: sister_annual_income || 0,
        working_at: sister_organization || ""
    });

    const guardian_name = req.body.guardian_name;
    const guardian_age = req.body.guardian_age;
    const guardian_qualification = req.body.guardian_qualification;
    const guardian_annual_income = req.body.guardian_annual_income;
    const guardian_designation = req.body.guardian_designation;
    const guardian_organization = req.body.guardian_name_of_organization;

    const guardian_obj = new Guardian({
        name: guardian_name || "na",
        occupation: guardian_designation || "na",
        age: guardian_age || 0,
        qualification: guardian_qualification || "na",
        annual_income: guardian_annual_income || 0,
        working_at: guardian_organization || ""
    });

    const family_obj = new Family({father: father_obj, mother: mother_obj, brother : brother_obj, sister: sister_obj, guardian: guardian_obj})

    try{
        const response = await applicationDAO.insertFamilyDetails(family_obj, user_id)
        res.status(200).json({msg : "Success inserted Family details"})
    }catch(e){
        res.status(500).json({msg : `failed to insert Family details : \n${e}`})
    }
}


exports.bankDetails = async (req,res) => {
    const user_id = req.body.user_id

    const account_holder = req.body.account_holder
    const account_number = req.body.account_number
    const ifsc = req.body.ifsc
    const bank_name = req.body.bank_name
    const branch_name = req.body.branch_name

    const bank_obj = new BankDetails({account_holder_name : account_holder || "na", account_number: account_number || "na", ifsc_code: ifsc || "na", bank_name: bank_name || "na", branch_name : branch_name || "na"})
    const application_obj = new Application({userid: user_id, CreatedOnDate: Date.now()}) 

    try{
        const response = await applicationDAO.insertBankDetails(bank_obj, application_obj, user_id)
        res.status(200).json({msg : "Success inserted Bank details"})
    }catch(e){
        res.status(500).json({msg : `failed to insert Bank details : \n${e}`})
    }
}

exports.getStatus = (req, res) => {
    Application.findOne({ userid: req.params.appnid })
        .then(data => {
            const response = { status: data.status };
            if (data.status === 'Reject' && data.reasonForRejection) {
                response.reasonForRejection = data.reasonForRejection; // Include the reason for rejection
            }
            res.status(200).json(response);
        })
        .catch(err => {
            console.log("this is the err : ", err)
            console.log(typeof(err))
            
            res.status(404).json({
                message: "Error in getting status",
                error: err
            });
            
        });
}