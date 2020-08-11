const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
//post model
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const validatePostInput = require("../../validation/post");
//validation

// @route    Get api/posts/test
// @desc     Tests post route
// @access   Public

router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));

// @route    Get api/posts
// @desc     Get all posts
// @access   Public

router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(404).json({ error: "No Posts Found" }));
});

// @route    Get api/posts
// @desc     Get single post
// @access   Public

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((posts) => res.json(posts))
    .catch((err) => res.status(404).json({ error: "No Post Found" }));
});

// @route    Delete  api/posts/:id
// @desc     Delete post
// @access   Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then((post) => {
        if (post.user.toString() !== req.user.id) {
          return res.status(401).json({ error: "User Not Authorized" });
        }
        post.remove().then(() => res.json({ success: true }));
      })
      .catch((err) => res.status(404).json({ erorr: "Post Not Found" }));
  }
);

// @route    Post api/posts
// @desc     Create Posts
// @access   Private
//why session:false? http://www.passportjs.org/docs/authenticate/
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      //if there is any error.
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id,
    });
    newPost.save().then((post) => res.json(post));
  }
);

module.exports = router;
