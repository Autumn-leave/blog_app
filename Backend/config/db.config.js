const dotenv = require("dotenv")
dotenv.config()

module.exports = {
    HOST: process.env.HOST,
    USER: 'postgres',
    PASSWORD: process.env.PASSWORD,
    DB: process.env.DB,
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
