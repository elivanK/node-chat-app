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
    //Create newMessage event
    socket.emit('newMessage', {
        from: 'max@gmail.com',
        text: 'Did you get me msg?',
        createdAt: 16
    });
    //Listen to the event - on()
    socket.on('createMessage', (message) => {
        console.log('The createMessage event', message);
    });

    io.on('disconnetion', (socket) => {
        console.log('User was disconneted');
    });

});



server.listen(port, () => console.log(`Server is running on port ${port}`));