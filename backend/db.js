require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
