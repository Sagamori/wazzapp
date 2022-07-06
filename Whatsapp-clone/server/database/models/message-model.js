const mongoose = require("mongoose");
const moment = require("moment");

const MessageSchema = new mongoose.Schema(
  {
    sender: { type: String },
    receiver: { type: String },
    message: { type: Number },
    date: { type: Number, default: moment(new Date()).format("HH:mm") },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;
