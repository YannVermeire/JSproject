var express = require('express');
var app = express();
var serv = require('http').Server(app);

//store the players and sockets
var PLAYERS={};
var SOCKETS={};

class Player{
    constructor(id)
    {
        this.id=id;
        this.opponent=null;
        console.log('added a player on id : '+id);
        PLAYERS[id]=this;
        console.log(PLAYERS);
    }
    static game(p1,p2)
    {
        if(p1.id!==p2.id)
        {
            p1.opponent=p2.id;
            p2.opponent=p1.id;
        }
    }
    quit()
    {
        if(this.opponent!=null)
        {
            PLAYERS[this.opponent].opponent=null;
        }
        delete PLAYERS[this.id];
    }
}

app.get('/', function(req,res){
    res.sendFile(__dirname+'/client/index.html');
})

app.use('/client', express.static(__dirname+'client'));

serv.listen(8080);

var io = require('socket.io')(serv,{});
var games={};

io.sockets.on('connection', function(socket){
    console.log('socket has connected');
    //store the new socket and create a new player
    socket.id=Math.random();
    SOCKETS[socket.id]=socket;
    console.log(SOCKETS);
    var new_player=new Player(socket.id);
    //look for a game
    for (let player in PLAYERS)
    {
        if (player.opponent===null && player.id!==new_player.id){
            console.log("found a game with "+player.id);
            Player.game(player,new_player);
        }
    }

    socket.on('click',function(data){
        console.log("the button is "+data.click +" by user "+data.usrname);
        socket.emit('acc',{
            acc : 'ok'
        });
    });

    socket.on('disconnect',function(){
        delete SOCKETS[socket.id];
        PLAYERS[socket.id].quit();
    })
});

setInterval(function(){
    for (let socket in SOCKETS)
    {
        console.log(socket.id);
        console.log(PLAYERS[socket.id]);
        if(PLAYERS[socket.id].opponent!=null)
        {
            socket.emit('opponent',{opponent : PLAYERS[socket.id].opponent});
        }
    }
},1000/25);
