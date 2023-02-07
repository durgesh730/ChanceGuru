import React, { useEffect, useState, useContext } from 'react';
import { Box, Stack, Text } from "@chakra-ui/layout";

import axios from "axios";
import ChatContext from "../Context/chat-context";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";

//import { useHelper } from '../config/helper-hook';

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } = useContext(ChatContext);
  //const {getSender}=useHelper();



  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };

      const { data } = await axios.get("http://localhost:5000/api/chat", config);
      setChats(data);
      console.log(data, 'fetching all users chats in my chats');

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

  return (
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >

        My Chats

      </Box>
      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat, i) => (

                <Box
                  onClick={() => setSelectedChat(chat)}
                  cursor="pointer"
                  bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                  color={selectedChat === chat ? "white" : "black"}
                  px={3}
                  py={2}
                  borderRadius="lg"
                  key={chat._id}
                >
                  <Text>
                    {getSender(loggedUser, chat.users)}
                  </Text>
                </Box>
              )
            )}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
