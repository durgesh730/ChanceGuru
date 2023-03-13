import { BsThreeDotsVertical } from "react-icons/bs";

import { getSender, getSenderFull } from "../config/ChatLogics";
//import { useHelper } from '../config/helper-hook';
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import server from '../server';

import ChatContext from "../Context/chat-context";

import ScrollableChat1 from "./ScrollableChat1";
import Picker from "emoji-picker-react";
import emojiIcon from "../../assets/icons/emoji.png";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import AuthContext from "../AuthContext";
const ENDPOINT = `${server}`; //development
var selectedChatCompare;


const ChatBox1 = ({ fetchAgain, setFetchAgain }) => {
  let [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const [amItyping, setAmITyping] = useState(false);
  
  const [loadingChat, setLoadingChat] = useState(false);
  const [reportModal, setReportModal] = useState(0);
  const [loggedUser, setLoggedUser] = useState();


  const auth = useContext(AuthContext)

 
  
  const {
    selectedChat,
    setSelectedChat,
    user,
    chats,
    setChats,
    chatUnReadCount,setChatUnReadCount,
    socket,socketConnected,
    typing,setTyping
  } = useContext(ChatContext);
  // console.log(selectedChat, "selectedChat in chatBox");

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };

      setLoading(true);

      const { data } = await axios.get(
        `${server}/api/message/${selectedChat._id}`,
        config
      );

      setMessages(data);
      setLoading(false);
      //   console.log(data, "fetched messsages of the selected chat data");

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      console.log(error.message);
    }
  };

  const sendMessage = async (event) => {
    let chat = selectedChat
    console.log("chatbox1 75: ",chat,selectedChat)
    chat.unReadBy = chat.users[0]._id == user._id ? chat.users[1]:chat.users[0]
    if (newMessage) {
      socket.emit("stop typing", selectedChat._id);

      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        //async func -- wont make newMessage empty instantaneously
        //ui enhancement -- input to be empty as soon as we hit ender/send
        setNewMessage("");

        const { data } = await axios.post(
          `${server}/api/message`,
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );

        //setNewMessage("");
        data.users = selectedChat.users;
        data.chat = selectedChat;
        // console.log("Emit new message data: ", data);
        socket.emit("new_message", chat, data);

        setMessages((messages) => [...messages, data]);
        // console.log(data, "sent message response data");
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  const sendMessageByEnter = (e) => {
    if (e.key === "Enter" && newMessage) {
      sendMessage();
    }
  };

  

  useEffect(() => {
    fetchMessages();
    //whwnever selctedChat changes, fetchAllMessages again for new selectedChat._id

    //just to keep a track
    console.log("ChatBox 126 SelectedChat:",selectedChat)
    selectedChatCompare = selectedChat;

    // eslint-disable-next-line
  }, [selectedChat]);

  //console.log(notification, 'notification Bellicon');

  const updateUnReadCount = (localChats) => {
    if(window.location.pathname == "/chat"){

    if (localChats && localChats.length > 0) {
      localChats.map(async (item) => {
        console.log(item)
          try {
            const config = {
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
            };
            await axios.put(
              `${server}/api/chat/updateUnreadCount`,
              { item },
              config
            )
              .then((response) => {
                console.log("The response from ChatBox150:\n",response)
              });

          } catch (error) {
            console.log("The response from topbar65:\n",error.message);
          }
        }
      )
    }
  }

  }

  useEffect(() => {
    socket.off("message_recieved").on("message_recieved", (newMessageRecieved) => {
      console.log("New message",newMessageRecieved)
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        // if chat is not selected or doesn't match current chat
        newMessageRecieved.chat.unreadCount++
        let newChats = chats.map((item,i)=>{
          if(item._id == newMessageRecieved.chat._id){
            item.unReadBy = newMessageRecieved.chat.unReadBy
            item.unreadCount += 1

            setChatUnReadCount(item.unreadCount)
            updateUnReadCount([item])
            console.log("Item Changed",item)
          }
          return item
        })
        console.log(newChats)
        setChats(newChats)
      } else {
        setMessages((messages) => [...messages, newMessageRecieved]);
      }
    });
  });

  useEffect(() => {
    socket.on("typing", (room) => {
      setTyping(true)
    });
    socket.on("stop typing", (room) => setTyping(false));
    
  }, [])
  

  useEffect(() => {
    var objDiv = document.querySelector(".msg_Div");
    if (objDiv) {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  }, [loading, messages]);

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    setAmITyping(true);
    //typing animation code
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }

    //debounce/throttle function
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;

    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
        setAmITyping(false)
      }
    }, timerLength);
  };
  //   console.log(messages);

  const msgDiv = useRef("");

  useEffect(() => {
    // msgDiv.current.scrollTop = msgDiv.current.scrollHeight;
    // msgDiv.current.lastElementChild.scrollIntoView();
    // console.log(msgDiv.current);
  }, [selectedChat]);

  //   msgDiv.scrollTop = msgDiv.scrollHeight;

  const [dots, setdots] = useState(1);

  function toggleProfileOptions() {
    if (dots === 0) {
      setdots(1);
      document.getElementById("chatOption").style.height = "125px";
      document.getElementById("chatOption").style.display = "none";
    } else {
      setdots(0);
      document.getElementById("chatOption").style.height = "0px";
      document.getElementById("chatOption").style.display = "block";
    }
  }

  const deleteChat = async (userId) => {
    // try {
    //   setLoadingChat(true);
    //   const config = {
    //     headers: {
    //       "Content-type": "application/json",
    //       Authorization: `Bearer ${user.token}`,
    //     },
    //   };
    //   const { data } = await axios.delete(
    //     `${server}/api/chat`,
    //     { userId },
    //     config
    //   );

    //   if (!chats.find((chat) => chat._id === data._id))
    //     setChats([data, ...chats]);
    //   //already existing check clause //newly created chat above the rest

    //   setSelectedChat(data);

    //   console.log(data, "access new/existing chat response data");

    //   setLoadingChat(false);
    // } catch (error) {
    //   console.log(error.message);
    // }

    console.log("deleting", userId);
    const newChat = chats.filter((chat) => {
      return chat._id !== userId;
    });
    setChats(newChat);
  };

  const reportChat = () => {
    setReportModal(1);
  };

  // console.log("SelectedUser", selectedChat);

  const [showPicker, setShowPicker] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    setNewMessage((prevInput) => prevInput + emojiObject.emoji);
    setShowPicker(false);
  };


  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("login")));
  }, [fetchAgain]);

  const handleReportChat = async(e) =>{
    e.preventDefault()
    let txtArea = e.target.querySelector("#reportInputTxt")
    let users = selectedChat.users
    let anotherUser = users[0]._id == user._id ? users[1] : users[0]
    

    let reportData = {
      reportee: user._id,
      reported: anotherUser._id,
      message: txtArea.value
    }

    console.log(reportData)
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.post(
        `${server}/api/chat/reportChat`,
        {reportData,selectedChat},
        config
      )
        .then((response) => {
          console.log(response)
          setReportModal(0)
          let selectChat = selectedChat
          selectChat.status = "reported"
          setSelectedChat(selectChat)
        })
        .catch((err) => {
          console.log(err)
        });
    }
    catch (error) {
      console.log(error)

    }

  }
  return (
    <>
      {selectedChat ? (
        <div className="chatBox_main col-lg-9">
          <div className="cb_top">
            <div className="d-flex align-items-center justify-content-between w-100 ">
              <div className="cb_textDiv">
                <h6> {getSender(user, selectedChat.users)}</h6>
                {!amItyping && typing && <p>typing…</p>}
              </div>

              <div className="dots_div">
                <span onClick={toggleProfileOptions}>
                  <BsThreeDotsVertical className="text-light" />
                </span>
                <div id="chatOption">
                  <ul>
                    <li onClick={() => deleteChat(selectedChat._id)}>
                      Delete Chat
                    </li>
                    {selectedChat.status != "blocked" &&<li>Block {getSender(user, selectedChat.users)}</li>}
                    {selectedChat.status != "reported" &&<li onClick={reportChat}>
                      Report {getSender(user, selectedChat.users)}
                    </li>}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="cb_bottom">
            {loading ? (
              <h5>Loading.......</h5>
            ) : (
              <div className="msg_Div" ref={msgDiv}>
                <ScrollableChat1 messages={messages} loggedUser={loggedUser} />
              </div>
            )}

            {/* <div className="cb_chats_main">
              <div className="cb_chats_msg">
                <figure>
                  <img src={userImg} />
                </figure>
                <p>
                  Hey, guys! I am a founder of VR Production. I’m here to share
                  my new script with you, and get your valuable opinions.
                </p>
              </div>
              <div className="cb_chats_msg2">
                <figure>
                  <img src={userImg} />
                </figure>
                <p>
                  Hey, guys! I am a founder of VR Production. I’m here to share
                  my new script with you, and get your valuable opinions.
                </p>
              </div>
            </div>
               */}

            
              <div
                className="cb_msgSend"
                onKeyDown={sendMessageByEnter}
                id="first-name"
                mt={3}
              >
                {(selectedChat.status == "")? 
                <><input
                  type="text"
                  placeholder="Enter a message.."
                  value={newMessage}
                  onChange={typingHandler}
                />

                <MdOutlineEmojiEmotions
                  className="emoji-icon mx-2"
                  src={emojiIcon}
                  style={showPicker ? { color: "#8443e5" } : { color: "#9f9ec1" }}
                  onClick={() => setShowPicker((val) => !val)}
                />
                <div className="picker-container">
                  {showPicker && (
                    <Picker
                      pickerStyle={{ width: "100%" }}
                      onEmojiClick={onEmojiClick}
                    />
                  )}
                </div>

                <button onClick={sendMessage}>Send</button>
                </>
                :
                <p>You have {selectedChat.status} this user</p>
                }
              </div>
            
          </div>
        </div>
      ) : (
        <></>
      )}

      {reportModal == 1 && (
        <div className="userSub_modal my-4 ">
          <div className="modal_child d-flex justify-content-center px-3 shadow ">
            <div className="d-flex justify-content-start align-items-center m-3">
              <h1 className="purple_title m-0" style={{ fontSize: "30px" }}>
                Report User
              </h1>
            </div>
            <form onSubmit={handleReportChat}>
              <textarea 
                name="inputField" 
                placeholder="Why do you want to report this user"
                id="reportInputTxt" 
                cols="30" 
                rows="2"
                className="form-control text-area"
                required
                >

              </textarea>
              <div className="btns">
                <button onClick={(e) => {e.preventDefault();setReportModal(0)}}>Cancel</button>
                <button type="submit" >Report</button>
              </div>
            </form>
            
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBox1;
