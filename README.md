## socket.io example

Live chat using socket.io. Every time a new client connects, the server emits all saved messages to that client. Anytime a client submits a chat message, it emits to the back-end, which saves it and relays that message to all open connections/clients.