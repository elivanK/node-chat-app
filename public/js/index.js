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
//Event listener for the newLocationMessage
socket.on('newLocationMessage', function(message) {
    //generate dom items
    let li = jQuery('<li></li>');
    let a = jQuery('<a target="_blank">My current location</a>');
    //set properties
    li.text(`${message.from}: `);
    //update anchor tag via attr - set and fetch attributes on jquery seleceted element 
    a.attr('href', message.url);
    li.append(a);
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
    const messageTextBox = jQuery('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function() {
        //clear the value of the geo location
        messageTextBox.val('')
    })
});
//Setup for the button listener to get geolocation
const locationButton = jQuery('#send-location');
locationButton.on('click', function() {
    //Check if user has geolocation
    if (!navigator.geolocation) {
        //if not stop the function execuation via return alert.
        return alert('Geolocation not supported by your browrser');
    }
    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function() {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location.');
    });
});;