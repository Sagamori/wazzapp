const express = require("express");

const app = express();
const messagebird = require("messagebird")("GSbnA4y8QT0H4IWJb4pVqj0RY");

app.use(express.json());

app.post("/step2", (req, res) => {
  const { number } = req.body;

  messagebird.verify.create(
    number,
    {
      originator: "Miqela",
      template: "Your verification code is %token.",
    },
    function (err, response) {
      if (err) {
      } else {
      }
    }
  );
});

app.post("/step3", (req, res) => {
  const id = req.body.id;
  const token = req.body.token;

  messagebird.verify.verify(id, token, (err, response) => {
    if (err) {
    } else {
    }
  });
});

app.listen(5000, () => "listening to port 5000");
