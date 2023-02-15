import React, { useEffect, useState, useContext } from "react";
import { CiSearch } from "react-icons/ci";
import userImg from "../../assets/images/kamal.jpeg";

import axios from "axios";
import ChatContext from "../Context/chat-context";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";

const MyChats1 = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } =
    useContext(ChatContext);
  //const {getSender}=useHelper();

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };

      const { data } = await axios.get(
        "http://localhost:5000/api/chat",
        config
      );
      setChats(data);
      console.log(data, "fetching all users chats in my chats");
    } catch (error) {
      console.log(error.message);
    }
  };
  // console.log(selectedChat, user, chats)

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("login"))); //chatLogics
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);
  //fetching chats again witht the updated list of all of our chats...
  //--when we leave a group our updated list of chats needs to be fetched again

  const [activeChat, setactiveChat] = useState(0);

  return (
    <>
      <div className="myChat_main col-lg-3">
        <div className="myChat">
          <div className="searchChat">
            <CiSearch className="search_icon" />
            <input type="text" placeHolder="search"></input>
          </div>
          {chats ? (
            chats.map((chat, i) => (
              <div
                onClick={() => (setSelectedChat(chat), setactiveChat(i))}
                className={
                  activeChat === i ? "active_userChat userChat" : "userChat"
                }
              >
                <figure>
                  <img src={userImg} />
                </figure>
                <div>
                  <h6>{getSender(loggedUser, chat.users)}</h6>
                  <p>In this respect, your platform shou…</p>
                </div>
              </div>
            ))
          ) : (
            <ChatLoading />
          )}
        </div>
      </div>
    </>
  );
};

export default MyChats1;
