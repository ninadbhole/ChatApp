const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
    console.log('A user connected');
    console.log('socket id :'+socket.id)
  
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  
    socket.on('chat message', function (msg) {
        if (msg.message === '/random') {
          io.to(socket.id).emit('chat message', {
            username: msg.username,
            message: `Random number: ${generateRandomNumber()}`
          });
        } else {
          io.emit('chat message', msg);
        }
      });
  
  });

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

