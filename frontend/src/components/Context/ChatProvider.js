import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatContext from "./chat-context";

const ChatProvider = (props) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [notification, setNotification] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    
    const user = JSON.parse(localStorage.getItem("login"));
    user.token = localStorage.getItem("token");
    setUser(user);

    if (!user) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

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
          notification,
          setNotification,
        }}
      >
        {props.children}
      </ChatContext.Provider>
    </div>
  );
};

export default ChatProvider;