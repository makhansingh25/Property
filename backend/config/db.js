require("dotenv").config();
const mongoose = require("mongoose");
const Dburl = process.env.MONGODB_URL;
const ConnectDb = async () => {
  try {
    await mongoose.connect(Dburl);
    console.log("databse is connected");
  } catch (error) {
    console.log("connection failed", error);
  }
};
module.exports = ConnectDb;
