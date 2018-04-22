const socket = io();
socket.on('connect', function() {
    console.log('Connceted to the server (/public/js/index.js)');
    //Create the event - emit()
    // socket.emit('createMessage', {
    //     from: 'jen@example.com',
    //     text: 'Hey. This is Jen.'
    // });

});

socket.on('discconet', function() {
    console.log('Disconnected from server');
});

//Listen to the newMessage event
socket.on('newMessage', function(message) {
    console.log('Listen from index.js - newMessage', message);
});
//Event acknowledgment - if the data is valid
//send from the server back to the client that we got that data (in a callback function).
socket.emit('createMessage', {
    from: 'Frank',
    text: 'Hi'
}, function(data) {
    console.log('Got the data', data); //this function will be called on the server side as a callback
});