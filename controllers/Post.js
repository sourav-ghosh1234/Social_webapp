const mongoose = require("mongoose");
const Post = require("../models/Post");

exports.getMypost = (req, res) => {
  Post.find({ postedby: req.user._id })
    .populate("postedby", "_id name")
    .then((result) => {
      res.status(200).send(result);
    });
};

exports.getPost = (req, res) => {
  Post.find()
    .populate("postedby", "_id name")
    .populate("comments.postedby","_id name")
    .then((result) => {
      res.status(200).send(result);
    });
};
exports.getsubPost = (req, res) => {
  Post.find({postedby:{$in:req.user.followings}})
    .populate("postedby", "_id name")
    .populate("comments.postedby","_id name")
    .then((result) => {
      res.status(200).send(result);
    });
};

exports.createPost = (req, res) => {
  const { title, body, url } = req.body;
  console.log(req.body);
  if (!title || !body || !url) {
    return res.status(422).json({ error: "please add all the fields" });
  }
  // req.user.password = undefined;

  const post = new Post({
    title: title,
    body: body,
    photo: url,
    postedby: req.user,
  });
  post.save().then((result) => {
    res.status(200).send(result);
  });
};
exports.likePost = async(req, res) => {
  
   Post.findByIdAndUpdate(req.body.postId, {
    $push: { likes: req.user._id },
    new: true,
  }).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
      
    }
   
  })
  const data=await Post.findById(req.body.postId);
  res.status(200).send(data)

  
};
exports.unLikepost = async(req, res) => {
  Post.findByIdAndUpdate(req.body.postId, {
    $pull: { likes: req.user._id },
    new: true,
  }).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
      
    }
   
  })
  const data=await Post.findById(req.body.postId);
  res.status(200).send(data)
};
exports.comments =async(req, res) => {
  const comment={
    text:req.body.com,
    postedby:req.user._id
  }
  Post.findByIdAndUpdate(req.body.postId, {
    $push: { comments:comment },
    new: true,
  })
 
  .exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
      
    }
    
  })
  Post.findById(req.body.postId)
  
  .populate("postedby","_id name")
  .populate("comments.postedby","_id name")
   .then(result=>{
     res.status(200).send(result);
   })

};
exports.deletePost=async(req,res)=>{
  console.log("find")
  const a =await Post.findOne({_id:req.params.postId})
  if(!a){
    return res.status(422).json({error:"post Id not found"})
  }
  const post=await a.remove()
  res.json({result:a});
 
}