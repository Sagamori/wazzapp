const mongoose = require('mongoose');
const moment = require('moment');

const ConversationSchema = new mongoose.Schema(
  {
    userId: { type: String },
    conversations: [
      { recipients: { type: String }, messages: { type: Array } },
    ],
  },
  { timestamps: true }
);

const Conversation = mongoose.model('Conversation', ConversationSchema);

module.exports = Conversation;
