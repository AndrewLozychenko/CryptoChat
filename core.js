var server = require('http').createServer();
var io = require('socket.io')(server);

server.listen(8080);
console.log('Server on');

var users;
var id = 0;

io.on('connection', (socket) =>
{
    console.log("Someone connected");
    socket.emit('connected', {});
    users[socket] = {'id':id,name:"Nobody",'socket':socket};
    id++;

    socket.on('rename', function(data)
    {
        users[socket].name = data.name;
    });

    socket.on('getUsersList', function(data)
    {
        socket.emit('usersList',{'users':users});
    });

    socket.on('message', function(data)
    {
        for(var i in users)
        { 
            if(data.name == i.name)
                i.socket.emit('message',{message:data.message});
        }
    });
});								