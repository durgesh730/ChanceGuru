import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";
import ChatContext from "./chat-context";


const ChatProvider = (props) => {
  const [user, setUser] = useState();
  const [chats, setChats] = useState([]);

  const [selectedChat, setSelectedChat] = useState();

  const {chatUnReadCount,setChatUnReadCount,socket,setSocket, typing,setTyping} = useContext(AuthContext)

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("login"));
    user.token = localStorage.getItem("token");
    setUser(user);


    if (!user) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);
  useEffect(()=>{
    // if(chats && chats.length > 0){
      console.log("ChatProvider 28 :",chats)
      // localStorage.setItem("userChats",JSON.stringify(chats))
    // }
  },[chats])

  
  
  //console.log(chats, 'chats context')
  return (
    <div>
      <ChatContext.Provider
        value={{
          user,
          setUser,
          selectedChat,
          setSelectedChat,
          chats,
          setChats,
          chatUnReadCount,
          setChatUnReadCount,
          socket,setSocket,
          typing,setTyping
        }}
      >
        {props.children}
      </ChatContext.Provider>
    </div>
  );
};

export default ChatProvider;
