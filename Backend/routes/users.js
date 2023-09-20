var express = require('express');
var router = express.Router();
var userController = require("../controller/userController")

router.post("/register",userController.registerUser)
router.post("/loginUser",userController.loginUser)
module.exports = router;
