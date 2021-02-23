const socket = io(); // Made available via script tag added in chat.html

socket.on('message', message => {
    console.log(message);
});