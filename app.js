var app = require('./config/server');

var server = app.listen(80,function(){
    console.log('SERVER ON');
});

var io = require('socket.io').listen(server);

app.set('io',io)

io.on('connection',function(socket){
    console.log('Usuário conectado')

    socket.on('disconnect',function(){
        console.log('Usuário desconectou');
    })

    socket.on('msgParaServidor',function(data){

        /*Dialogo*/
        //emit envia para a tela do cliente conectado
        socket.emit('msgParaCliente',{apelido:data.apelido,mensagem:data.mensagem});

        //broadcast envia para todas os sockets restantes
        socket.broadcast.emit('msgParaCliente',{apelido:data.apelido,mensagem:data.mensagem});

        
        /*Participantes*/
        if(parseInt(data.checarParticipante) == 0){
            socket.emit('participantesParaCliente',{apelido:data.apelido});
    
            socket.broadcast.emit('participantesParaCliente',{apelido:data.apelido});
        }
    })
})