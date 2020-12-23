const User = require("../models/User");

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