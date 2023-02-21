import React, { useContext } from "react";


import ChatContext from "../Context/chat-context";
import userImg from "../../assets/images/kamal.jpeg";

const ScrollableChat1 = ({ messages }) => {
  const { user } = useContext(ChatContext);

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
              <img src={userImg} />
            </figure>
            <p>{message.content}</p>
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
