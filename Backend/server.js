const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
let answer;
const rooms = {};

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render("index");
});

io.on('connection', (socket) => {
    console.log('A user connected');

    // Benutzer tritt einem Raum bei
    socket.on('join_room', (room) => {
        socket.join(room);
        console.log(`User joined room: ${room}`);

        // Wenn der Raum keine Zufallszahl hat, erstelle eine
        if (!rooms[room]) {
            rooms[room] = Randomnumber(); // Zufallszahl für den Raum generieren
            console.log(`Zufallszahl für Raum ${room}: ${rooms[room]}`);
        }
    });

    // Client sendet eine Anfrage, um eine Zufallszahl zu generieren
    socket.on('generate_random_number', (room) => { 
        if (room) {
            rooms[room] = Randomnumber(); // Neue Zufallszahl für den Raum generieren
            console.log(`Neue Zufallszahl für Raum ${room}: ${rooms[room]}`);
        }
    });

    // Nachricht empfangen
    socket.on('message', ({ room, message, name }) => {
        const userNumber = Number(message); // Die Nachricht in eine Zahl umwandeln

        // Überprüfen, ob die Nachricht eine gültige Zahl ist
        if (!isNaN(userNumber) && rooms[room]) {
            Messagetest(userNumber, room);
            
            if (answer === "Du hast gewonnen") {
                io.to(room).emit('win', { winner: name }); // Gewinner an den Raum senden
                
                // Neue Zufallszahl nach dem Gewinn explizit für den Raum generieren und speichern
                rooms[room] = Randomnumber();
                console.log(`Neue Zufallszahl nach Gewinn für Raum ${room}: ${rooms[room]}`);
            } else {
                io.to(room).emit('message', {
                    message: answer,
                    name: name || 'Friend'
                });
            }
        } else {
            // Wenn die Nachricht keine Zahl ist, sende sie als normale Nachricht
            io.to(room).emit('message', {
                message: message, // Sende die ursprüngliche Nachricht
                name: name || 'Friend'
            });
        }
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

server.listen(8080, () => {
    console.log('Server running on port 8080');
});

// Zufallszahl generieren
function Randomnumber() {
    return Math.floor(Math.random() * 101);
}

// Testen, ob die Benutzernummer der Zufallszahl des Raumes entspricht
function Messagetest(userNumber, room) {
    if (userNumber === rooms[room]) {
        answer = "Du hast gewonnen";
        console.log(answer);
    } else if (userNumber > rooms[room]) {
        answer = "Die Zahl ist größer als die Zufallszahl";
        console.log(answer);
    } else if (userNumber < rooms[room]) {
        answer = "Die Zahl ist kleiner als die Zufallszahl";
        console.log(answer);
    }
}
