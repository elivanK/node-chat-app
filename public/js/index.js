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
//When a new message arrive, it will be stored in a list item
socket.on('newMessage', function(message) {
    console.log('Listen from index.js - newMessage', message);
    let li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    //render it to the dom
    jQuery('#messages').append(li);
});
//Event acknowledgment - if the data is valid
//send from the server back to the client that we got that data (in a callback function).
// socket.emit('createMessage', {
//     from: 'Frank',
//     text: 'Hi'
// }, function(data) { //this callback funtion will be called when the acknowledgemnt arrived at the client 
//     console.log('Got the data', data); //this function will be called on the server side as a callback
// });
//Adding event listener to the form 
//When user submit form the function execute
jQuery('#message-form').on('submit', function(eve) {
    //The eve event variable is to override the default behaivor to refresh page 
    eve.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function() {

    })
});