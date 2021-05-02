const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");
const passport = require("passport");
//Load User Model
const User = require("../../models/User");

//Load Input vadliation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// @route    Get api/users/test
// @desc     Tests user route
// @access   Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route Post api/users/register
// @desc  Register User
// @access Public
router.post("/register", (req, res) => {
  debugger;
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.email = "Email already Exist";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //size
        r: "pg", //rating
        d: "mm", //default
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            throw err;
          }
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// @route Post api/users/login
// @desc  Login User and return token
// @access Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    errors.email = "User Not Found";
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  //find the user by email
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ email: "User Not Found" });
    }
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        //user matched then assign the token
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
        };
        jwt.sign(payload, keys.secret, { expiresIn: 3600 }, (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token,
          });
        });
      } else {
        errors.password = "Password Incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route    Get api/users/current
// @desc     return the current user
// @access   Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

module.exports = router;
