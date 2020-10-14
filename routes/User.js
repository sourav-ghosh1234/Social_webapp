const express = require("express");
const router = express.Router();
const requireLogin = require("../middlewire/requireLogin");
const { signIn, signUp, hiMet,putImage } = require("../controllers/signin");

router.post("/signin", signIn);
router.post("/signup", signUp);
router.get("/hi", requireLogin, hiMet);
router.put("/updatepic", requireLogin, putImage);

module.exports = router;
