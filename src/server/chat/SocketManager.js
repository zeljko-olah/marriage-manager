const io = require('./../index.js').io
const {Users} = require('./users')
// MODELS
const Message = require('../api/models/message')

const events = require('../../chat/Events')

const {generateMessage} = require('./message.js')
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

  socket.on(events.JOIN, (message, user) => {
    // Set the user on the socket
    socket.user = user

    // Join our private room 'love'
    socket.join(room)
    users.removeUser(socket.id)
    // users.removeUser(user.id)
    
    users.addUser(socket.id, user, room )
    
    // io.emit('USER_CONNECTED', connectedUsers )
    io.to(room).emit(events.UPDATE_USER_LIST, users.getUserList(room))
    console.log(users.getUserList(room))

    socket.emit(events.NEW_MESSAGE, generateMessage('Admin', `Welcome ${user.name}! :)`))
    socket.broadcast.to(room).emit(events.NEW_MESSAGE, generateMessage('Admin', `${user.name} has joined`));
  })

  /*
   * ON MESSAGE SENT
   * When user types a message
   */
  
  socket.on(events.MESSAGE_SENT, (message, callback) => {
    const user = users.getUser(socket.id)
    const allUsers = users.getUserList(room)
    let unread = false
    if (allUsers.length === 1) {
      unread = true
    }

    if (user) {
      io.to(room).emit(events.NEW_MESSAGE, generateMessage(user.name, message, unread));
    }
    
    callback('Message sent')
  })

  /*
   * ON MARK AS READ
   * When user types a message
   */
  
  socket.on(events.MARK_AS_READ, message => {
    console.log('we are here')
    console.log('MESSAGE', message)

    io.to(room).emit(events.MARK_AS_READED, message)
  })

  /*
   * ON DISCONNECT
   *
   */
  
  socket.on(events.CLIENT_DISCONNECTED, () => {
    console.log('Disconnected from client')
    socket.disconnect()
  })
  
  
  socket.on('disconnect', () => {
    console.log('Disconnected from server')

    const user = users.removeUser(socket.id)

    // If there is a user
    if(user) {
      // Update the room's users list
      io.to(room).emit(events.UPDATE_USER_LIST, users.getUserList(room))
      io.to(room).emit(events.NEW_MESSAGE, generateMessage('Admin', `${user.name} has left.`))
    }
    
    console.log(users.getUserList(room))
  })
}


