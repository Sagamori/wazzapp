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

module.exports = register;
