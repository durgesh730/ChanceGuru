import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatContext from "../Context/chat-context";
import ProfileModal from "./ProfileModal";
import { useDisclosure } from "@chakra-ui/hooks";
import { Box, Text } from "@chakra-ui/layout";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { Button } from "@chakra-ui/button";
import { Tooltip } from "@chakra-ui/tooltip";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import { Input, Spinner } from "@chakra-ui/react";
import ChatLoading from "../mini_components/ChatLoading";
import UserListItem from "../userAvatar/UserListItem";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { getSender } from "../config/ChatLogics";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const {
    user,
    setSelectedChat,
    chats,
    setChats,
    notification,
    setNotification,
  } = useContext(ChatContext);

  const navigate = useNavigate();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const logoutHandler = () => {
    localStorage.removeItem("userInformation");
    navigate("/");
  };

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
      //console.log(data, 'searchQuerry keyword response data');

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      console.log(error.message);
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  function handleInputChange(e) {
    setSearch(e.target.value);
    handleSearch(e.target.value);
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
      onClose(); //drawer close afterwards
    } catch (error) {
      console.log(error.message);
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <React.Fragment>
      <Button
        variant="ghost"
        bg="blue.700"
        onClick={onOpen}
        color="white"
        _hover={{ background: "purple.800", color: "yellow.400" }}
        _active={{ background: "purple.800", color: "yellow.400" }}
      >
        <i className="fas fa-search"></i>
        <Text d={{ base: "none", md: "flex" }} px={4} fontWeight="bold">
          Search User
        </Text>
      </Button>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box d="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => handleInputChange(e)}
              />
              {/* <Button onClick={handleSearch}>Go</Button> */}
            </Box>
            {loading ? (
              <ChatLoading />
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
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </React.Fragment>
  );
};

export default SideDrawer;
