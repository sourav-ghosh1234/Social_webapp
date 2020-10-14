const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.hiMet = (req, res) => {
  res.send("ok");
};

exports.signIn = (req, res) => {
  const { email, password } = req.body;
  const email1 = email;
  console.log(email);
  User.findOne({ email: email }).then((usr) => {
    console.log(usr);
  });
  if (!email || !password) {
    return res.status(422).json({ error: "add all the fields properly" });
  }

  User.findOne({ email: email }).then((saveUser) => {
    if (!saveUser) {
      return res.status(422).json({ error: "invalid" });
    }

    bcrypt.compare(password, saveUser.password).then((domatch) => {
      if (domatch) {
        const token = jwt.sign({ _id: saveUser._id }, process.env.SECRET);
        const { _id, name, email,followers,followings,pic } = saveUser;
        res.status(200).json({
          token: token,
          user: { _id, name, email,followers,followings,pic },
        });
      } else {
        return res.status(404).send("invalid");
      }
    });
  });
};

exports.putImage=(req,res)=>{
  User.findByIdAndUpdate(req.user._id,{$set:{pic:req.body.pic}},{new:true},(err,result)=>{
    if(err){
      return res.ststus(404).json({error:"pic cant post"})
    }else{
      res.json(result);
    }
  })
}

exports.signUp = async (req, res) => {
  const { name, email, password,pic } = req.body;
  if (!email || !password || !name) {
    res.json({ error: "add all the fields properly" });
  }
  const user = await User.findOne({ email: email });
  if (user) {
    res.status(402).json({ error: "user already exists" });
  }
  bcrypt.hash(password, 12).then((pass) => {
    var p = pass;
    const saveuser = new User({
      name: name,
      email: email,
      password: pass,
      pic
    });
    saveuser
      .save()
      .then((re) => {
        res.status(200).json({ message: "User Succesfully Registered" });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

