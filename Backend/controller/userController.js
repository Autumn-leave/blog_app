const db = require("../database/sequelize");
const User = db.User_table;
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
// console.log(User);



const userExists = async (data) => {
    try {
        const user = await User.findAll({
            where: {
                [Op.or]: [
                    { Email: data.Email },
                    { Phone: data.Phone }
                ]
            }
        });
        if (user.length > 0) {
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

const registerUser = async (req, res) => {
    console.log(req.body);
    try {
        if (req.body.name && req.body.username && req.body.email && req.body.phone && req.body.password) {
            const { name, username, email, phone, password } = req.body
            const remail = email.toLowerCase();
            console.log("in try: ",req.body)
            const emailRegex = /@gmail\.com$/;
            if (!emailRegex.test(remail)) {
                return res.status(200).json({ message: "Invalid email format" });
            }

            // Check if the number contains digits
            const numberRegex = /^\d{10}$/;
            if (!numberRegex.test(phone)) {
                return res.status(200).json({ message: "Number should contain 10 digits only" });
            }

            // Check if the password meets the criteria
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordRegex.test(password)) {
                return res.status(200).json({
                    message:
                        "Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)",
                });
            }

            var userData = {
                Name: name,
                Username: username,
                Email: remail,
                Phone: phone,
                Password: password
            }
            const userAlreadyExist = await userExists(userData)
            if (!userAlreadyExist) {
                const hashed = await bcrypt.hash(password, 10)
                if (hashed) {
                    const hashUser = {
                        Name: name,
                        Username: username,
                        Email: remail,
                        Phone: phone,
                        Password: hashed,
                    }
                    // const token = await userController.createJwtToken(hashUser)
                    await User.create(hashUser).then(() => {
                        // const token = jwt.sign( hashUser , 'meena$17', { expiresIn: '1h' })
                        res.status(200).json({ message: "sign up successfully" })
                    }).catch((error) => {
                        console.log(error)
                        res.status(200).json({ message: "sign up failed" })
                    })

                }
            }
            else {
                res.status(200).json({ message: "user already exists" })
            }
        }
        else {
            res.status(200).json({ message: "empty data" })
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal Error" })
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        if (email && password) {
            const loginData = {
                Email: email.toLowerCase(),
                Password: password
            }
            console.log(loginData)

            const user = await User.findOne({
                where: { Email: loginData.Email }
            })

            if (user) {
                bcrypt.compare(loginData.Password, user.dataValues.Password, async (err, result) => {
                   
                    if(err){
                        
                        res.status(501).json({message: "Error"})
                    }
                    else if (result) {
                        var logData = {
                            Email: email.toLowerCase(),
                            Password: user.dataValues.Password
                        }
                       
                        const token = jwt.sign( {logData} , 'meena$17', { expiresIn: '1h' })
                        res.status(200).json({ message: "Login", data: loginData, token })
                    }
                    else {
                        
                        res.status(200).json({ message: "Invalid credentials" })
                        
                    }
                })


            }
            else {
                res.status(200).json({ message: "user not found!" })
            }
        }
        else {
            res.status(200).json({ message: "Empty data" })
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal Error" })
    }
}

module.exports = {
    registerUser,
    loginUser,
    userExists,
}