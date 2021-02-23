const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Run when client connects
io.on('connection', socket => {
    // socket.emit emits to the connecting client
    socket.emit('message', 'Welcome to Strifebox!');

    // socket.broadcast.emit emits to everyone but the connecting client
    socket.broadcast.emit('message', 'A user has joined the chat');

    // Runs when client disconnects
    socket.on('disconnect', () => {
        // io.emit emits to everyone
        io.emit('message', 'A user has left the chat');
    })
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));