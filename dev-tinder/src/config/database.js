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

if (process.env.DNS_SERVERS) {
  require("dns").setServers(process.env.DNS_SERVERS.split(","));
}

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};

module.exports = { connectDB };
