const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser } = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'StrifeBox';

// Run when client connects
io.on('connection', socket => {
    socket.on('joinRoom', ({ username, room }) => {
        const user = userJoin(socket.id, username, room);
        
        socket.join(user.room);
        
        // socket.emit emits to the connecting client
        socket.emit('message', formatMessage(botName, 'Welcome to Strifebox!'));

        // socket.broadcast.emit emits to everyone but the connecting client
        socket.broadcast
            .to(user.room)
            .emit('message', formatMessage(botName, `${user.username} has joined the chat`));
    });

    // Listen for chatMessage
    socket.on('chatMessage', msg => {
        io.emit('message', formatMessage('User', msg));
    });

    // Runs when client disconnects
    socket.on('disconnect', () => {
        // io.emit emits to everyone
        io.emit('message', formatMessage(botName, `User has left the chat`));
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));