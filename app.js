var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var x = 1;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/html/index.html');
});

io.on('connection', function(socket){
    // do nothing
});

setInterval(function(){
  console.log('Emiting new value');

  io.emit('new val', {
    value_x: x += 1,
    value_y: random(0,10)
  });

}, 1500);


http.listen(3000, function(){
    console.log('listening on *:3000');
});

// utils
function random(low, high){
  return Math.random() * (high - low) + low;
}
