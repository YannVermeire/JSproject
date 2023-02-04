var server = require('express')();
var cors = require('cors');
server.use(cors());

var http = require('http').createServer(server);
const io = require('socket.io')(http);

io.on('connection', function (socket) {
    console.log('A user connected: ' + socket.id);

    socket.on('disconnect', function () {
        console.log('A user disconnected: ' + socket.id);
    });
});

server.get("/socket.io/?EIO=4&transport=polling&t=OOUIarb", cors(), function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for a Single Route'})
    console.log('poupou')
  })
  
http.listen(3000, function () {
    console.log('Server started!');
});
