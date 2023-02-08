import React, { useState, useContext } from "react";
import ChatContext from "./Context/chat-context";
import MyChats from './mini_components/MyChats';
import ChatBox from './mini_components/ChatBox';
import SideDrawer from '../components/miscellaneous/SideDrawer';
import { Box } from '@chakra-ui/react';

import Topbar from "./mini_components/Topbar"

const ChatPage = () => {
    const [fetchAgain, setFetchAgain] = useState(false);
    const { user } = useContext(ChatContext);

    /*  const navigate = useNavigate();
    const isRefreshingRef = useIsRefreshingRef() */

    //navigate('/chats');

    return (
        
            <>
            <Topbar/>
            <div style={{ width: "100%" }}>

                {user && <SideDrawer />}
                <Box d="flex" style={{display:"flex"}} justifyContent="space-between" width="100%" h="90.5vh" p="12px">
                    {user && <MyChats fetchAgain={fetchAgain} />}
                    {user && (<ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />)}
                </Box>
            </div>
            </>
        
    );
};

export default ChatPage;
