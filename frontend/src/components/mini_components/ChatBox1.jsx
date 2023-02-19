import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";

import { Box, Text } from "@chakra-ui/layout";

import userImg from "../../assets/images/kamal.jpeg";
import { BsThreeDotsVertical } from "react-icons/bs";

import { CheckboxGroup, IconButton, Spinner, useToast } from "@chakra-ui/react";
import { getSender, getSenderFull } from "../config/ChatLogics";
//import { useHelper } from '../config/helper-hook';
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ProfileModal from "../miscellaneous/ProfileModal";
import ScrollableChat from "./ScrollableChat";

import ChatContext from "../Context/chat-context";
import Lottie from "react-lottie";
import animationData from "../../animations/typing.json";

import io from "socket.io-client";
import ScrollableChat1 from "./ScrollableChat1";
import { Link } from "react-router-dom";

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

    const toast = useToast();
    const { selectedChat, setSelectedChat, user, notification, setNotification } = useContext(ChatContext);
    // console.log(selectedChat, "selectedChat in chatBox");

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const fetchMessages = async () => {
        if (!selectedChat) return;

        try {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` },
            };

            setLoading(true);

            const { data } = await axios.get(`http://localhost:5000/api/message/${selectedChat._id}`, config);

            setMessages(data);
            setLoading(false);
            //   console.log(data, "fetched messsages of the selected chat data");

            socket.emit("join chat", selectedChat._id);
        } catch (error) {
            //   console.log(error.message);
            toast({
                title: "Error Occured!",
                description: "Failed to Load the Messages",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
        }
    };

    const sendMessage = async (event) => {
        if (event.key === "Enter" && newMessage) {
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
                
                setMessages(messages => [...messages, data]);
                // console.log(data, "sent message response data");
            } catch (error) {
                // console.log(error.message);
                toast({
                    title: "Error Occured!",
                    description: "Failed to send the Message",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "bottom",
                });
            }
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
            if (!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat) {
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
            socket.off("message_recieved")
        });
    },[socket]);

    useEffect(() => {
        var objDiv = document.querySelector(".msg_Div");
        if (objDiv) {
            objDiv.scrollTop = objDiv.scrollHeight;
        }
        console.log(objDiv);
    }, [loading]);

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

    return (
        <>
            {selectedChat ? (
                <div className="chatBox_main col-lg-9">
                    <div className="cb_top">
                        <div className="d-flex align-items-center justify-content-between w-100 ">
                            <div className="cb_textDiv">
                                <h6> {getSender(user, selectedChat.users)}</h6>
                                { istyping && <p>typing…</p>}
                            </div>

                            <div className="dots_div">
                                <span onClick={toggleProfileOptions}>
                                    <BsThreeDotsVertical className="text-light" />
                                </span>
                                <div id="chatOption">
                                    <ul>
                                        <li>Delete Chat</li>
                                        <li>Block {getSender(user, selectedChat.users)}</li>
                                        <li>Report {getSender(user, selectedChat.users)}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="cb_bottom">
                        {loading ? (
                            <Spinner size="xl" w={20} h={20} alignSelf="center" margin="auto" />
                        ) : (
                            <div className="msg_Div" ref={msgDiv}>
                                <ScrollableChat1 messages={messages} />
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

                        <div className="cb_msgSend" onKeyDown={sendMessage} id="first-name" mt={3}>
                            <input
                                type="text"
                                placeholder="Enter a message.."
                                value={newMessage}
                                onChange={typingHandler}
                            />
                            <button>Send</button>
                        </div>
                    </div>
                </div>
            ) : (
                <Box d="flex" alignItems="center" justifyContent="center" h="100%">
                    <Text fontSize="3xl" pb={3} fontFamily="Work sans">
                        Click on a user to start chatting
                    </Text>
                </Box>
            )}
        </>
    );
};

export default ChatBox1;
