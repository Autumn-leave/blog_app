var express = require("express");
var router = express.Router();
var dashboardController = require("../controller/dashboardController");

router.post("/createblog",dashboardController.createBlog);
router.get("/fetch",dashboardController.fetchBlogContent);
router.get("/restore/:blog_ID",dashboardController.restore);
router.get("/fetchdelete",dashboardController.fetchdelete);
router.get("/deleteBlog/:blog_ID",dashboardController.deleteBlog);
router.post("/editBlog",dashboardController.editBlog);
router.get("/getEditBtn/:Blog_ID",dashboardController.getEditBtn);
router.get("/fetchallblog",dashboardController.fetchallblog);

module.exports =router;
