var express = require('express');
var router = express.Router();
var userController = require("../controller/userController")

router.post('/register',userController.registerUser)

module.exports = router;
