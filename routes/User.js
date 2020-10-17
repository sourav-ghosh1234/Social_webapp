const express = require("express");
const router = express.Router();
const requireLogin = require("../middlewire/requireLogin");
const { signIn, signUp, hiMet,putImage,resetPassword, newPassword,searchUser} = require("../controllers/signin");

router.post("/signin", signIn);
router.post("/signup", signUp);
router.get("/hi", requireLogin, hiMet);
router.put("/updatepic", requireLogin, putImage);
router.post("/resetpassword", resetPassword);
router.post("/newpassword", newPassword);
router.post("/searchuser", searchUser);


module.exports = router;
