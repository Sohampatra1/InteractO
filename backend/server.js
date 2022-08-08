const express = require('express');
const app = express();
const dotenv = require('dotenv'); 
const { chats } = require('./data/data')

dotenv.config();


app.get('/', (req, res) => {
    res.send("Hello Welcome to my homepage"); // response from server
})

app.get('/api/chat', (req, res) => {
    res.send(chats);
})

app.get('/api/chat/:id', (req, res) => {
    var chatID = req.params.id;

    const singleChat = chats.find((chat) => {
       return chat._id === chatID; // if chat_id matches with user entered chat id
       // return the chat
    })

    res.send(singleChat);
})

const Port = process.env.PORT || 3000;

app.listen(Port, console.log(`Server is running on Port ${Port}`));






