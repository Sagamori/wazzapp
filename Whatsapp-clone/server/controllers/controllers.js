<<<<<<< HEAD
const User = require("../database/models/user-model.js");
const messagebird = require("messagebird")("ubZzocWfocNCDAli2MMhswHUE");
=======
const User = require('../database/models/user-model.js');
const messagebird = require('messagebird')('ubZzocWfocNCDAli2MMhswHUE');

>>>>>>> 9caef07893f542c46d0872a831b1c30db3ece745
const register = async (req, res) => {
  const { username, phone_number, password } = req.body;
  console.log(username, phone_number);

  try {
    await User.create({
      username,
      phone_number,
      password,
    });
    res.json({ msg: 'Registration Successful' });
  } catch (error) {
    console.log(error);
  }
};

const sendCode = async (req, res) => {
<<<<<<< HEAD
  console.log(req.body, "body in server sendCode function");
=======
  console.log(req.body, 'body in server sendCode function');
>>>>>>> 9caef07893f542c46d0872a831b1c30db3ece745
  const { number } = req.body;
  console.log(number);

  messagebird.verify.create(
    number,
    {
      originator: 'Miqela',
      template: 'Your verification code is %token.',
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

module.exports = { register, sendCode, verify };
