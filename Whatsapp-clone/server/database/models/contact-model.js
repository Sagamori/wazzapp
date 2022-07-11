const mongoose = require('mongoose');
// const moment = require('moment');

const ContactSchema = new mongoose.Schema(
  {
    userId: { type: String },
    contacts: [
      {
        phone_number: { type: String },
        username: { type: String },
        contactId: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const Contact = mongoose.model('Contact', ContactSchema);

module.exports = Contact;
