import React, { useState, useContext } from "react";
import Topbar from "./mini_components/Topbar";
import MyChats1 from "./mini_components/MyChats1";
import ChatContext from "./Context/chat-context";
import ChatBox1 from "./mini_components/ChatBox1";
import server from "./server";

const ChatPage1 = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = useContext(ChatContext);

  return (
    <>
      <Topbar />

      <div className="chat_page container-fluid">
        <h4>Messages</h4>
        <div className="row">
          {user && <MyChats1 fetchAgain={fetchAgain} />}
          {user && (
            <ChatBox1 fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          )}
        </div>
      </div>
    </>
  );
};

export default ChatPage1;
