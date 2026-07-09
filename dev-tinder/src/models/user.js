const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 40,
      index: true,
    },
    lastName: {
      type: String,
      minLength: 1,
      maxLength: 40,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is not valid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7T7-cPcLcfLZdRk4OOsOP0xgE50xblN3JILN5rfvC0g&s=10",
    },
    about: {
      type: String,
      default: "I am a developer",
      maxLength: 150,
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.getJWT = async function () {
  const token = await jwt.sign({ _id: this._id }, "Sxxxxxx", {
    expiresIn: "7d",
  });

  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    this.password,
  );

  return isPasswordValid;
};

// const UserModel = mongoose.model("User", userSchema);

// module.exports = UserModel;

module.exports = mongoose.model("User", userSchema);
