import React, { useEffect, useState, useContext } from "react";
import { CiSearch } from "react-icons/ci";
import userImg from "../../assets/images/kamal.jpeg";


import axios from "axios";
import ChatContext from "../Context/chat-context";
import { getSender, getSenderLink } from "../config/ChatLogics";

import UserListItem from "../userAvatar/UserListItem";
import profile from "../../assets/icons/profile1.svg";
import server from '../server';

const MyChats1 = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats, chatUnReadCount,setChatUnReadCount, socket } =
    useContext(ChatContext);
  //const {getSender}=useHelper();
  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };

      const { data } = await axios.get(
        `${server}/api/chat`,
        config
      );
      console.log("Mychats 31 Fetch Chats:",data)
      setChats(data);

      console.log(data, "fetching all users chats in my chats");
    } catch (error) {
      console.log(error.message);
    }
  };

  //adding first chat
  // console.log(selectedChat, user, chats)

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("login"))); //chatLogics
    let localChats = JSON.parse(localStorage.getItem("userChats"))
    if(!localChats || localChats.length <= 0){

      fetchChats();
    }
    else{
      setChats(localChats)
    }
    // eslint-disable-next-line
  }, [fetchAgain]);
  //fetching chats again witht the updated list of all of our chats...
  //--when we leave a group our updated list of chats needs to be fetched again

  const [activeChat, setactiveChat] = useState();

  // ====================merging side drawer page===============================
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const handleSearch = async (searchValue) => {
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

    try {
      setLoading(true);

      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };

      const { data } = await axios.get(
        `${server}/api/user?search=${searchValue}`,
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
  // setSelectedChat(chats[0]);

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
        `${server}/api/chat`,
        { userId },
        config
      );

      if (!chats.find((chat) => chat._id === data._id))
        setChats([data, ...chats]);
      //already existing check clause //newly created chat above the rest

      setSelectedChat(data);
      setactiveChat(0)

      console.log(data, "access new/existing chat response data");

      setLoadingChat(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    setSelectedChat(chats[0]);

    console.log(chats);
  }, []);
  
  // console.log("chats", getSender(loggedUser, chats[5].users));
  // console.log("chats", chats[5].users[1].link);

  const updateUnReadCount = (localChats) => {
    if (localChats && localChats.length > 0) {
      localChats.map(async (item) => {
        // console.log(item)
          try {
            const config = {
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
            };
            await axios.put(
              `http://localhost:5000/api/chat/updateUnreadCount`,
              { item },
              config
            )
              .then((response) => {
                console.log("The response from Mychats 167:\n",response)
              });

          } catch (error) {
            console.log("The response from topbar65:\n",error.message);
          }
        }
      )
    }
  }

  useEffect(() => {
    socket.on("updateChat",(chat)=>{
      console.log("Mychats1 180\n",chat)
      let indexCheck;
      let newchats = chats.map((c,i)=>{
        if(c._id == chat._id){
          indexCheck = i
          c.unreadCount = 0
          c.unReadBy = chat.users[0]._id == chat.latestMessage.sender._id?chat.users[1]:chats.users[0]
        }
        return c
      })
      console.log(newchats[indexCheck])
      console.log("Mychats1 190")
      setChats(newchats)
    })
  
    
  })
  

  function handleChatClick(chat, i){
    setSelectedChat(chat);
    setactiveChat(i)
    let unreadOfThis = chats[i].unreadCount
    let newChats = [...chats]
    console.log("Mychat1 183 setting chat unread count:\n",newChats[i],unreadOfThis)
    if(chatUnReadCount > 0){

      setChatUnReadCount((prev) => {
        console.log(prev)
        console.log(prev - unreadOfThis)
        return (prev - unreadOfThis)
      })
      newChats[i].unreadCount = 0
      setChats(newChats)
    }

    socket.emit("updateYourchat",chat,user)
    

    updateUnReadCount([chat])
  }

  return (
    <>
      <div className="myChat_main">

        <div className="myChat">
          <div className="searchChat">
            <CiSearch className="search_icon" />
            <input
              type="text"
              placeholder="search"
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
              chats.map((chat, i) => {
                
                return(
                <div
                key={i}
                  onClick={() => {handleChatClick(chat,i)}}
                  className={
                    activeChat === i ? "active_userChat userChat" : "userChat"
                  }
                >
                  <figure>
                    <img
                      src={
                        chat.users[1]["link"] === undefined
                          ? profile
                          : getSenderLink(loggedUser, chat.users)
                      }
                    />
                  </figure>
                  <div className="w-100">
                    <div className="user_unseenDiv">
                      <h6>{getSender(loggedUser, chat.users)} </h6>
                      {
                        chat.unReadBy && (chat.unReadBy._id == user._id) &&
                      <span style={
                        chat.unreadCount === 0 ? { display: "none" } : { display: "grid" }} > {chat.unreadCount} 
                      </span>
                      }
                    </div>
                    <p>
                      {chat["latestMessage"] === undefined
                        ? ""
                        : chat.latestMessage.content.length > 45
                          ? chat.latestMessage.content.substring(0, 45) + "..."
                          : chat.latestMessage.content}
                    </p>
                  </div>

                </div>
                )
              })
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
