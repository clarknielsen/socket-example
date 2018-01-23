var socket = io("http://localhost:3000");

// append string to dom
function makeRow(str) {
  var row = document.createElement("p");
  row.innerHTML = str;

  document.getElementById("messages").appendChild(row);
}

// single incoming message
socket.on("message", function(data) {
  makeRow(data);
});

// all messages (triggered after connection)
socket.on("messages", function(data) {
  if (data.length > 0) {
    for (var i = 0; i < data.length; i++) {
      makeRow(data[i]);
    }
  }
});

// submit form
document.getElementById("sendNew").onsubmit = function(e) {
  e.preventDefault();

  var txt = document.getElementById("txt");

  // send to server to relay to all open clients
  socket.emit("message", txt.value);

  txt.value = "";
};