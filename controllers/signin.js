const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer=require("nodemailer");
const crypto=require("crypto")

var transporter=nodemailer.createTransport({
  service:"gmail",
  auth:{
    user:'instagram150012@gmail.com',
    pass:'instagram@12'
  }
});



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
exports.resetPassword=(req,res)=>{

  crypto.randomBytes(32,(err,buffer)=>{
    if(err){
      console.log(err)
    }
    const token=buffer.toString("hex")
    User.findOne({email:req.body.email})
     .then(user=>{
       if(!user){
         return res.status(422).json({error:"Email not exists"})
       }
       user.resetToken=token;
       user.expireToken=Date.now() + 3600000;
       user.save().then(
         result=>{
           transporter.sendMail({
             to:result.email,
             from:"no-reply@insta.com",
             subject:"Password Reset",
             html:`
             <p>You requested for reset password</p>
             <h2>click in this <a href="http://localhost:3000/reset/${token}">Link</a> to reset password</h2>
             `
           })
           res.json({message:"check your email"})
         }

       )


     })
    

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
exports.newPassword=(req,res)=>{
  const password=req.body.password;
  const sentToken=req.body.token;
  User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
   .then(user=>{
     if(!user){
       return res.statis(422).json({error:"Try again session expired"})
     }
     bcrypt.hash(password,12).then(hashedPassword=>{
       user.password=hashedPassword;
       user.resetToken=undefined;
       user.expireToken=undefined;
       user.save(savedUser=>{
         res.json({message:"Password updated successfully"})
       })
     })
     
   })
}
exports.searchUser=(req,res)=>{
  let userPattern=new RegExp("^"+req.body.pattern);

  User.find({email:{$regex:userPattern}})
   .select("_id email")
   .then(user=>{
    if(!user){
      return res.status(422).json({error:"Cant find user"})
    }
    console.log(user)
    res.json({user:user})
  })
}
