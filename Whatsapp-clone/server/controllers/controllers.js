const User = require("../database/models/user-model.js");

const register = async (req, res) => {
  const { username, phone_number } = req.body;
  console.log(username, phone_number);

  try {
    await User.create({
      username,
      phone_number,
    });
    res.json({ msg: "Registration Successful" });
  } catch (error) {
    console.log(error);
  }
};

const sendCode = async (req, res) => {
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
        console.log(err);
      } else {
        console.log(response);
      }
    }
  );
};

const verify = async (req, res) => {
  const id = req.body.id;
  const token = req.body.token;

  messagebird.verify.verify(id, token, (err, response) => {
    if (err) {
      console.log(err);
    } else {
      console.log(response);
    }
  });
};

module.exports = { register, sendCode, verify };
