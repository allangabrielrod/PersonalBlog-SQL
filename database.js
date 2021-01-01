const Sequelize = require("sequelize");
const { DBNAME, DBUSER, DBPASSWORD, DBHOST, DBDIALECT } = process.env;

const sequelize = new Sequelize(DBNAME, DBUSER, DBPASSWORD, {
  host: DBHOST,
  dialect: DBDIALECT,
});

sequelize.sync();

module.exports = sequelize;
