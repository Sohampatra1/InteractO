import React from 'react'
import { useState ,useRef } from 'react'
import { Text, Stack, HStack, VStack, FormControl, FormLabel, Input, InputGroup, InputRightAddon, InputRightElement, Button, useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { SERVER_URI } from '../../config/backend-url'
import axios from 'axios';

const Login = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();


    function passwordVisibiltyHandler() {
        if(passwordVisible) {
            setPasswordVisible(false);
        }
        else setPasswordVisible(true);
    }

    async function loginHandler() {
        setLoading(true);
        if(!email || !password) {
            toast({
                title: 'Please fill all the fields',
                status: 'warning',
                duration: 9000,
                isClosable: true,
                position: 'top'
              });
              setLoading(false);
              return;
        }

        try {
            const config = {
                headers: {
                    "Content-type":"application/json",
                }, 
            };

            const { data } = await axios.post(`${SERVER_URI}/api/user/login`, { email, password }, config);

            toast ({
                title: 'Login Successful',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'top'
            })

            localStorage.setItem('userInfo', JSON.stringify(data));
            setLoading(false);
            navigate('/chats');
        }

        catch(error) {
            toast ({
                title: 'Error Occured!',
                description: error.response.data.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top'
            })

            setLoading(false);
        }

        setLoading(false);

    }


  return (
    <VStack spacing='7px'>

        <FormControl id='email' isRequired>
            <FormLabel>Email</FormLabel>
            <Input type='email' value={email} placeholder='Enter your email' autoComplete='off' onChange={(e) => {
                setEmail(e.target.value)
            }} />
        </FormControl>

        <FormControl id='password' isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
                <Input type={passwordVisible ? 'text' : 'password'} value={password} placeholder='Enter your password' autoComplete='off' onChange={(e) => {
                    setPassword(e.target.value) 
                }}/>
                <InputRightElement width='4.5rem' paddingRight='0.05rem' >
                    <Button height='2.35rem' width='4.75rem' onClick={passwordVisibiltyHandler}>{passwordVisible === true ? "Hide" : "Show"}</Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>

         
        <Button colorScheme='blue' width='100%' style={{marginTop: 15 }} onClick={loginHandler} isLoading={loading}>
            Login
        </Button>
        <Button colorScheme='red' width='100%' style={{marginTop: 15 }} 
        onClick={() => {
            setEmail('guest@example.com');
            setPassword('123456');
        }}>
            Get Guest User Credentials
        </Button>
    </VStack>
  )
}

export default Login