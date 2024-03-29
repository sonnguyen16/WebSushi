const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: false
  }
});

io.on("connection", (socket) => {  
	console.log(socket.id);
	
	socket.on("send", function(data) {
		console.log(data);
		socket.broadcast.emit("receive",data);
	})
});

httpServer.listen(3000);
