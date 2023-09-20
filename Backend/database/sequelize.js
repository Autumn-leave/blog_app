const dbConfig = require("../config/db.config");
const Sequelize = require('sequelize')
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};
db.sequelize = sequelize;
db.User_table = require("../model/User_table")(sequelize, Sequelize.DataTypes);

db.sequelize.sync({ force: false }, () => {
  console.log("Sync done");
});

module.exports = db;