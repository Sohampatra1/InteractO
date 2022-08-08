
// eslint-disable-next-line
import { Flex, Heading } from '@chakra-ui/react';
import { motion, isValidMotionProp } from 'framer-motion';
import { Route, Routes } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import ChatPage from './Pages/ChatPage';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Homepage />} />
      <Route path='/chats' element={ <ChatPage /> }/>
      </Routes>
    </div>
  );
}

export default App;
