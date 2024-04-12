// const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const User = require('../../models/UserSchema/User.model');
const Application = require('../../models/ApplicationSchema/Application.model');
const {checkSession} = require("../../middleware/loginMiddleware")

// All the routes for admin will be defined here

// Route to get all the applications with corresponding user details
router.post('/applications', checkSession, async (req, res) => {
    try {
        const applications = await Application.find({}); // Find all applications
        const usersAndApplicationsPromises = applications.map(async (application) => {
            const user = await User.findOne({ userid: application.userid }); // Find corresponding user for each application
            return { user, application }; // Return combined user and application object
        });

        // Wait for all promises to resolve
        const allUsersAndApplications = await Promise.all(usersAndApplicationsPromises);

        // Once all promises are resolved, send the combined data as a response
        res.json(allUsersAndApplications);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error retrieving applications and user details", error: err });
    }
});

router.post('/applications/:status', checkSession, async (req,res) => {
    const status = req.params.status
    try {
        const applications = await Application.find({status : status}); // Find all applications
        const usersAndApplicationsPromises = applications.map(async (application) => {
            const user = await User.findOne({ userid: application.userid }); // Find corresponding user for each application
            return { user, application }; // Return combined user and application object
        });

        // Wait for all promises to resolve
        const allUsersAndApplications = await Promise.all(usersAndApplicationsPromises);

        // Once all promises are resolved, send the combined data as a response
        res.json(allUsersAndApplications);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error retrieving applications and user details", error: err });
    }
})

router.post('/applicationByID/:appid', checkSession, async (req,res) => {
    const appid = req.params.appid
    try {
        const application = await Application.findById(appid); // Find all applications
        const userid = application.userid
        const user = await User.find({userid : userid})
        const userAndApplication = {
            application : application,
            user : user
        }
        res.json(userAndApplication);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error retrieving applications and user details", error: err });
    }
})
// Route to update the status of the application by application id
router.put("/updatestatus", checkSession, (req,res)=>{
    Application
    .findByIdAndUpdate(
        req.body.appid ,{$set:{status:req.body.status, reasonForRejection : req.body.reasonForRejection}},{new:true}
    ).then(data=>{
        res.status(200).json({
            message:"Status Updated Successfully"
        });
    }).catch(err=>{
        res.status(500).json({
            message:"Error in updating status",
            error:err
        });
    });
})

// export the router 
module.exports = router;