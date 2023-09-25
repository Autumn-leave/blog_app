const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/sequelize");

module.exports = (sequelize,DataTypes) => {
    const blog = sequelize.define("blog",{
        blog_ID:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        User_ID: {
            type: DataTypes.INTEGER,
        },
        Title: {
            type: DataTypes.STRING,
        },
        Content: {
            type: DataTypes.TEXT,
        },
        Is_delete:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
    return blog;
}