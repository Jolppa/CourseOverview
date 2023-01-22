const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error(
        "MONGO_URI not found in .env file! Please check the util/secret.env ..."
      );
    }
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected".green.inverse);
  } catch (err) {
    console.error(err.message.red);
    process.exit(1);
  }
};
module.exports = connectDB;
