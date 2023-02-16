import React from "react";
import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";
import userImg from "../../assets/images/kamal.jpeg";

const UserListItem = ({ user, handleFunction }) => {
  //user !notLoggedIn //selected to chat userId
  //const { user } = ChatState();

  return (
    // <Box
    //   onClick={handleFunction}
    //   cursor="pointer"
    //   bg="#E8E8E8"
    //   _hover={{
    //     background: "#38B2AC",
    //     color: "white",
    //   }}
    //   w="100%"
    //   d="flex"
    //   alignItems="center"
    //   color="black"
    //   px={3}
    //   py={2}
    //   mb={2}
    //   borderRadius="lg"
    // >
    //   <Avatar mr={2} size="sm" cursor="pointer" name={user.username}/>
    //   <Box>
    //     <Text>{user.username}</Text>
    //     <Text fontSize="xs"> <b>Email : </b> {user.email} </Text>
    //   </Box>
    // </Box>
    <div
      onClick={handleFunction}
      className="userChat searchedChat"
      // className={activeChat === i ? "active_userChat userChat searchedChat" : "userChat searchedChat"}
    >
      <figure>
        <img src={userImg} />
      </figure>
      <div>
        <h6>{user.username}</h6>
        <p>
          <b>Email : </b> {user.email}
        </p>
      </div>
    </div>
  );
};

export default UserListItem;
