// require('./config')

const http = require('http')
const app = require('./app')

const server = http.createServer(app)
const port = process.env.PORT || 3231

const io = module.exports.io = require('socket.io')(server)
const SocketManager = require('./SocketManager')

io.on('connection', SocketManager)

server.listen(port, () => {
  console.log('Server started!')
})