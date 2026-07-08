const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { Error } = require("mongoose");

const adminAuth = (req, res, next) => {
  console.log("admin auth getting check");
  const token = "admin-token"; //req.headers.authorization; // get token from headers
  if (token !== "admin-token") {
    return res.status(401).send("Unauthorized request");
  }
  next();
};

// const userAuth = (req, res, next) => {
//   console.log("user auth getting check");
//   const token = "user-token"; //req.headers.authorization; // get token from headers
//   if (token !== "user-token") {
//     return res.status(401).send("Unauthorized request");
//   }
//   next();
// };

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  try {
    if (!token) {
      throw new Error("Invalid token!");
    }
    const decodedObj = await jwt.verify(token, "Sxxxxxx");

    const { _id } = decodedObj;

    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User not found!");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("ERROR " + error.message);
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
