const express = require("express");
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");

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

userRouter.get("/user/feed", async (req, res) => {
  const loggedInUser = req?.user;
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  let limit = parseInt(req.query.limit) || 10;
  limit = limit > 50 ? 10 : limit;
  const skip = (page - 1) * limit;

  try {
    const requests = await ConnectionRequestModel.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");

    const hideUsersFromFeed = new Set();
    requests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });
    hideUsersFromFeed.add(loggedInUser._id.toString());

    const filter = { _id: { $nin: Array.from(hideUsersFromFeed) } };

    const total = await User.countDocuments(filter);

    const data = await User.find(filter)
      .select(userSafeData)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    res.status(400).send("ERROR " + error.message);
  }
});

module.exports = userRouter;
