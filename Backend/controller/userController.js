const User_table = require("../model/User_table.js") ;
const {Op} = require('sequelize')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

class userController{
    static async userExists(data){
        try{
            const user = await User_table.findOne({
                where: {Email: data.Email}
            });
            if(user){
                return true;
            }
            else{
                return false;
            }
        }
        catch(error){
            console.log('Error checking with user existence: ',error);
            throw error;
        }
    }

    async registerUser(req, res){
        const {name,username,email,phone,password} = req.body
        try{
            if(name && username && email && phone && password){
                var userData = {
                    Name: name,
                    Username: username,
                    Email: email,
                    Phone: phone,
                    Password: password
                }
                const userAlreadyExist = await userController.userExists;
                if(userAlreadyExist){
                    res.status(200).json({ message: "User Already Registered" })
                }
                else{
                    await bcrypt.hash(userData.Password,10, async(err,hash) => {
                        if(err){
                            res.status(500).json({message: "Server Error" })
                        }
                        else{
                            const hashUser = {
                                Name: name,
                                Username: username,
                                Email: email,
                                Phone: phone,
                                Password: password
                            }
                            const token = await userController.createJwtToken(hashUser)
                            await User_table.create(hashUser).then(() => {
                                res.status(200).json({message: "sign up successfully"})
                            }).catch((error) => {
                                console.log(error)
                            })
                        }
                    })
                }
            }
            else{
                res.status(200).json({message: "empty data"})
            }
        }
        catch(error){
            res.status(500).json({message: "Internal Error"})
        }
    }
}