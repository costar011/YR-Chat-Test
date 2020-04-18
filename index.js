import express from "express";
import logger from "morgan"; // 로그모듈
import socketIO from "soket.io"; // socket.io 서버에 접속

const PORT = 3000;

const app = express();

app.set("view engine", "pug");

app.use(express.static("public"));

app.use(logger("tiny"));

app.get("/", (_, res) => res.render("index"));

const server = app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});

const io = socketIO.listen(server);

io.on("connect", (socket) => {
  // socket.on("이벤트명", 콜백)
  socket.on("login", (data) => {
    const { value } = data;
    socket.name = value;
    socket.broadcast.emit("newperson", { value });
  });
  socket.on("newDM", (data) => {
    const { value } = data;

    socket.broadcast.emit("newDMreceived", {
      from: socket.name,
      massage: value,
    });
  });
});
