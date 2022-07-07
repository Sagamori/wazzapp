const mongoose = require("mongoose");
const moment = require("moment");

const MessageSchema = new mongoose.Schema(
  {
    userId: { type: String },
    conversations: [{ recipients: { type: String }, messages: { type: Array } }],
    // date: { type: Number, default: moment(new Date()).format("HH:mm") },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;
