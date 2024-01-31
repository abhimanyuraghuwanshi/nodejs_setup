const express = require("express");
const cron = require("node-cron");
const router = express.Router();
const { overallLimit, criticalLimit } = require("../utils/ratelimit");
const adminController = require("../controller/webapplication/adminController");
const authValidator = require("../middleware/authvalidator");

cron.schedule("* * * * *", async function () {

});

router.use(overallLimit);

router.post("/adminlogin", adminController.adminLogin);

const { ensureWebTokenForAdmin } = require("../utils/auth/jwtAdmin");
router.use(ensureWebTokenForAdmin);

router.get("/getallusers", adminController.getAllUsers);
router.get("/getloginactivities", adminController.getLoginActivities);

module.exports = router;
