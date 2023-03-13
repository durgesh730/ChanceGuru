const { response } = require("express");
const asyncHandler = require("express-async-handler");
const Chat = require("../db/chatModel");
const ChatReport = require("../db/reportChat");
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
      .populate("unReadBy")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        //populating user inside latestMessage's sender
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name email",
        });

        // results.map((item)=>{

        //   let anotherUser = item.users[0]._id == req.user._id ? item.users[1]:item.users[0]
        //   item.unReadBy = anotherUser
        // })
        

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
  console.log("chatController 96 item unreadCount: ",item.unreadCount)
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

const incrementChat = asyncHandler(async (req,res)=>{
  let {item} = req.body
  console.log(item)
  // console.log("chatController 117 item unreadCount: ",item.unreadCount)
  try{

    Chat.findOneAndUpdate({_id:item._id},
      {$inc:{
        unreadCount:1
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
    
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } },unreadCount:{$gt:0},unReadBy:req.user._id })
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


const reportChat = asyncHandler(async (req,res)=>{
  let {reportData,selectedChat} = req.body 
  console.log("chat controller 161",selectedChat)
  try {
    console.log("chat controller 163",reportData)
    ChatReport.create(reportData)
    .then((response)=>{

      Chat.findByIdAndUpdate(selectedChat._id,{$set:{
        status:"reported"
      }})
      .then((response)=>{
        console.log("Chat status updated successfull \n",response)
      })
      .catch((error)=>{
        console.log("An error occurred while updating chat status \n",error)
      })
      res.json(response.data);
    })
    .catch((err)=>{
      res.status(404).json(err);
    })
  } 
  catch (error) {
    console.log("chat controller 166",error)
  }
})

const blockChat = asyncHandler(async (req,res)=>{
  let {selectedChat} = req.body;
  try {
    Chat.findByIdAndUpdate(selectedChat._id,{$set:{
      status:"blocked"
    }})
    .then((response)=>{
      console.log("Chat status updated successfull \n",response)
      res.json(response.data)
    })
    .catch((error)=>{
      console.log("An error occurred while updating chat status \n",error)
      res.status(404).json(error)
    })
  } 
  catch (error) {
    
  }
})

module.exports = { accessChat, fetchChats,updateUnRead, getUnReadCount,incrementChat,reportChat, blockChat};
