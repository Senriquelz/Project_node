const socketIO = require('socket.io')
const socket = {}

function connect(app){
    socket.io = socketIO( app )
}

module.exports = {
    connect,
    socket
}