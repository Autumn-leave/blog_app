const db = require("../database/sequelize");
const { Op, and } = require("sequelize");
const User = db.User_table;
const Blog = db.blog_table;


const userExists = async (data) => {
    try {
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { User_ID: data.User_ID }
                ]
            }
        });
        if (user) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.log('Error checking with user existence: ', error);
        throw error;
    }
}

const createBlog = async (req, res) => {
    console.log(req.body);
    try {
        // const { user_id, title, content } = req.body;
        // if (user_id && title && content)
        const { content } = req.body;
        if (content) {
            var blogData = {
                User_ID: "1",
                Title: "captain",
                Content: content
            }
            console.log("after blogData");
            const data = { User_ID: blogData.User_ID };
            const userExistsin = await userExists(data);
            console.log(userExistsin);
            if (userExistsin) {
                console.log("before create blog data in db");
                await Blog.create(blogData).then(() => {
                    res.status(200).json({ message: "Successfully stored" })
                }).catch((error) => {
                    res.status(200).json({ message: "failed to stored" })
                })
            }
        }
        else {
            res.status(200).json({ message: "Empty data" })
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal error" })
    }
}

const fetchBlogContent = async (req, res) => {
    try {
        const getData = await Blog.findAll();
        res.status(200).json({
            message: "Success of get data",
            blogData: getData,
        });

    }
    catch (error) {
        res.status(500).json({ message: "Internal Error" });
    }
}

const editBlog = async (req, res) => {
    try {
        const {Blog_ID } = req.body;
        // console.log(req.params.Blog_ID,"BASBDK")
        console.log("before");
        if (Blog_ID){
            console.log("before 000");
            await Blog.update(
                {Is_delete: true},
                {where: {blog_ID:Blog_ID}}
                );
                console.log("after");
            res.status(200).json({message: "success"});
        }
        else{
            res.status(200).json({message: "failed"});
        }
    }
    catch(error){
        res.status(500).json({message: "Internal error"})
    }
}

module.exports = {
    createBlog,
    fetchBlogContent,
    userExists,
    editBlog,
}