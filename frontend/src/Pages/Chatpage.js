import React, { useEffect, useState } from 'react'
import { ChatContext } from '../Context/ChatProvider'
import { ChatState } from '../Context/ChatProvider'
import { Container, Box, Text, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import axios from 'axios'
import SideDrawer from '../components/miscellaneous/SideDrawer'
import ChatBox from '../components/ChatBox'
import MyChats from '../components/myChats'

const ChatPage = () => {
    
  const {user} = ChatState();

  const [fetchAgain, setFetchAgain] = useState(false)

  // console.log(user);

  return (
    <div style={{width:'100%'}}>
      {user && <SideDrawer />}
      <Box display='flex' justifyContent='space-between' width='100%' height='89vh' padding='10px'>
        {user && <MyChats fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
      </Box>

    </div>
  )
}

export default ChatPage