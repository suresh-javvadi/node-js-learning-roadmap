const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { userAuth } = require("../middlewares/auth");
const { validateProfileEditData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");

const profileRouter = express.Router();

profileRouter.get("/profile/view", (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      throw new Error("User not found, please login again");
    }
    res.send(user);
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

profileRouter.patch("/profile/edit", async (req, res) => {
  try {
    const { isEditAllowed, isURLValid } = validateProfileEditData(req);

    if (!isEditAllowed) {
      throw new Error("Invalid edit request!");
    }

    if (!isURLValid) {
      throw new Error("Please enter a valid photo url");
    }
    const loggedInUser = req?.user;

    // const user = await User.findByIdAndUpdate(loggedInUser?.id, req.body);

    Object.keys(req.body).forEach((k) => (loggedInUser[k] = req.body[k]));

    await loggedInUser.save();
    res.json({
      message: `${loggedInUser.firstName} User updated successfully`,
      data: loggedInUser,
    });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

profileRouter.patch("/profile/password", async (req, res) => {
  const isEditAllowed =
    Object.keys(req.body).length === 1 &&
    Object.keys(req.body).every((k) => k === "password");

  try {
    if (!isEditAllowed) {
      throw new Error("Invalid edit request");
    }
    const loggedInUser = req?.user;

    const isPasswordStrong = validator.isStrongPassword(req.body?.password);

    if (!isPasswordStrong) {
      throw new Error("Enter the string password");
    }

    const passwordHash = await bcrypt.hash(req.body.password, 10);
    loggedInUser.password = passwordHash;
    await loggedInUser.save();

    res.send("Password changed successfully");
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

module.exports = profileRouter;
