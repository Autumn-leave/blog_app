var express = require("express");
var router = express.Router();
var dashboardController = require("../controller/dashboardController");

router.post("/createblog",dashboardController.createBlog);
router.get("/fetch",dashboardController.fetchBlogContent);
router.get("/deleteBlog",dashboardController.deleteBlog);
router.post("/editBlog",dashboardController.editBlog);
router.get("/getEditBtn/:blog_ID",dashboardController.getEditBtn);
module.exports =router;
