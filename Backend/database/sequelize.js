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
db.blog_table = require("../model/Blog_table")(sequelize, Sequelize.DataTypes);
db.Like_table = require("../model/Like_table")(sequelize, Sequelize.DataTypes)
db.User_table.hasMany(db.blog_table, {
  foreignKey: 'User_ID',
})
db.blog_table.belongsTo(db.User_table,{
  foreignKey: 'User_ID'
})
db.sequelize.sync({ force: false }, () => {
  console.log("Sync done");
});

module.exports = db;