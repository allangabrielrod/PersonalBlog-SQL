const { DataTypes } = require("sequelize");
const database = require("../database");

const Post = database.define("Post", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: { type: DataTypes.STRING },
  author_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "Users",
      key: "id",
    },
  },
});

module.exports = Post;
