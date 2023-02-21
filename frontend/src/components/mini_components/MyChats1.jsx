import React, { useEffect, useState, useContext } from "react";
import { CiSearch } from "react-icons/ci";
import userImg from "../../assets/images/kamal.jpeg";

import axios from "axios";
import ChatContext from "../Context/chat-context";
import { getSender } from "../config/ChatLogics";


import UserListItem from "../userAvatar/UserListItem";

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

  // ====================merging side drawer page===============================
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);





  

  

  const handleSearch = async (searchValue) => {
    console.log(searchValue);
    if (!searchValue) {
      // toast({
      //   title: "Please Enter something in search",
      //   status: "warning",
      //   duration: 3000,
      //   isClosable: true,
      //   position: "top-left",
      // });
      return;
    }
    console.log(searchResult);

    try {
      setLoading(true);

      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      console.log(config, user);

      const { data } = await axios.get(
        `http://localhost:5000/api/user?search=${searchValue}`,
        config
      );

      setLoading(false);
      setSearchResult(data);

      //console.log(data, 'searchQuerry keyword response data');
    } catch (error) {
      console.log(error.message);
      
    }
  };

  function handleInputChange(e) {
    setSearch(e.target.value);
    if (e.target.value !== "") {
      handleSearch(e.target.value);
    } else {
      setSearchResult([]);
    }
  }

  const accessChatCreateChat = async (userId) => {
    //console.log(userId); id of selected user

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `http://localhost:5000/api/chat`,
        { userId },
        config
      );

      if (!chats.find((chat) => chat._id === data._id))
        setChats([data, ...chats]);
      //already existing check clause //newly created chat above the rest

      setSelectedChat(data);

      console.log(data, "access new/existing chat response data");

      setLoadingChat(false);
      
    } catch (error) {
      console.log(error.message);
      
    }
  };

  return (
    <>
      <div className="myChat_main col-lg-3">
        <div className="myChat">
          <div className="searchChat">
            <CiSearch className="search_icon" />
            <input
              type="text"
              placeHolder="search"
              value={search}
              onChange={(e) => handleInputChange(e)}
            ></input>
            {/* {user && <SideDrawer />} */}
          </div>
          <div
            className="myChat_users"
            onClick={() => {
              setSearchResult([]);
              setSearch("");
            }}
          >
            {loading ? (
              <h3>Loading...</h3>
            ) : (
              searchResult?.map(
                (
                  user //user clicked on for chat
                ) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => accessChatCreateChat(user._id)}
                  />
                )
              )
            )}
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
              <h3>Loading....</h3>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyChats1;