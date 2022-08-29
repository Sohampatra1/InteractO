import React from 'react'
import { Box, Text, Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { ChatState } from '../../Context/ChatProvider';

const UserListItem = ({ user, handleFunction }) => {
  return (
            <Box 
            onClick={handleFunction}
            cursor="pointer"
            bg="#E8E8E8"
            _hover={{
                // background: "#38B2AC",
                background: "black",
                color: "white",
            }}
            w="100%"
            display="flex"
            flexDirection='row'
            gap='5px'
            alignItems="center"
            color="black"
            px={3}
            py={2}
            mb={2}
            borderRadius="lg"
            >
            <Avatar
                mr={2}
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
            />
            <Box>
                <Text>{user.name}</Text>
                <Text fontSize="xs">
                <b>Email : </b>
                {user.email}
                </Text>
            </Box>
            </Box>
        )
}

export default UserListItem