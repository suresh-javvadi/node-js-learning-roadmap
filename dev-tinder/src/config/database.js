const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     await mongoose.connect(
//       "mongodb+srv://sureshjavvadi:xxxxxxx@learningnode.p0acwhb.mongodb.net/dev_tinder",
//     );
//     console.log("Database connected successfully");
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//     process.exit(1);
//   }
// };

// connectDB();

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://sureshjavvadi:xxxxxxx@learningnode.p0acwhb.mongodb.net/dev_tinder",
  );
};

module.exports = { connectDB };
