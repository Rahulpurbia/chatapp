var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
const express = require("express");
const path = require("path");

const staticpath = path.join(__dirname, "static");
app.use(express.static(staticpath));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

let user = {};

io.on("connection", (socket) => {
  console.log("connected");
  socket.on("new-user-joined", (nameis) => {
    user[socket.id] = nameis;
    // console.log('nameis ' + nameis);
    socket.broadcast.emit("user-joined", user[socket.id]);
  });
  socket.on("message-sent", (message) => {
    socket.broadcast.emit("receive-msg", {
      message: message,
      name: user[socket.id],
    });
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("left", user[socket.id]);
    delete user[socket.id]; //removing the user from io
  });
});
var server_port = 8000;
http.listen(server_port, () => {
  console.log("listening on *:" + server_port);
});
