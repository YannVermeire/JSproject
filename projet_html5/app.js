var express = require('express');
var app = express();
var serv = require('http').Server(app);

//store the sockets
var SOCKETS={};

//handle the players
var Player=function(id){
    var self ={
        id:id,
        opponent:null,
        game_id:null,
        looking_for_game:true,
    }
    Player.list[id]=self;

    self.look_for_game=function()
    {
        for (let player in Player.list)
        {
            if (Player.list[player].opponent===null && Player.list[player].id!==self.id){
                Player.game(self,Player.list[player]);
            }
        }
    }

    self.quit=function()
    {
        if (self.opponent!=null)
        {
            Player.list[self.opponent].opponent=null;
            Player.list[self.opponent].looking_for_game=true;
        }
        delete Player.list[self.id];
    }
    return self;
}

Player.list={};

Player.onConnect=function(socket)
{
    var new_player=Player(socket.id);
    new_player.look_for_game();
    console.log(Player.list);
}

Player.game=function(p1,p2)
{
    console.log("paired ",p1.id," and ",p2.id);
    p1.opponent=p2.id;
    p2.opponent=p1.id;
    var game={
        id:Math.random(),
        player1:p1.id,
        player2:p2.id,
    };
    p1.game_id=game.id;
    p2.game_id=game.id;
    p1.looking_for_game=false;
    p2.looking_for_game=false;
    this.gamelist[game.id]=game;
}
Player.gamelist={}

//handle the redirections
app.get('/', function(req,res){
    res.sendFile(__dirname+'/client/index.html');
})

app.use('/client', express.static(__dirname+'client'));

serv.listen(8080);

var io = require('socket.io')(serv,{});

io.sockets.on('connection', function(socket){
    console.log('socket has connected');
    //store the new socket and create a new player
    socket.id=Math.random();
    SOCKETS[socket.id]=socket;
    Player.onConnect(socket);

    socket.on('click',function(data){
        console.log("the button is "+data.click +" by user "+data.usrname);
        socket.emit('acc',{
            acc : 'ok'
        });
    });

    socket.on('disconnect',function(){
        delete SOCKETS[socket.id];
        Player.list[socket.id].quit();
    })
});

setInterval(function(){
    for(player in Player.list)
    {
        var pack=[];
        var state={
            msg:"",
        }
        if (Player.list[player].looking_for_game)
        {
            state.msg="looking for a game";
        }
    }

},1000/25);
 