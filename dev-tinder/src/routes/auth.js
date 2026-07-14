const express = require("express");
const { signupValidation } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    if (!req.body) {
      throw new Error("Invalid body!");
    }
    const { firstName, lastName, emailId, password } = req.body;
    await signupValidation(req);
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User added successfully!");
  } catch (error) {
    res.send("ERROR: " + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  const { emailId, password } = req.body;

  try {
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const token = await user.getJWT();

    res.cookie("token", token, { expires: new Date(Date.now() + 8 * 3600000) });
    res.json({ message: "Login successfully", data: user });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout successfully");
});

module.exports = authRouter;
