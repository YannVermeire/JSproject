var express = require('express');
var app = express();
var serv = require('http').Server(app);


app.get('/', function(req,res){
    res.sendFile(__dirname+'/client/index.html');
})

app.use('/client', express.static(__dirname+'client'));

serv.listen(8080);

var io = require('socket.io')(serv,{});
io.sockets.on('connection', function(socket){

    console.log('socket has connected');

    socket.on('click',function(data){
        console.log("the button is "+data.click +" by user "+data.usrname);
        socket.emit('acc',{
            acc : 'ok'
        });
    });
});