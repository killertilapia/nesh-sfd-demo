var express = require('express');
var app = express();
var http = require('http').Server(app);
var url = require('url');

// THE IMPORTANT SHIT!!
var io = require('socket.io')(http);
var mqtt = require('mqtt');

/*
var mqtt_url = 'mqtt://m11.cloudmqtt.com:10199';

var mqtt_client = mqtt.connect(mqtt_url,
  {
    username: 'wmhqmvxg',
    password: 'K6TRIuTZw2iX'
  }
);

mqtt_client.on('connect', function(){
  mqtt_client.subscribe('inTopic');
});

mqtt_client.on('message', function(topic, msg){
  // msg is Buffer
  var JSON_DATA = msg.toJSON();

  console.log(JSON_DATA['data']);
});
*/

var x = 1;
app.use(express.static('html'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    // do nothing
});


setInterval(function(){
  console.log('Emiting new value');

  io.emit('new val', {
    time: (new Date()).getTime(),
    light_value: random(0,255),
    temp_value: random(0,32)
  });

}, 1500);


http.listen(3000, function(){
    console.log('listening on *:3000');
});

// utils
function random(low, high){
  return Math.random() * (high - low) + low;
}
