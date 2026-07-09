const express = require("express");
const ConnectionRequestModel = require("../models/connectionRequest");

const userRouter = express.Router();

const userSafeData = "firstName lastName age gender about skills";

userRouter.get("/user/requests/received", async (req, res) => {
  const loggedInUser = req?.user;
  try {
    const requests = await ConnectionRequestModel.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", "firstName lastName age gender about skills");

    // populate("fromUserId", ["firstName", "lastName" ,"age" ,"gender" ,"about"," skills"]);
    res.json({ message: "Connections fetched successfully", data: requests });
  } catch (error) {
    res.status(400).send("ERROR " + error.message);
  }
});

userRouter.get("/user/connections", async (req, res) => {
  const loggedInUser = req?.user;
  try {
    const requests = await ConnectionRequestModel.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
      status: "accepted",
    })
      .populate("fromUserId", userSafeData)
      .populate("toUserId", userSafeData);

    const data = requests.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });
    res.json({ data });
  } catch (error) {
    res.status(400).send("ERROR " + error.message);
  }
});

module.exports = userRouter;
