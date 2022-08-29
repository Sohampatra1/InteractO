import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    IconButton,
    Image,
    Text
  } from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons'



const ProfileModal = ( {user, children} ) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
        {children ? ( <span onClick={onOpen}>{children}</span> ) : 
        (
            <IconButton display={{base: "flex"}} icon={<ViewIcon />} onClick={onOpen} />
        )}

        <Modal size='lg' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize='30px' fontFamily='work sans' display='flex' justifyContent='center' alignItems='center'>{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody display='flex' flexDirection='column' justifyContent='center' alignItems='center' p={7}>
            <Image borderRadius='full' boxSize='250px' src={user.pic} alt={user.name} />
            <Text paddingTop={5} fontFamily='work sans' fontSize='17px'>{user.email}</Text> 
          </ModalBody>

          <ModalFooter display='flex' justifyContent='center'>
            <Button colorScheme='red' mr={3} onClick={onClose} fontFamily='work sans'>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ProfileModal