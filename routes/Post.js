const express = require("express");
const router = express.Router();
const requireLogin = require("../middlewire/requireLogin");
const {
  createPost,
  getPost,
  getMypost,
  likePost,
  unLikepost,
  comments,
  deletePost,getsubPost
} = require("../controllers/post");

router.post("/createpost", requireLogin, createPost);
router.get("/getpost", requireLogin, getPost);
router.get("/getmypost", requireLogin, getMypost);
router.put("/like", requireLogin, likePost);
router.put("/unlike", requireLogin, unLikepost);
router.put("/comments", requireLogin, comments);
router.delete("/deletepost/:postId", requireLogin, deletePost);
router.get("/getsubpost",requireLogin,getsubPost);

module.exports = router;
