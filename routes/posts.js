const express = require("express"),
  router = express.Router(),
  sanitizer = require("sanitizer"),
  { Op } = require("sequelize");

const Post = require("../models/Post");

router.get("/new", (req, res) => {
  res.render("posts/new");
});

router.get("/", async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.render("home", { posts });
  } catch (e) {
    console.log(e);
  }
});

router.get("/search", async (req, res) => {
  const { q } = req.query;

  try {
    const foundPosts = await Post.findAll({
      where: { title: { [Op.like]: `%${q}%` } },
    });
    const posts = foundPosts.map((post) => post.dataValues);
    res.render("search", { posts });
  } catch (e) {
    console.log(e);
    res.redirect("back");
  }
});

router.post("/", async (req, res) => {
  req.body.content = sanitizer.sanitize(req.body.content);
  const { title, content } = req.body;
  const { id } = req.user;
  const newPost = { title, content, author_id: id };

  try {
    const post = await Post.create(newPost);
    console.log(post);
    res.redirect(`posts/${post.id}`);
  } catch (e) {
    console.error(e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    res.render("posts/show", { ...post.dataValues });
  } catch (e) {
    console.error(e);
    res.redirect("/posts");
  }
});

router.get("/:id/edit", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    res.render("posts/edit", { ...post.dataValues });
  } catch (e) {
    console.error(e);
    res.redirect("back");
  }
});

router.put("/:id", async (req, res) => {
  const { title, content } = req.body;
  const editedPost = { title, content };

  try {
    await Post.update(editedPost, { where: { id: req.params.id } });
    res.redirect("/posts/" + req.params.id);
  } catch (e) {
    console.error(e);
    res.redirect("back");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Post.destroy({ where: { id: req.params.id } });
    res.redirect("/posts");
  } catch (e) {
    console.error(e);
    res.redirect("back");
  }
});

module.exports = router;
