const express = require('express');
const router = express.Router();
const {overallLimit,criticalLimit}= require('../utils/ratelimit')
const accessController = require('../controller/webapplication/accessController')
const authController = require('../controller/mobileapp/authController')
const statisticsController = require('../controller/mobileapp/statisticsController')
const authValidator = require('../middleware/authvalidator')

const {uploadContactUs} = require('../config/multerConfig')
let ContactUsfile = uploadContactUs.fields([{ name: 'image' }, { name: 'video' }])

router.use(overallLimit)
/*for all api single login is supported so send 'version=website' in headers for web api */
router.get('/stopapplicationflag',statisticsController.stopApplicationFlag);
router.post('/userregistration',authValidator.validateRegistration,accessController.userRegistration);
router.post('/apploginwithemail',authValidator.validateEmailLoginRequest,authController.appLoginWithEmail);
router.post('/weblogin',authValidator.validateUserRequest,accessController.weblogin);
router.post('/apploginwithmetamask',authValidator.validateLoginRequest,authController.applogin);
router.post('/contactus',ContactUsfile,authValidator.validateContactUs, accessController.contactUS);


const { ensureWebToken } = require('../utils/auth/jwtUser');
router.use(ensureWebToken)

router.get('/getuserprofile',accessController.userProfile);
router.post('/changepassword',criticalLimit,authValidator.validateChangePassword,authController.changePassword);


module.exports = router;