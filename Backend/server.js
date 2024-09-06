const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render("index");
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('join_room', (room) => {
        socket.join(room);
        console.log(`User joined room: ${room}`);
    });

    socket.on('message', ({ room, message }) => {
        io.to(room).emit('message', {
            message,
            name: 'Friend'
        });
    });

    socket.on('disconnect', () => {
        console.log('a user disconnected');
    });
});

server.listen(6800, () => {
    console.log('Server running on port 6800');
});