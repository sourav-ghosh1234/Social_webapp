const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).send("doesnot authorize");
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.SECRET, (err, payload) => {
    if (err) {
      res.send("unauthorized");
    }
    const { _id } = payload;
    User.findById(_id).then((userdata) => {
      req.user = userdata;
      next();
    });
  });
};
