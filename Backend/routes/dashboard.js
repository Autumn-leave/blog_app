var express = require("express");
var router = express.Router();
var dashboardController = require("../controller/dashboardController");

router.post("/createblog",dashboardController.createBlog);
router.get("/fetch",dashboardController.fetchBlogContent);
router.get("/editBlog",dashboardController.editBlog);
module.exports =router;
