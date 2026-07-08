const express = require("express");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/database");

const app = express();

app.use(express.json());
app.use(cookieParser());

const startServer = async () => {
  try {
    await connectDB();
    console.log("Database connected successfully!!");
    app.listen(3000, () => {
      console.log("Server is listening on port 3000");
    });
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
};

startServer();
