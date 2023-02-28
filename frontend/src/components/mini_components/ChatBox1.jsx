import { BsThreeDotsVertical } from "react-icons/bs";

import { getSender, getSenderFull } from "../config/ChatLogics";
//import { useHelper } from '../config/helper-hook';
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";

import ChatContext from "../Context/chat-context";

import io from "socket.io-client";
import ScrollableChat1 from "./ScrollableChat1";
import Picker from "emoji-picker-react";
import emojiIcon from "../../assets/icons/emoji.png";
import { MdOutlineEmojiEmotions } from "react-icons/md";
//const ENDPOINT = "http://localhost:5000"; //development
const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

const ChatBox1 = ({ fetchAgain, setFetchAgain }) => {
  let [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [reportModal, setReportModal] = useState(0);
  const [loggedUser, setLoggedUser] = useState();


  const {
    selectedChat,
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
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
        `http://localhost:5000/api/message/${selectedChat._id}`,
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
          "http://localhost:5000/api/message",
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );

        //setNewMessage("");
        data.users = selectedChat.users;
        // console.log("Emit new message data: ", data);
        socket.emit("new_message", selectedChat._id, data);

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
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchMessages();
    //whwnever selctedChat changes, fetchAllMessages again for new selectedChat._id

    //just to keep a track
    selectedChatCompare = selectedChat;

    // eslint-disable-next-line
  }, [selectedChat]);

  //console.log(notification, 'notification Bellicon');

  useEffect(() => {
    socket.on("message_recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat
      ) {
        // if chat is not selected or doesn't match current chat
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain); //updating our chats in our my chats on newMessageRecieved
          //   console.log(notification, "notification bell-icon check");
        }
      } else {
        console.log(newMessageRecieved);
        setMessages((messages) => [...messages, newMessageRecieved]);
      }
      socket.off("message_recieved");
    });
  }, [socket]);

  useEffect(() => {
    var objDiv = document.querySelector(".msg_Div");
    if (objDiv) {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
    console.log(objDiv);
  }, [loading, messages]);

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

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
      }
    }, timerLength);
  };
  //   console.log(messages);

  const msgDiv = useRef("");

  useEffect(() => {
    // msgDiv.current.scrollTop = msgDiv.current.scrollHeight;
    // msgDiv.current.lastElementChild.scrollIntoView();
    console.log(msgDiv.current);
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
    //     `http://localhost:5000/api/chat`,
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

  console.log("SelectedUser", selectedChat);

  const [showPicker, setShowPicker] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    setNewMessage((prevInput) => prevInput + emojiObject.emoji);
    setShowPicker(false);
  };


  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("login")));
  }, [fetchAgain]);

  return (
    <>
      {selectedChat ? (
        <div className="chatBox_main col-lg-9">
          <div className="cb_top">
            <div className="d-flex align-items-center justify-content-between w-100 ">
              <div className="cb_textDiv">
                <h6> {getSender(user, selectedChat.users)}</h6>
                {istyping && <p>typing…</p>}
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
                    <li>Block {getSender(user, selectedChat.users)}</li>
                    <li onClick={reportChat}>
                      Report {getSender(user, selectedChat.users)}
                    </li>
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
              <input
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
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      {reportModal == 1 && (
        <div className="userSub_modal my-4 ">
          <div className="modal_child d-flex justify-content-evenly px-3 shadow ">
            <div className="d-flex justify-content-start align-items-center m-3">
              <h1 className="purple_title m-0" style={{ fontSize: "30px" }}>
                Report User
              </h1>
            </div>

            <p>
              Are you sure,you want to Report this user? Most recent messages
              will be forwarded to Company{" "}
            </p>
            <div className="btns">
              <button onClick={() => setReportModal(0)}>Cancel</button>
              <button>Logout</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBox1;
