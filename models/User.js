const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  followers:[{type:ObjectId,ref:"User"}],
  followings:[{type:ObjectId,ref:"User"}],
  pic:{
    type:String,
    default:"https://res.cloudinary.com/sourav1234/image/upload/v1602607920/blank-profile-picture-973460_960_720_qjdubf.webp"
  }
});

module.exports = mongoose.model("User", userschema);
