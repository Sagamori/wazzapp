const mongoose = require("mongoose");
const moment = require("moment");

const ContactSchema = new mongoose.Schema(
  {
    userId: { type: String },
    contacts: [
      {
        number: { type: String },
        username: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", ContactSchema);

module.exports = Contact;
