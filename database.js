const Sequelize = require("sequelize");
const { DBNAME, DBUSER, DBPASSWORD, DBSTORAGE, DBDIALECT } = process.env;

const sequelize = new Sequelize(DBNAME, DBUSER, DBPASSWORD, {
  storage: DBSTORAGE,
  dialect: DBDIALECT,
});

sequelize.sync();

module.exports = sequelize;
