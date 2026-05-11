<!DOCTYPE html>
<html>
<head>
    <title>WebSocket Chat</title>
</head>
<body>

<input type="text" id="msg" placeholder="Enter message">
<button onclick="sendMsg()">Send</button>

<ul id="messages"></ul>

<script>
const socket = new WebSocket("ws://localhost:8080/chat");

socket.onmessage = (e) => {
    let li = document.createElement("li");
    li.textContent = e.data;
    document.getElementById("messages").appendChild(li);
};

function sendMsg() {
    let msg = document.getElementById("msg").value;
    socket.send(msg);
    document.getElementById("msg").value = "";
}
</script>

</body>
</html>
