const express = require("express");
const router = express.Router();
const requireLogin = require("../middlewire/requireLogin");
const {
  getUser,
  followUser,
  unfollowUser
 
} = require("../controllers/Profile");

router.get("/getprofilepost/:id", requireLogin, getUser);

router.put("/follow", requireLogin, followUser);

router.put("/unfollow", requireLogin, unfollowUser);

module.exports = router;