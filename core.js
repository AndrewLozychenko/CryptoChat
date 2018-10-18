var server = require('http').createServer();
var io = require('socket.io')(server);

server.listen(process.env.PORT || 8080);
console.log('Server on');

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