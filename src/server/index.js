// require('./config')

const http = require('http')
const app = require('./app')

const port = process.env.port || 3231


const server = http.createServer(app)

server.listen(port, () => {
  console.log('Server started!')
})