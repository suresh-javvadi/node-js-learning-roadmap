const express = require("express");
const mongoose = require("mongoose");
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");

const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:toUserId", async (req, res) => {
  const allowedStatus = ["ignored", "interested"];

  try {
    const fromUserId = req?.user?._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status " + status });
    }

    if (!mongoose.Types.ObjectId.isValid(toUserId)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const existingRequest = await ConnectionRequestModel.findOne({
      $or: [
        { fromUserId: fromUserId, toUserId: toUserId },
        {
          fromUserId: toUserId,
          toUserId: fromUserId,
        },
      ],
    });

    if (existingRequest) {
      return res
        .status(400)
        .json({ message: "Connection request already exist!" });
    }

    const toUser = await User.findById(toUserId);

    if (!toUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const connectionRequest = new ConnectionRequestModel({
      fromUserId,
      toUserId,
      status,
    });

    const data = await connectionRequest.save();

    res.json({
      message: "Connection request send successfully",
      data,
    });
  } catch (error) {
    res.status(400).send("ERROR " + error.message);
  }
});

requestRouter.patch("/request/review/:status/:requestId", async (req, res) => {
  const allowedStatus = ["accepted", "rejected"];
  const loggedInUser = req?.user;

  try {
    const { status, requestId } = req.params;

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: `${status} is invalid status` });
    }

    if (!mongoose.Types.ObjectId.isValid(requestId)) {
      return res.status(400).json({ message: `Invalid  request id` });
    }

    const connectionRequest = await ConnectionRequestModel.findOne({
      _id: requestId,
      toUserId: loggedInUser._id,
      status: "interested",
    });

    if (!connectionRequest) {
      return res.status(400).json({ message: "request not found" });
    }

    connectionRequest.status = status;
    const data = await connectionRequest.save();

    res.json({ message: `Request ${status}`, data });
  } catch (error) {
    res.status(400).send("ERROR " + error.message);
  }
});

module.exports = requestRouter;
