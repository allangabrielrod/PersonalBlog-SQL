const User = require("../models/User");
const Post = require("../models/Post");

module.exports.registerPermissions = async (req, res, next) => {
  try {
    const foundAdmin = await User.findAll({ where: { isAdmin: true } });
    if (!foundAdmin.length > 0 || (req.user && req.user.isAdmin)) next();
    else res.redirect("/login");
  } catch (e) {
    console.error(e);
    res.redirect("back");
  }
};

module.exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();

  return res.redirect("back");
};

module.exports.isOwnerOrAdmin = async (req, res, next) => {
  if (!req.user) return res.redirect("back");

  if (req.user.isAdmin) return next();

  try {
    const post = await Post.findByPk(req.params.id);
    if (req.user.id === post.dataValues.author_id) return next();
    return res.redirect("back");
  } catch (e) {
    console.error(e);
    return res.redirect("back");
  }
};
