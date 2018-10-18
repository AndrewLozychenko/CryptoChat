var server = require('http').createServer();
var io = require('socket.io')(server);
var express = require('express');
var app = express();

server.listen(process.env.PORT || 8080);
console.log('Server on');

app.use(express.static(__dirname));

app.get("/",function(req,res){
	res.render("test");
});

var users;
var id = 0;

io.on('connection', (socket) =>
{
    console.log("Someone connected");
    socket.emit('connected', {});
    users[socket] = {'id':id,'socket':socket};
    id++;

    socket.on('message', function(data)
    {
        for(var i in users)
        { 
			i.socket.emit('message',{message:data.message});
        }
    });
});								