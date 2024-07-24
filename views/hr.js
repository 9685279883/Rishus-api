const express = require("express");

const router = express.Router();
const hrController = require("../controllers/hrController")

router.post("/signup", hrController.hrSignup);

router.post("/login",hrController.hrLogin);



module.exports = router ;


