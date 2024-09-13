const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
let number;
let answer;
Randomnumber();

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

    // Client sendet eine Anfrage, um eine Zufallszahl zu generieren
    socket.on('generate_random_number', () => {
        Randomnumber(); // Zufallszahl generieren
    });
    
    socket.on('message', ({ room, message }) => {
        let number = Number(message)
        Messagetest(number)

        io.to(room).emit('message', {
            answer,
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

function Randomnumber() {
    number = Math.floor(Math.random() * 101);
    console.log(`Generierte Zufallszahl: ${number}`);
}

function Messagetest(usernumber){
    if(usernumber === number){
        answer = "Du hast gewonen"
        console.log(answer);
    }else if(usernumber > number){
        answer = "Die Zahl ist grösser als die Zufallszahl"
        console.log(answer);
    }else if(usernumber < number){
        answer = "Die Zahl ist kleiner, als die Zufallszahl"
        console.log(answer);
    }
}