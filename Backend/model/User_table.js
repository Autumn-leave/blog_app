module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define("users", {
        User_ID: {
            type: DataTypes.STRING,
            // autoIncrement: true
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
            type: DataTypes.STRING,
            unique: true
        },
        Password: {
            type: DataTypes.STRING
        },
        is_activated: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    });
  
    return users;
  };
  