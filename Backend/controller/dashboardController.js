const db = require("../database/sequelize");
const { Op, and } = require("sequelize");
const jwt = require("jsonwebtoken");
const User = db.User_table;
const Blog = db.blog_table;


const verifyToken = async (token) => {
    try {
        console.log("in verify token");
        const result = await jwt.verify(token, 'meena$17');
        try {
            if (result.logData) {
                return result.logData;
            }
            else {
                return false
            }
        }
        catch (error) {
            if (error.name === "TokenExpiredError") {
                return "TokenExpiredError"
            }
            else {
                console.log(error);
            }
        }

    }
    catch (error) {
        console.log(error);
    }
}

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
    const token = req.headers.authorization;
    try {
        if (token) {
            const verifiedUser = await verifyToken(token);
            if (verifiedUser) {
                const email = verifiedUser.Email;
                if (email) {
                    console.log(email);
                    const id = await User.findOne({
                        where: { Email: email }
                    })
                    console.log(id.User_ID);
                    const user_id = id.User_ID
                    const { content, title } = req.body;
                    if (content && title) {
                        var blogData = {
                            User_ID: user_id,
                            Title: title,
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
                // else if (verifiedUser === "TokenExpiredError") {
                //     res.json({ message: "Time out!" })
                // }
                else {
                    res.json({ message: "not verified user" })
                }
            }
            else {
                res.json({ message: "no token" })
            }
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal error" })
    }
}

const fetchBlogContent = async (req, res) => {
    const token = req.headers.authorization;
    console.log("TOKEN", token);
    try {
        if (token) {
            console.log("INSIDE");
            const verifiedUser = await verifyToken(token);
            if (verifiedUser) {
                const email = verifiedUser.Email;
                console.log(email);
                if (email) {
                    console.log(email);
                    const id = await User.findOne({
                        where: { Email: email }
                    })
                    console.log(id.User_ID);
                    const user_id = id.User_ID
                    const getData = await Blog.findAll({
                        where: {

                            Is_delete: false,
                            User_ID: user_id

                        }
                    });
                    console.log('befor result');
                    res.status(200).json({
                        message: "Success of get data",
                        blogData: getData,
                    });

                }
                else {
                    res.json({ message: "user id not found" })
                }
            }
            else {
                res.json({ message: "user is not verified" })
            }
        }
        else {
            res.json({ message: "token not found" })
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Error" });
    }
}

const fetchallblog = async(req,res) => {
    const token = req.headers.authorization;
    if(token){
        const verifiedUser = await verifyToken(token);
        if(verifiedUser){
            const getData = await Blog.findAll({
                
                where: {
                    Is_delete: false
                }
            });
            
            res.status(200).json({message: "success of data", blogData: getData})
        }
        else{
            res.status(200).json({message: "Not auth user"})
        }
    }
    else{
        res.status(200).json({message: "Not authorized user"})
    }
}

const fetchdelete = async (req, res) => {
    const token = req.headers.authorization;
    try {
        if (token) {
            const verifiedUser = await verifyToken(token);
            if (verifiedUser) {
                const email = verifiedUser.Email;
                if (email) {
                    console.log(email);
                    const id = await User.findOne({
                        where: { Email: email }
                    })
                    const user_id = id.User_ID
                    const getData = await Blog.findAll({
                        where: {
                            Is_delete: true,
                            User_ID: user_id

                        }
                    });
                    res.status(200).json({
                        message: "Success of get data",
                        blogData: getData,
                    });
                }
                else {
                    res.json({ message: "no verified user" })
                }

            }
            else {
                res.json({ message: "no token" })
            }
        }

    }
    catch (error) {
        res.status(500).json({ message: "Internal Error" });
    }
}

const restore = async (req, res) => {
    try {
        const Blog_ID = req.params.blog_ID;
        if (Blog_ID) {
            console.log("before 000");
            await Blog.update(
                { Is_delete: false },
                { where: { blog_ID: Blog_ID } }
            );
            const getData = await Blog.findAll({
                where: { Is_delete: true }
            });
            res.status(200).json({
                message: "Success of get data",
                blogData: getData,
            });
        }
        else {
            res.status(200).json({ message: "failed" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal error" })
    }
}

const deleteBlog = async (req, res) => {
    const token = req.headers.authorization;
    try {
        if (token) {
            const verifiedUser = await verifyToken(token);
            if (verifiedUser) {
                const Blog_ID = req.params.blog_ID;
                if (Blog_ID) {
                    console.log("before 000");
                    await Blog.update(
                        { Is_delete: true },
                        { where: { blog_ID: Blog_ID } }
                    );
                    const getData = await Blog.findAll({
                        where: { Is_delete: false }
                    });
                    res.status(200).json({
                        message: "Success of get data",
                        blogData: getData,
                    });
                }
                else {
                    res.status(200).json({ message: "failed" });
                }
            }
            else {
                res.json({ message: "no token" })
            }
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal error" })
    }
}

const editBlog = async (req, res) => {
    try {
        const { Blog_ID, title, content } = req.body;
        if (Blog_ID, title, content) {
            await Blog.update(
                {
                    Title: title,
                    Content: content
                },
                { where: { blog_ID: Blog_ID } }
            )
                .then(() => {
                    res.status(200).json({ message: "Success of update" })
                })
                .catch(() => {
                    res.status(200).json({ message: "Failure of update" })
                })
        }
        else {
            res.status(200).json({ message: "Empty data" })
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal error" })
    }
}

const getEditBtn = async (req, res) => {
    const token = req.headers.authorization;
    try {
        if (token) {
            const verifiedUser = await verifyToken(token)
            if (verifiedUser) {
                const Blog_ID = req.params.Blog_ID;

                console.log(Blog_ID);
                if (Blog_ID) {
                    const getData = await Blog.findOne({
                        
                        where: {
                            blog_ID: Blog_ID
                        }
                    })
                    const userData = await User.findOne({
                        where:{User_ID: getData.User_ID}
                    })

                    res.status(200).json({ message: "Success in getting", blogData: getData, userData: userData })



                }
                else {
                    res.status(200).json({ message: "no data" })
                }
            }
            else {
                res.status(200).json({ message: "NO token" })

            }
        }
        else {
            res.status(200).json({ message: "Not verified user" })
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal error" })
    }
}

module.exports = {
    createBlog,
    fetchBlogContent,
    userExists,
    deleteBlog,
    editBlog,
    restore,
    fetchdelete,
    getEditBtn,
    verifyToken,
    fetchallblog,
}