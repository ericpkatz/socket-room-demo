const express = require('express');
const path = require('path');
const io = require('socket.io');

const app = express();

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

const port = process.env.PORT || 3000;

const server = app.listen(port, ()=> console.log(`listening on port ${port}`));

const socketServer = io( server );

const messages = {};

socketServer.on('connection', socket => {
  socket.on('message', ({ room, message, user })=> {
    //store messages in memory for that room
    messages[room] = messages[room] || [];
    //format the message
    const _message = `${user } : ${room}: ${message}`;
    //store it
    messages[room].push(_message);
    //send it
    socketServer.to(room).emit('message', _message);
  });

  //if client sends a join message, then add them to the room they request
  socket.on('join', (room)=> {
    socket.join(room, ()=> {
      //look for messages
      const _messages = messages[room] || [];
      _messages.forEach(message => {
        socket.send(message);
      });
    });
  });
});
