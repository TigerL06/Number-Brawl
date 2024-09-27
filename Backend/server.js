const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
let number;
let answer;
let bool = false;
const rooms = {};

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render("index");
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('join_room', (room) => {
        socket.join(room);
        console.log(`User joined room: ${room}`);
        if (!rooms[room]) {
            rooms[room] = Randomnumber();
            console.log(`Zufallszahl für Raum ${room}: ${rooms[room]}`);
        }
    });

    // Client sendet eine Anfrage, um eine Zufallszahl zu generieren
    socket.on('generate_random_number', (room), () => {
        rooms[room] = Randomnumber(); // Zufallszahl generieren
    });
    
    socket.on('message', ({ room, message, name }) => {
        let number = Number(message);
        Messagetest(number, room);
        if (bool === true) {
            io.to(room).emit('win', { winner: name }); // Den Namen des Gewinners senden
            bool = false;
        } else {
            io.to(room).emit('message', {
                message: answer,
                name: name || 'Friend'  // Den Namen des Absenders weitergeben
            });
        }
    });

    socket.on('disconnect', () => {
        console.log('a user disconnected');
    });
});

server.listen(6800, () => {
    console.log('Server running on port 6800');
});

function Randomnumber() {
    number = Math.floor(Math.random() * 101);
    console.log(`Generierte Zufallszahl: ${number}`);
}

function Messagetest(usernumber, room){
    if(usernumber === number){
        answer = "Du hast gewonen"
        bool = true;
        console.log(answer);
        rooms[room] = Randomnumber();
    }else if(usernumber > number){
        answer = "Die Zahl ist grösser als die Zufallszahl"
        console.log(answer);
    }else if(usernumber < number){
        answer = "Die Zahl ist kleiner, als die Zufallszahl"
        console.log(answer);
    }
}
