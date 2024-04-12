const Admin = require("../models/AdminSchema/Admin.model")
const Session = require("../models/SessionsSchema/Session.Model")
const bcrypt = require("bcrypt")

const checkAdminExistsLogin = async (req,res,next) => {
    const {email} = req.body
    console.log(email)
    const admin = await Admin.findOne({email : email})
    if(admin) {
        console.log(admin)
        req.hashedPassword = admin.password
        next()
    }else{
        res.status(400).end("Please Enter Correct Admin Email")
    }
}

const checkLoginCredentials = async (req,res,next) => {
    const {password} = req.body
    bcrypt.compare(password, req.hashedPassword, (err, result) => {
        if(err){
            res.status(500).end(`hash comparison error : ${e}`)
            return
        }
        if(result === true){
            next()
        }else{
            res.status(401).end(`Please Enter the Correct Password`)
        }
    })
}


const checkSession = async (req, res,next) => {
    const {email} = req.body
    let session
    const session_id = req.headers.authorization
    try{
        session = await Session.findOne({email : email})
        if(!session){
            res.status(400).end("Session doesnt exist! Please re-login")
            return
        }
    }catch(e){
        res.status(500).end(`server error : ${e}`)
        return
    }

    if(session.sessionId !== session_id){
        res.status(400).end(`Wrong session ID, please relogin`)
        return
    }
    next()

}
module.exports = {checkAdminExistsLogin, checkLoginCredentials, checkSession};
