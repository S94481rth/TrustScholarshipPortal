const User = require("../../models/UserSchema/User.model")
const generateUserid = require("../utilities/useridGenerate").generateUserid

exports.insertPersonaldDetails = (basic, contact) => {
    const aadhar_number = basic.aadharno
    const dob = basic.dob
    const userid = generateUserid(aadhar_number, dob)
    return new Promise(async (resolve, reject) => {
        try{

            const user_exists = User.findOne({userid : userid})
            if(user_exists){
                try{
                    await User.findOneAndUpdate(
                        {userid : userid},
                        {
                            basicDetail: basic,
                            contactDetail : contact
                        },
                        {new : true}
                    )
                    resolve(userid)
                }catch(e){
                    reject(`error updating existing personal details : \n ${e}`)
                    return
                }
            }
            const user = new User({userid : userid, basicDetail : basic, contactDetail : contact})
            await basic.save()
            await contact.save()
            await user.save()
            resolve(userid)
        }catch(e){
            reject(`error inseting personal details : \n ${e}`)
            return
        }
    })
}

exports.insertEducationDetails = (education, user_id) => {
    return new Promise(async (resolve, reject) => {
        try{
            const newUser = await User.findOneAndUpdate(
                {userid : user_id},
                {educationDetail : education},
                {new : true}
            )
            console.log(newUser)
            await education.save()
            resolve()
        }catch(e){
            reject(e)
            return
        }
    })
}

exports.insertFamilyDetails = (family, user_id) => {
    return new Promise(async(resolve, reject) => {
        try{
            await User.findOneAndUpdate(
                {userid : user_id},
                {familyDetail : family},
                {new : true}
            )
            await family.save()
            resolve()
        }catch(e){
            reject(e)
            return
        }
    })
}

exports.insertBankDetails = (bank, application, user_id) => {
    return new Promise(async(resolve, reject) => {
        try{
            await User.findOneAndUpdate(
                {userid : user_id},
                {bankDetail : bank},
                {new : true}
            )
            await bank.save()
            await application.save()
            resolve()
        }catch(e){
            reject(e)
            return
        }
    })
}