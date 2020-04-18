const socket = io("/");

const input = document.getElementById("username");
const btn = document.getElementById("submitName");
const login = document.getElementById("login");
const messageForm = document.getElementById("message");
const messagebtn = messageForm.querySelector("button");
const messageInput = messageForm.querySelector("input");
const messageList = document.getElementById("messageList");

messageForm.style.display = "none";

btn.addEventListener("click", () => {
  const { value } = input;
  socket.emit("login", { value });
  loginForm.style.display = "none";
  messageForm.style.display = "block";
});

messagebtn.addEventListener("click", () => {
  const { value } = messageInput;
  // socket.emit <- 받은 데이터 처리
  socket.emit("newDM", { value });
  addDM("you", value);
  messageInput.value = "";
});

// socket.on("서버에서 받을 이벤트명", 데이터)
socket.on("newperson", (data) => {
  const { value } = data;
  notification.innerText = `${value} just joined`;
  setTimeout(() => (notification.innerText = ""), 3000);
});

socket.on("newDMreceived", (data) => {
  const { from, message } = data;
  addDM(from, message);
});

const addDM = (from, message) => {
  const newDM = document.createElement("li");
  newDM.innerText = `${from}: ${message}`;
  messageList.prepend(newDM);
};
