const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
//Config server to use socket.io
const io = socketIO(server);

app.use(express.static(publicPath));
//Register event listener
io.on('connection', (socket) => {
    console.log('New user connected from Server side');
    //add socket.emit from Admit text welcome to the chat
    socket.emit('newMessage', { //We will get the new msg from admin
        from: 'Admin',
        text: 'Welcome to the Chat App',
        createdAt: new Date().getTime()
    });
    //socket.broadcast.emit from admin text new user joined
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New User Joined',
        createdAt: new Date().getTime()
    });
    //Create newMessage event
    // socket.emit('newMessage', {
    //     from: 'max@gmail.com',
    //     text: 'Did you get me msg?',
    //     createdAt: 16
    // });
    //Listen to the event - on()
    socket.on('createMessage', (message) => {
        console.log('The createMessage event', message);
        //io.emit to all users - wired the newMessage event
        io.emit('newMessage', { //we get the newMessage from the user.
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });

        //Broadcasting Events - all but me will see msg.
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    io.on('disconnetion', (socket) => {
        console.log('User was disconneted');
    });

});



server.listen(port, () => console.log(`Server is running on port ${port}`));