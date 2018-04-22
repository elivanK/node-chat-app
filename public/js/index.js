const socket = io();
socket.on('connect', function() {
    console.log('Connceted to the server (/public/js/index.js)');
    //Create the event - emit()
    socket.emit('createMessage', {
        from: 'jen@example.com',
        text: 'Hey. This is Jen.'
    });

});

socket.on('discconet', function() {
    console.log('Disconnected from server');
});

//Listen to the newMessage event
socket.on('newMessage', function(message) {
    console.log('Listen to new message', message);
});