const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//load profile model
const Profile = require("../../models/Profile");
//load user Model
const User = require("../../models/User");

// @route    Get api/profile/test
// @desc     Tests profile route
// @access   Public
router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

// @route    Get api/profile
// @desc     Get current user profile
// @access   Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch((err) => res.status(404).json(err));
  }
);

module.exports = router;
