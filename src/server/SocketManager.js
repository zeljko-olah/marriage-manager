const io = require('./index.js').io
const {Users} = require('./chat/users')

// Instantiate users class
const users = new Users();
// @TODO - Hardcore chat room for now
const room = 'love'


module.exports = (socket) => {
  console.log("Socket Id:" + socket.id)

  /*
   * ON JOIN
   * When user enters the chat page
   */

  socket.on('JOIN', (message, user) => {
    // Set the user on the socket
    socket.user = user

    // Join our private room 'love'
    socket.join(room)
    users.removeUser(socket.id)
    // users.removeUser(user.id)
    
    users.addUser(socket.id, user.name, room )
    
    // io.emit('USER_CONNECTED', connectedUsers )
    io.to(room).emit('UPDATE_USER_LIST', users.getUserList(room))
    console.log(users.getUserList(room))
  })

  /*
   * ON MESSAGE SENT
   * When user types a message
   */
  
  socket.on('MESSAGE_SENT', (message) => {
    console.log(message)
  })

  /*
   * ON DISCONNECT
   *
   */
  
  socket.on('CLIENT_DISCONNECTED', () => {
    console.log('Disconnected from client')
    socket.disconnect()
  })
  
  
  socket.on('disconnect', () => {
    console.log('Disconnected from server')

    const user = users.removeUser(socket.id)

    // If there is a user
    if(user) {
      // Update the room's users list
      io.to(room).emit('UPDATE_USER_LIST', users.getUserList(room))
    }
    
    console.log(users.getUserList(room))
  })
}


