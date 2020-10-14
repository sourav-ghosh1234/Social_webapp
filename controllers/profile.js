const mongoose = require("mongoose");
const Post = require("../models/Post");
const User=require('../models/User');

exports.getUser=(req,res)=>{
    User.findOne({_id:req.params.id})
    .select("-password")
       .then(user=>{
           Post.find({postedby:req.params.id})
            .populate("postedby","_id name")
            .exec((err,post)=>{
                if(err){
                    return res.status(422).json({error:err})
                }
                return res.status(200).json({
                    user:user,
                    post:post
                });
            })


       }).catch(err=>{
           res.status(404).json({error:"User not found"})
       })
}
exports.followUser=(req,res)=>{

    User.findByIdAndUpdate(req.body.followId,{
        $push:{followers:req.user._id}
    },{new:true}
    ,(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        User.findByIdAndUpdate(req.user._id,{
            $push:{followings:req.body.followId}
            
        },{new:true}).select("-password").then(result=>{
            res.json(result)
        })
    }
    )

}
exports.unfollowUser=(req,res)=>{
    User.findByIdAndUpdate(req.body.unfollowId,{
        $pull:{followers:req.user._id}
    },{new:true}
    ,(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        User.findByIdAndUpdate(req.user._id,{
            $pull:{followings:req.body.unfollowId}
            
        },{new:true}).select("-pasword").then(result=>{
            res.json(result)
        })
    }
    )

}