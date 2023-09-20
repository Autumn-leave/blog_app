const db = require("../database/sequelize");
const User = db.User_table;
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
console.log(User);

const createJwtToken = async (userExist) => {
    const token = jwt.sign({ userExist }, 'meena$17', { expiresIn: '1h' })
    return token
}

const userExists = async (data) => {
    try {
        const user = await User.findOne({
            where: { Email: data.Email }
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

const registerUser = async (req, res) => {
    console.log(req.body);
    try {
        if (req.body.name && req.body.username && req.body.email && req.body.phone && req.body.password) {
            const { name, username, email, phone, password } = req.body

            const emailRegex = /@gmail\.com$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ message: "Invalid email format" });
            }

            // Check if the number contains digits
            const numberRegex = /^\d+$/;
            if (!numberRegex.test(phone)) {
                return res.status(400).json({ message: "Number should contain digits only" });
            }

            // Check if the password meets the criteria
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordRegex.test(password)) {
                return res.status(400).json({
                    message:
                        "Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)",
                });
            }

            var userData = {
                Name: name,
                Username: username,
                Email: email,
                Phone: phone,
                Password: password
            }
            const userAlreadyExist = await userExists(userData)
            if (!userAlreadyExist) {
                const hashed = await bcrypt.hash(password, 10)
                console.log(hashed);
                if (hashed) {
                    const hashUser = {
                        Name: name,
                        Username: username,
                        Email: email,
                        Phone: phone,
                        Password: hashed
                    }
                    // const token = await userController.createJwtToken(hashUser)
                    await User.create(hashUser).then(() => {
                        res.status(200).json({ message: "sign up successfully" })
                    }).catch((error) => {
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
                Email: email,
                Password: password
            }
            console.log(loginData)
            // const hashed = bcrypt.hash(password,10)

            const user = await User.findOne({
                where: { Email: loginData.Email }
            })

            if (user) {
                const validpassword = bcrypt.compare(loginData.Password, user.dataValues.Password).then(() => {
                    res.status(200).json({ message: "Login", data: loginData })
                }).catch(() => {
                    res.status(500).json({ message: "Invalid credentials" })
                })
            }
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
    createJwtToken,
}