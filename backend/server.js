const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('joinRoom', (roomCode) => {
    socket.join(roomCode);
    console.log(`Client joined room: ${roomCode}`);
  });

  socket.on('screenShare', (data) => {
    socket.to(data.roomCode).emit('screenShare', data.stream);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.get('/',(req,res)=>{

    res.send("Socket ............");
})

server.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
