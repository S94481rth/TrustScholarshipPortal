const bcrypt = require('bcrypt');
const saltRounds = 10;
const Admin = require("../../models/AdminSchema/Admin.model")
const Session = require("../../models/SessionsSchema/Session.Model")
const { v4: uuidv4 } = require('uuid');

exports.signup = async (req,res) => {
    const {name, email} = req.body

    const admin = new Admin({name: name, email : email, password : req.hashedPassword})

    try{
        await admin.save()
    }catch(e){
        res.status(500).end(`error saving user to db : ${e}`)
        return
    }
    res.status(200).end(`account created!`)

}

exports.login = async (req,res) => {
    const {email} = req.body
    const sessionid = uuidv4()
    const session = new Session({email : email, sessionId : sessionid})
    // console.log(session)
    try{
        await session.save()
    }catch(e){
        res.status(401).end("you have logged in already else where, please logout there and come back or come back after 1 hour for your current session to expire")
        return
    }
    res.status(200).json({session_id : sessionid, msg : "This is your session id, send it as the header witht the same key in every request"})
}

exports.logout = async (req,res) => {
    const {email} = req.body

    try{
        const admin = await Session.findOne({email : email})
        if(admin === null){
            res.status(400).end("session never started!")
        }
    }catch(e){
        res.status(500).end(e)
    }
    try{
        await Session.deleteOne({email : email})
        res.status(200).end("Logged out successfully!")
    }catch(e){
        res.status(500).end(`Session doesnt exist`)
    }

}