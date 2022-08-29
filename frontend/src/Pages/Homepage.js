import React, { useEffect } from 'react'
import Login from '../components/Auth/Login'
import Signup from '../components/Auth/Signup'
import { Container, Box, Text, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
const Homepage = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if(user) {
      navigate("/chats");
    }
  }, [navigate])

  return (
    <Container maxWidth="xl" centerContent>
        <Box display='flex' justifyContent='center' alignItems='center' p={3} background='white' width='100%' margin='40px 0 15px 0' borderRadius='lg' borderWidth='1px'>
          <Text fontSize='5xl' fontFamily='work sans'>InteractO</Text>
        </Box>
        <Box background='white' width='100%' borderRadius='lg' borderWidth='1px' fontFamily='work sans'>
          <Tabs isFitted variant='enclosed'>
            <TabList>
              <Tab fontSize='xl'>Login</Tab>
              <Tab fontSize='xl'>Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
    </Container>
  )
}

export default Homepage