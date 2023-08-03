const express = require('express');
const dotenv = require('dotenv');
const { chats } = require('../data/data')
const cors = require('cors');
const connectDB = require('../config/db');
const userRoutes = require('../routes/userRoutes');
const chatRoutes = require('../routes/chatRoutes');
const messageRoutes = require('../routes/messageRoutes');
const { notFound, errorHandler } = require('../middleware/errorMiddleware');
const path = require('path');


dotenv.config();
connectDB();

const app = express();



app.use(express.json()); // to accept JSON Data


app.use(cors());


app.get('/', (req, res) => {
  res.send("Interacto Backend Sever up and running....."); // response from server
})


app.use('/api/user', userRoutes); // redirect all /api/user/ requests to the file userRoutes
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);


// if no other links work as given above .. we finally will come across error handlers

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const Port = process.env.PORT || 3000;

const server = app.listen(Port, console.log(`Server is running on Port ${Port}`));

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3001",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});






