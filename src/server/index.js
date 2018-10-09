// DEFINE SERVER
const http = require('http')
const app = require('./app')

// CREATE SERVER
const server = http.createServer(app)

// DEFINE PORT
const port = process.env.PORT || 3231

// DEFINE SOCKETS AND PASS THEM SERVER
const io = module.exports.io = require('socket.io')(server)
// REQUIRE SOCKET LOGIC
const SocketManager = require('./chat/SocketManager')

// ON CONNECTION EVENT INITIALIZE SOCKET LOGIC
io.on('connection', SocketManager)

// START SERVER WITH GIVEN PORT
server.listen(port, () => {
  console.log('Server started!')
})