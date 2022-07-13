const Contact = require("../database/models/contact-model.js");
const User = require("../database/models/user-model.js");

//Message Bird test key
const messagebird = require("messagebird")("3oL41uxf1Z2rR87PhVdR0hU3D");

const getUserData = async (req, res) => {
  const { id: userId } = req.body;
  const user = await User.findOne({ _id: userId }).select([
    "username",
    "phone_number",
  ]);
  console.log(user, " selected");
  res.json(user);
};

const register = async (req, res) => {
  const { username, phone_number, password } = req.body;
  console.log(username, phone_number);

  try {
    const { _id } = await User.create({
      username,
      phone_number,
      password,
    });
    res.json({ id: _id });
  } catch (error) {
    console.log(error);
  }
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
    contactId: user._id,
  };

  await Contact.updateOne(
    { userId },
    { $push: { contacts: contact } },
    { upsert: true }
  );

  const { contacts } = await Contact.findOne({ userId });
  const newContact = contacts.filter((e) => e.phone_number === phone_number);
  console.log(newContact, " new oine");
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
  // recipients.forEach(async (e) => {
  //   const eachRecipient = await User.findOne({ _id: e });
  //   recipient.push(eachRecipient);
  // });
  console.log(recipients, "controller recipients in conversation");
  for (const item of recipients) {
    const eachRecipient = await User.findOne({ _id: item });
    recipient.push(eachRecipient);
  }

  console.log(recipient);

  // const { conversations: conversation } = await Conversation.findOne({
  //   userId,
  // });

  // await Conversation.updateOne(
  //   { userId },
  //   { $push: { conversations } },
  //   { upsert: true }
  // );

  // console.log(conversation, "esss");
  // res.json(conversation);
  res.json(recipient);
};

const sendCode = async (req, res) => {
  console.log(req.body, "body in server sendCode function");

  const { number } = req.body;
  console.log(number);

  messagebird.verify.create(
    number,
    {
      originator: "wazzapp",
      template: "Your verification code is %token.",
    },
    (err, response) => {
      if (err) {
        res.json({ error: err.errors[0].description });
        console.log(err);
      } else {
        res.json({ id: response.id });
        console.log({ id: response });
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
      console.log(err);
    } else {
      res.json(response);
      console.log(response);
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
  getUserData,
};
