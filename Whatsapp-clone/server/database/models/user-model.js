const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    phone_number: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
