const  Model = require("sequelize");
const  DataTypes = require("sequelize");

const sequelize = require("../database/sequelize");

class User_table extends Model{

}
User_table.init({
    User_ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    Name: {
        type: DataTypes.STRING,
    },
    Username: {
        type: DataTypes.STRING,
    },
    Email: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    Phone: {
        type: DataTypes.NUMBER,
        primaryKey: true
    },
    Password: {
        type: DataTypes.STRING
    },
    is_activated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
},{
    sequelize,
})

export User_table;