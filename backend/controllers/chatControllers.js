const { response } = require("express");
const asyncHandler = require("express-async-handler");
const Chat = require("../db/chatModel");
const User = require("../db/User");

//@description     Create or fetch One to One Chat
//@route           POST /api/chat/
//@access          Protected
const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  var isChat = await Chat.find({
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  //populating with the user in that latestMessage.sender in our chat doc
  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name email",
  });

  if (isChat.length > 0) {
    isChat[0].unReadBy = isChat[0].users[0]._id == req.user_id?isChat[0].users[1]:isChat[0].users[0]
    res.send(isChat[0]);
    //1on1chat
  } else {//as per schema
    var chatData = {
      chatName: "sender", //just any string data
      users: [req.user._id, userId], //both users
    };
    //console.log(chatData,'chatdata');

    try {
      const createdChat = await Chat.create(chatData);
      //console.log(createdChat, 'created and stored newChat')

      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate("users", "-password").populate("unReadBy");
      //console.log(fullChat, 'sending the created chat after populating both the user data inside the users[]');

      res.status(200).json(fullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

//@description     Fetch all chats for a user
//@route           GET /api/chat/
//@access          Protected

const fetchChats = asyncHandler(async (req, res) => {
  try {

    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        //populating user inside latestMessage's sender
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name email",
        });

        results.map((item)=>{

          let anotherUser = item.users[0]._id == req.user._id ? item.users[1]:item.users[0]
          item.unReadBy = anotherUser
        })
        

        res.status(200).send(results);
        //console.log(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});


const updateUnRead = asyncHandler(async (req,res)=>{
  let {item} = req.body
  try{

    Chat.findOneAndUpdate({_id:item._id},
      {$set:{
        unreadCount:item.unreadCount,
        unReadBy:item.unReadBy
      }}
      )
      .then((response)=>{
        // console.log("UpdateUnReadCount:\n",response)
        res.json(response)
      })
    }
    catch (error){
      console.log(error.message)
    }
})

const getUnReadCount = asyncHandler(async (req,res)=>{
  try{
    
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } },unreadCount:{$gt:0} })
    .then((response)=>{
      
      let unreadCnt = 0
      response.map((item)=>{
        unreadCnt += item.unreadCount
      })
      console.log(unreadCnt)
      res.json(unreadCnt)

    })
  }
  catch (error){
    console.log(error)
    res.json(error.message)
  }
})

module.exports = { accessChat, fetchChats,updateUnRead, getUnReadCount};
