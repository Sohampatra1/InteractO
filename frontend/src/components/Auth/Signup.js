import React from 'react'
import { useState , useRef } from 'react'
import { Text, Stack, HStack, VStack, FormControl, FormLabel, Input, InputGroup, InputRightAddon, InputRightElement, Button, useToast } from '@chakra-ui/react'
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom'
import { SERVER_URI } from '../../config/backend-url'

const Signup = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [pic, setPic] = useState();
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const navigate = useNavigate();

    function passwordVisibiltyHandler() {
        if(passwordVisible) {
            setPasswordVisible(false);
        }
        else setPasswordVisible(true);
    }

    function confirmPasswordVisibiltyHandler() {
        if(confirmPasswordVisible) {
            setConfirmPasswordVisible(false);
        }
        else setConfirmPasswordVisible(true);
    }


    function postDetails(pics) {
        setLoading(true);
        if(pics === undefined) {
            toast({
                title: 'Please select an image',
                description: "Image selection invalid.",
                status: 'error',
                duration: 9000,
                isClosable: true,
              });
              return;
        }

        if(pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData(); // Cloudinary
            data.append("file", pics);
            data.append("upload_preset", "interacto");
            data.append("cloud_name", "do6znejec");
            fetch("https://api.cloudinary.com/v1_1/do6znejec/image/upload", {
                method: 'POST',
                body: data
            }).then((res) => {
                res.json()
            }).then((data) => {
                setPic(data.url.toString());
                setLoading(false);
            }).catch((err) => {
                console.log(err);
                setLoading(false);
            })
        }
        else {
            toast({
                title: 'Please select an image',
                description: "Image selection invalid.",
                status: 'warning',
                duration: 9000,
                isClosable: true,
              });
              setLoading(false);
              return;
        }
    }

    async function submitHandler() {
        setLoading(true);
        if(!name || !email || !password || !confirmPassword) {
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
        if(password !== confirmPassword) {
            toast({
                title: 'Passwords do not match',
                status: 'warning',
                duration: 9000,
                isClosable: true,
                position: 'top'
              });
              return;
              setLoading(false);
        }

        try {
            const config = {
                headers: {
                    "Content-type":"application/json",
                }, 
            };


            const { data } = await axios.post(`${SERVER_URI}/api/user`, {name, email, password, pic}, config);

            toast({
                title: 'Registration Successful',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'top'
            });

            localStorage.setItem('userInfo', JSON.stringify(data)); // store in local storage

            setLoading(false); // loading icon will stop

            navigate('/chats');
        } catch(error) {
            toast({
                title: 'Error Occured!',
                description: error.response.data.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top'
            });

            setLoading(false);
        }
    };
    


  return (
    <VStack spacing='7px'>
        
        <FormControl id='first-name' isRequired>
            <FormLabel>Name</FormLabel>
            <Input placeholder='Enter your name' onChange={(e) => {
                setName(e.target.value)
            }} autoComplete='off'/>
        </FormControl>

        <FormControl id='email' isRequired>
            <FormLabel>Email</FormLabel>
            <Input type='email' placeholder='Enter your email' autoComplete='off' onChange={(e) => {
                setEmail(e.target.value)
            }}/>
        </FormControl>

        <FormControl id='password' isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
                <Input type={passwordVisible ? 'text' : 'password'} placeholder='Enter your password' autoComplete='off' onChange={(e) => {
                    setPassword(e.target.value);
                }}/>
                <InputRightElement width='4.5rem' paddingRight='0.05rem' >
                    <Button height='2.35rem' width='4.75rem' onClick={passwordVisibiltyHandler}>{passwordVisible === true ? "Hide" : "Show"}</Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>

        <FormControl id='confirm-password' isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
                <Input type={confirmPasswordVisible ? 'text' : 'password'} placeholder='Please re-enter your password' autoComplete='off' onChange={(e) => {
                    setConfirmPassword(e.target.value);
                }}/>
                <InputRightElement width='4.5rem' paddingRight='0.05rem'>
                    <Button height='2.35rem' width='4.75rem' onClick={confirmPasswordVisibiltyHandler}>{confirmPasswordVisible === true ? "Hide" : "Show"}</Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>

        <FormControl marginBottom='10px'>
            <FormLabel>Upload your picture</FormLabel>
            <Input type='file' p={1.5} accept='image/*' border='none' onChange={(e) => postDetails(e.target.files[0])} />
        </FormControl>

        <Button colorScheme='blue' width='100%' onClick={submitHandler} style={{marginTop: 15 }} isLoading={loading}>
            Sign Up
        </Button>
        
    </VStack>
  )
}

export default Signup