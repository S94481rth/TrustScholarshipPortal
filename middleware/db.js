const mongoose = require("mongoose")
require("dotenv").config()

const MONGO_URL = process.env.MONGO_URL

async function connection(){
    try{
        await mongoose.connect(MONGO_URL)
        console.log(`success connecting to the database!`)
    }catch(e){
        console.log(`error connecting to the database : ${e}`)
    }
}

connection()

module.exports = mongoose

