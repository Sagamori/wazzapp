const Contact = require("../database/models/contact-model.js");
const Conversation = require("../database/models/conversation-model.js");
const User = require("../database/models/user-model.js");
const messagebird = require("messagebird")("UrYOgshu9l1rym47H8dTuHRrr");

const register = async (req, res) => {
  const { username, phone_number, password } = req.body;

  try {
    await User.create({
      username,
      phone_number,
      password,
    });
    res.json({ msg: "Registration Successful" });
  } catch (error) {}
};

const login = async (req, res) => {
  const { username, phone_number } = req.body;
  const [user] = await User.find({
    $or: [{ phone_number }, { username }],
  }).select(["username", "phone_number"]);

  if (!user) {
    return res.json({ message: "User doesn't exists!!!" });
  } else if (
    user &&
    user.username === username &&
    user.phone_number === phone_number
  ) {
    return res.json(user);
  }
  res.json({ message: "Invalid Credentials!!!" });
};

const addContact = async (req, res) => {
  const { id: userId, phone_number } = req.body;
  const user = await User.findOne({ phone_number });
  if (!user) return " no user";

  const contact = {
    phone_number,
    username: user.username,
  };

  await Contact.updateOne(
    { userId },
    { $push: { contacts: contact } },
    { upsert: true }
  );

  const { contacts } = await Contact.findOne({ userId });
  const newContact = contacts.filter((e) => e.phone_number === phone_number);
  res.json(newContact);
};

const getContacts = async (req, res) => {
  const { id: userId } = req.body;
  const contacts = await Contact.findOne({ userId });
  !contacts ? res.json([]) : res.json(contacts.contacts);
};

const addConversation = async (req, res) => { 
  const { id: userId, recipients } = req.body;
  let recipient = [];

  recipients.forEach(async (e) => {
    console.log(e);
    const eachRecipient = await User.findOne({ e });
    recipient.push(eachRecipient);
  });

  // const user = await User.findOne({ phone_number });

  // await Conversation.updateOne(
  //   { userId },
  //   { $push: { conversations } },
  //   { upsert: true }
  // );

  // const { conversations: conversation } = await Conversation.findOne({
  //   userId,
  // });

  res.json(recipient);
};

const sendCode = async (req, res) => {
  const { number } = req.body;

  messagebird.verify.create(
    number,
    {
      originator: "wazzapp",
      template: "Your verification code is %token.",
    },
    function (err, response) {
      if (err) {
        res.json({ error: err.errors[0].description });
      } else {
        res.json({ id: response.id });
      }
    }
  );
};

const verify = async (req, res) => {
  const id = req.body.id;
  const token = req.body.token;

  messagebird.verify.verify(id, token, (err, response) => {
    if (err) {
      res.json({ error: err.errors[0].description, id });
    } else {
      res.json(response);
    }
  });
};

module.exports = {
  register,
  sendCode,
  verify,
  login,
  addContact,
  getContacts,
  addConversation,
};
