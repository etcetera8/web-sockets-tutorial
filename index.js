var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  io.emit('logStatus', { name: 'jim' })
  
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });

  socket.on('chat message', function (msg) {
    socket.broadcast.emit('chat message', msg)
  });

  socket.on('sender', data => {
    //socket.emit('sender', data);
    socket.broadcast.emit('sender', data)
  })
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});
