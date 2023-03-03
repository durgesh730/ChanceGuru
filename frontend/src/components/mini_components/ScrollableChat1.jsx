import React, { useContext } from "react";

import ChatContext from "../Context/chat-context";
import { getSenderLink } from "../config/ChatLogics";
import profile from "../../assets/icons/profile1.svg";
import { BsCheckAll } from 'react-icons/bs';



const ScrollableChat1 = ({ messages, loggedUser }) => {
  const { user, selectedChat } = useContext(ChatContext);

  // console.log("messages", messages[0].chat.users);
  // console.log("selectedChatChatspage", selectedChat.users);
  // console.log("loggedin", loggedUser)
  // console.log(getSenderLink(loggedUser, selectedChat.users))

  return (
    <>
      {messages &&
        messages.map((message, i) => (
          <div
            className={
              message.sender._id === user._id ? "cb_chats_msg2" : "cb_chats_msg"
            }
          >
            <figure>

              <img src={
                message.sender._id === user._id ?
                  loggedUser.link : selectedChat.users[1]["link"] === undefined ? profile :
                    getSenderLink(loggedUser, selectedChat.users)
              }
              />
            </figure>
            <p>{message.content}
              {message.sender._id === user._id ?
                <BsCheckAll />
                : ""}
            </p>
          </div>
        ))}

      {/* <div className="cb_chats_msg2">
          <figure>
            <img src={userImg} />
          </figure>
          <p>
            Hey, guys! I am a founder of VR Production. I’m here to share my new
            script with you, and get your valuable opinions.
          </p>
        </div> */}
    </>
  );
};

export default ScrollableChat1;
