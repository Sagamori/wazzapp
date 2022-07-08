const mongoose = require("mongoose");
// const moment = require('moment');

const ConversationSchema = new mongoose.Schema(
  {
    userId: { type: String },
    conversations: [
      { recipients: { type: Array }, messages: { type: Array } },
    ],
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Message", ConversationSchema);

module.exports = Conversation;
