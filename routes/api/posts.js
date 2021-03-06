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
    .then((post) => res.json(posts))
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

// @route    Post api/posts/likes/:id
// @desc     Like Post
// @access   Private
//why session:false? http://www.passportjs.org/docs/authenticate/
//After successful authentication, Passport will establish a persistent login session. This is useful for the common scenario of users accessing a web application via a browser.
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        Post.findById(req.params.id).then((post) => {
          if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ error: "User already liked this post" });
          }
          //add to the post
          post.likes.unshift({ user: req.user.id });
          post.save().then((post) => {
            res.json(post);
          });
        });
      })
      .catch((err) => res.status(404).json({ erorr: "Post Not Found" }));
  }
);

// @route    Post api/posts/unlike/:id
// @desc     Unlike Post
// @access   Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        Post.findById(req.params.id).then((post) => {
          if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ error: "You have not yet liked this post" });
          }
          //get remove index

          const removeIndex = post.likes
            .map((item) => item.user.toString())
            .indexOf(req.user.id);
          //splice from the array
          post.likes.splice(removeIndex, 1);
          post.save().then((savedPost) => res.json(savedPost));
        });
      })
      .catch((err) => res.status(404).json({ erorr: "Post Not Found" }));
  }
);

// @route   POST api/posts/commnet/:id
// @desc    Add comment to post
// @access  Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
      .then((post) => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id,
        };
        //Add comment to the top of the array
        post.comments.unshift(newComment);
        post.save().then((savedPost) => res.json(savedpost));
      })
      .catch((err) => res.status(404).json({ postnotfound: "No post found" }));
  }
);

// @route   POST api/posts/commnet/:id/:comment)id
// @desc    Delete comment to post
// @access  Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then((post) => {
        if (
          post.comments.filter(
            (comment) => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res.status(404).json({ error: "Comment does not exist" });
        }
        const removeIndex = post.comments
          .map((item) => item._id.toString())
          .indexOf(req.params.comment_id);
        post.comments.splice(removeIndex, 1);
        post.save().then((savedPost) => res.json(savedPost));
      })
      .catch((err) => res.status(404).json({ postnotfound: "No post found" }));
  }
);

module.exports = router;
