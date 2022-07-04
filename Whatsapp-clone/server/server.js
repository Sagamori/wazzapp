const { Server } = require("socket.io");
const cors = require("cors");
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const router = require("./routes/user-routes.js");

const PORT = process.env.PORT || 5000;

mongoose.connect(
  "mongodb+srv://aurelia:adamiani123@usermanagement.wgcgh.mongodb.net/chatUsers?retryWrites=true&w=majority",
  () => console.log("db connected")
);

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(router);
app.use(cors({ origin: "*" }));

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  const id = socket.handshake.query.id;
  socket.join(id);

  socket.on("send-message", ({ recipients, text }) => {
    recipients.forEach((recipient) => {
      const newRecipients = recipients.filter((r) => r !== recipient);

      newRecipients.push(id);
      socket.broadcast.to(recipient).emit("receive-message", {
        recipients: newRecipients,
        sender: id,
        text,
      });
    });
  });
});

server.listen(PORT, () => console.log("server"));
