// index.js
import express from "express";
import { Server } from "socket.io";
import http from "http";
import dotenv from "dotenv";
import { format } from "date-fns";

// Load environment variables from .env file
dotenv.config();

// Initialize Express
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: process.env.APP_URL, // client
    methods: ["GET", "POST"],
  },
});

// Handle Socket.IO connections
io.on("connection", async (socket) => {
  console.log("a user connected");

  // const res = await fetch(`${process.env.APP_URL}/api/user`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ username: "User" }),
  // });

  // const user = await res.json();
  // console.log(user);

  socket.on("formRequestSend", (req) => {
    io.emit("formRequestReceive", req);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.get("/api/server-time", (req, res) => {
  let serverTime = new Date(); // ISO format is common and easy to work with
  // let serverTimef = format(serverTime, "MMMM dd, yyyy HH:mm");
  res.json({ serverTime });
});

// Start the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () =>
  console.log(`Server is running on ${process.env.SERVER_URL}`)
);
