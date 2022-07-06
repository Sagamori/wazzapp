const User = require("../database/models/user-model.js");
const messagebird = require("messagebird")("lEpl5MyA1H9lgc9bvddZyQRMp");

const register = async (req, res) => {
  const { username, phone_number, password } = req.body;
  console.log(username, phone_number);

  try {
    await User.create({
      username,
      phone_number,
      password,
    });
    res.json({ msg: "Registration Successful" });
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

const sendCode = async (req, res) => {
  console.log(req.body, "body in server sendCode function");

  const { number } = req.body;
  console.log(number);

  messagebird.verify.create(
    number,
    {
      originator: "Miqela",
      template: "Your verification code is %token.",
    },
    function (err, response) {
      if (err) {
        res.json({ error: err.errors[0].description });
        console.log(err);
      } else {
        res.json({ id: response.id });
        console.log({ id: response.id });
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

module.exports = { register, sendCode, verify, login };
