const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const messageRoutes = require("./routes/messageRoutes");
const userRoutes = require ('./routes/userRoutes');

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes); // Login/Register routes
app.use('/api/users', userRoutes); // ✅ Get users
app.use('/api/protected', protectedRoutes);
app.use('/api/messages', messageRoutes);

// Store connected users
const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  socket.on("addUser", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("sendMessage", ({ senderId, receiverId, message }) => {
    const receiverSocketId = onlineUsers.get(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("getMessage", {
        senderId,
        message,
        timestamp: new Date().toISOString(),
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    for (let [userId, sockId] of onlineUsers.entries()) {
      if (sockId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on ${PORT}`));
