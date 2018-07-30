const io = require('./index.js').io

module.exports = (socket) => {
  console.log("Socket Id:" + socket.id)
}