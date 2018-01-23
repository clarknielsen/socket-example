const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// array to store all chat messages
var messages = [];

io.on("connection", (socket) => {
  console.log("client connected");

  // send this client all saved messages
  socket.emit("messages", messages);

  // incoming message from client
  socket.on("message", (data) => {
    console.log("message received:", data);

    // save for later
    messages.push(data);

    // relay to all open clients
    io.emit("message", data);
  });
});

// public assets
app.use(express.static("public"));

// start localhost
server.listen(PORT, function() {
  console.log(`App running on port ${PORT}`);
});