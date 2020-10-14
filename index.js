const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
var cors = require("cors");

require("dotenv").config();

app.use(bodyparser.json());
app.use(cors());

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("conneted to db"));

const api = require("./routes/User");
const postApi = require("./routes/Post");
const profileapi=require("./routes/Profile")

app.use("/app", api);
app.use("/post", postApi);
app.use("/profile",profileapi)

if(process.env.NODE_ENV=="production"){
  app.use(express.static('client/build'))
  const path=require('path')
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`connected to port ${port}`);
});
