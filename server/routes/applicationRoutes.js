const router = require("express").Router()

const applicationController = require("../controller/newApplicationController")

// router.post('/uploadPersonalDetails', applicationController.personalDetails)
router.post('/uploadPersonalDetails', applicationController.personalDetails)
router.post('/uploadAcademicDetails', applicationController.academicDetails)
router.post('/uploadFamilyDetails', applicationController.familyDetails)
router.post('/uploadBankDetails', applicationController.bankDetails)
router.get('/status/:appnid', applicationController.getStatus)
module.exports = router