import React, { useState, useContext } from "react";
import Topbar from "./mini_components/Topbar";
import MyChats1 from "./mini_components/MyChats1";
import ChatContext from "./Context/chat-context";
import ChatBox1 from "./mini_components/ChatBox1";
import { BsThreeDotsVertical } from "react-icons/bs";


const ChatPage1 = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = useContext(ChatContext);

  const [toggleSideNav, settoggleSideNav] = useState(false)

  const handleSideNavbar = () => {
    if (toggleSideNav) {
      settoggleSideNav(false);
      // document.querySelector(".side_chat").style.display = "block"
      document.querySelector(".side_chat").style.width = "60%"

    }
    else {
      settoggleSideNav(true)
      // document.querySelector(".side_chat").style.display = "none"
      document.querySelector(".side_chat").style.width = "0"

    }
  }

  return (
    <>
      <Topbar />

      <div className="chat_page container-fluid">
        <h4>Messages</h4>
        <div>
          <span className="navSideToggle" onClick={handleSideNavbar}><BsThreeDotsVertical />
          </span>
        </div>

        <div className="side_chat">
          {user && <MyChats1 fetchAgain={fetchAgain} />}
        </div>

        <div className="row">
          <div className="side_toggle_chat  col-lg-3">

            {user && <MyChats1 fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
          </div>

          {user && (
            <ChatBox1 fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          )}
        </div>
      </div>
    </>
  );
};

export default ChatPage1;
