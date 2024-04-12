const router = require("express").Router()
const { checkAdminExists, hashPassword } = require('../../middleware/signupMiddleware')
const {checkAdminExistsLogin, checkLoginCredentials, checkSession} = require("../../middleware/loginMiddleware")
const adminController = require("../controller/adminController")
router.post('/signup',checkAdminExists, hashPassword, adminController.signup)
router.post('/login',checkAdminExistsLogin, checkLoginCredentials, adminController.login)
router.post('/logout', checkSession, adminController.logout)
router.post('/validateSession', checkSession, (req,res) => {
    res.status(200).json({msg : "valid user"})
})


router.post('/any', checkSession, (req,res) => {
    res.end("private posession")
})
module.exports = router