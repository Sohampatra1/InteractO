// eslint-disable-next-line
import React, { useState } from 'react'
import { Container, Box, Text, Tabs, TabList, TabPanels, Tab, TabPanel, Tooltip, Button, Menu, MenuButton, MenuList, MenuItem, MenuItemOption, Avatar, useDisclosure, Input, Icon, Toast, useToast, Spinner} from '@chakra-ui/react'
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { ChatState } from '../../Context/ChatProvider'
import ProfileModal from './ProfileModal'
import { useNavigate } from 'react-router-dom'
import { Search2Icon } from '@chakra-ui/icons'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react'
import axios from 'axios'
import UserListItem from '../UserAvatar/UserListItem'
import ChatLoading from '../ChatLoading'
import { SERVER_URI } from '../../config/backend-url'


const DownIcon = () => {
    return (
        <i class="fa-solid fa-chevron-down"></i>
    )
}

const SideDrawer = () => {

    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState();

    const { isOpen, onOpen, onClose } = useDisclosure()


    const navigate = useNavigate();

    const { user, setSelectedChat, chats, setChats } = ChatState();
 

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        navigate("/");
    }

    const toast = useToast();

    const AccessChat = async (userId) => {
        try {
            setLoadingChat(true);

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.post(`${SERVER_URI}/api/chat`, { userId }, config);

            if(!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

            setSelectedChat(data);
            setLoadingChat(false);
            onClose();

        } catch(error) {
            toast({
                title: 'Error fetching the chat',
                description: 'error.message',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top',
            });
        }
    }

    const handleSearch = async () => {
        if(!search) {
            toast({
                title: 'Please enter something in search field',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'top',
            });

            return;
        }

        try {
            setLoading(true)

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };


            const { data } = await axios.get(`${SERVER_URI}/api/user?search=${search}`, config);

            setLoading(false);
            setSearchResult(data);

            console.log(data);

        } catch (error) { 
            toast({
                title: 'Error Occured!',
                description: 'Failed to load the search results',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top',
            })
        }
    }
 
  return (
    <>
        <Box display='flex' justifyContent='space-between' alignItems='center' background='white' width='100%' padding='5px 10px 5px 10px' borderWidth='5px'>
            <Tooltip label="Search users to chat" hasArrow placement='bottom'>
                <Button variant='ghost' gap='1rem' p={7} onClick={onOpen}>
                    <i class="fas fa-search fa-lg"></i>
                    <Text display={['none', 'none', 'flex']} fontSize='20px'>Search Users</Text>
                </Button>
            </Tooltip>

            <Text fontSize='30px' fontFamily='Work sans'>InteractO</Text>

            <div>
                <Menu>
                    <MenuButton as={Button} p={7} background='none' fontSize='20px'>
                        <BellIcon fontSize='2xl'/>
                    </MenuButton>
                </Menu>

                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />} p={7} background='none' fontSize='20px'>
                        <Avatar size='sm' cursor='pointer' name={user.name} />
                    </MenuButton>
                    <MenuList>
                        <ProfileModal user={user}>
                            <MenuItem>My Profile</MenuItem>
                        </ProfileModal>
                        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                    </MenuList>
                </Menu>
            </div>
        </Box>

        <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader>Search Users</DrawerHeader>
                <DrawerBody>
                    <Box display='flex' pb={2}>
                        <Input placeholder='Search user by name or email' mr={2} value={search} 
                        onChange={(e) => {
                            setSearch(e.target.value)
                        }} />
                        <Button onClick={handleSearch}><Search2Icon /></Button>
                        {/* {!loading ? (<Button onClick={handleSearch}><Search2Icon /></Button>)
                        : ( <Button isLoading onClick={handleSearch}></Button> ) } */}
                    </Box>
                    {loading ? (<ChatLoading />) : (
                        searchResult.length != 0 ? searchResult.map((user) => ( <UserListItem key={user._id} user={user}
                            handleFunction={() => {
                                AccessChat(user._id)
                            }} 
                            />
                        )) : <Box display='flex' flexDirection='row' gap='12px' width='80%' justifyContent='center' p={4}>
                                <Text fontSize='19px' fontFamily='work sans'>No</Text>
                                <Text fontSize='19px' fontFamily='work sans'>User</Text>
                                <Text fontSize='19px' fontFamily='work sans'>Found</Text>
                            </Box>
                    )}
                    {loadingChat && <Spinner ml='auto' display='flex' />}
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    </>
  )
}

export default SideDrawer