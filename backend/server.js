const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passportConfig = require("./lib/passportConfig");
const cors = require("cors");
const dotenv = require("dotenv");
const path = __dirname + "/build/";

dotenv.config();


// MongoDB
mongoose
  .connect("mongodb+srv://Aniket2971:Aniket@2971@cluster0.hbosghe.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((res) => console.log("Connected to DB"))
  .catch((err) => console.log(err));


const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Setting up middlewares
app.use(cors());
app.use(express.json());
app.use(passportConfig.initialize());
app.use(express.static(path));

// Routing
app.use("/auth", require("./routes/authRoutes"));
app.use("/profile", require("./routes/profileRoutes"));
app.use("/project", require("./routes/projectRoutes"));
app.use("/application", require("./routes/applicationRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/chat", require("./routes/chatRoutes"));
app.use("/api/message", require("./routes/messageRoutes"));


const server = app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});

app.get("/*", function (req, res) {
  res.sendFile(path + "index.html");
});
const io = require("socket.io")(server, {
  pingTimeout: 120000,
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log(`Logged in user ${userData.username} joined the created room`);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log(room)
    console.log("User Joined the selectedChat Room: " + room);//room-selectedChatId
  });
  
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new_message", (room,newMessageRecieved) => {
    
    var chat = newMessageRecieved.chat;

    if (!newMessageRecieved.users) return console.log("chat.users not defined");

    newMessageRecieved.users.forEach((user) => {
      // console.log("New message received")
      if (user._id == newMessageRecieved.sender._id) return;

      else{

        socket.in(user._id).emit("message_recieved", newMessageRecieved);
      }
  
      //.in-- inside user._id exclusive socket room joined-- emit this "message recieved" event ////mern-docs
    });
    
    // socket.to(room).emit('message recieved',newMessageRecieved)
    
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });

});  
