const asyncHandler = require("express-async-handler");
const Message = require("../db/messageModel");
const User = require("../db/User");
const Chat = require("../db/chatModel");

//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected

const allMessages = asyncHandler(async (req, res) => {

  try {
    
    //:chatId in routes //request params
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name email")
      .populate("chat");

    res.json(messages);
    
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected

const sendMessage = asyncHandler(async (req, res) => {

  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }
  //schema 
  var newMessage = {
    sender: req.user,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    //populating the instance
    message = await message.populate("sender", "name");
    message = await message.populate("chat");

    //populating with the user in that chat field of our message doc instance
    message = await User.populate(message, {
      path: "chat.users",
      select: "name email",
    });

    console.log(message)
    let anotherUser = chatId.users[0]._id == message.sender._id ? chatId.users[1]:chatId.users[0] 
    await Chat.findByIdAndUpdate(req.body.chatId._id, { latestMessage: message,unReadBy:anotherUser });

    res.json(message);

  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { allMessages, sendMessage };