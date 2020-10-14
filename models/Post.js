const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const postschema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  likes: [{ type: ObjectId, ref: "User" }],
  comments:[
    {
      text:String,
      postedby:{
        type:ObjectId,
        ref:"User"
      }
    }
  ],
  postedby: {
    type: ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Post", postschema);
