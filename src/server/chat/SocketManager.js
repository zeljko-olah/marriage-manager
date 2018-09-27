// IMPORTS
const io = require('./../index.js').io

const mongoose = require('mongoose')
const Message = require("../api/models/message")
const Room = require("../api/models/room")

const events = require('../../events')
const {generateMessage} = require('./message.js')

// Instantiate users class
const {Users} = require('./users')
const users = new Users();

module.exports = (socket) => {
  console.log("Socket Id:" + socket.id)
  
  // Get default room from db
  const getDefaultRoom = async () => {
    const room = await Room.findOne({default: true})
    .select('name')
    .populate('users')
    .exec()
    return room
  }
  
  getDefaultRoom().then((defaultRoom) => {
      /*
    * ON JOIN
    * When user enters the chat page
    */

    const room = defaultRoom.name

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

      socket.emit(events.NEW_MESSAGE, generateMessage('Admin', `Welcome ${user.name}! :)`))
      socket.broadcast.to(room).emit(events.NEW_MESSAGE, generateMessage('Admin', `${user.name} has joined`));
    })

    /*
    * ON MESSAGE SENT
    * When user types a message
    */
    
    socket.on(events.MESSAGE_SENT, (message) => {
      const user = users.getUser(socket.id)
      const allUsers = users.getUserList(room)

      if (allUsers.length === 1) {
        message.unread = true
      }

      if (user) {
        io.to(room).emit(events.NEW_MESSAGE, message)
      }
    })

    /*
    * ON CHAT STATUS
    * Determine if the partner's chat is open
    */
    
    socket.on(events.CHAT_STATUS, open => {
      const allUsers = users.getUserList(room)
      if (allUsers.length === 1) {
        open = false
      }

      socket.broadcast.to(room).emit(events.CHAT_STAT, open)
    })

    /*
    * ON MARK AS READ
    * When user types a message
    */
    
    socket.on(events.MARK_AS_READ, (message, user) => {
      socket.broadcast.to(room).emit(events.MARK_AS_READED, message, user)
    })

    /*
    * ON UPDATE_UNREAD_COUNT
    * 
    */
    
    socket.on(events.UPDATE_PARTNER_UNREAD_COUNT, () => {
      socket.broadcast.to(room).emit(events.UNREAD_COUNT_UPDATED)
    })

    socket.on(events.UPDATE_OWN_UNREAD_COUNT, () => {
      socket.emit(events.UNREAD_COUNT_UPDATED)
    })

    /*
    * ON UPDATE_OWN_IMPORTANT_COUNT
    * 
    */
    
    socket.on(events.UPDATE_OWN_IMPORTANT_COUNT, () => {
      socket.emit(events.IMPORTANT_COUNT_UPDATED)
    })
    /*
    * ON UPDATE_PARTNER_IMPORTANT_COUNT
    * 
    */
    
    socket.on(events.UPDATE_PARTNER_IMPORTANT_COUNT, () => {
      socket.broadcast.to(room).emit(events.IMPORTANT_COUNT_UPDATED)
    })

    /*
    * ON REMOVE IMPORTANT
    * When user types a message
    */
    
    socket.on(events.REMOVE_IMPORTANT, (message, user) => {

      socket.broadcast.to(room).emit(events.REMOVED_IMPORTANT, message, user)
    })

    /*
    * ON ASK PERMISION
    * When user types a message
    */
    
    socket.on(events.ASK_PERMISION, (user) => {
      socket.broadcast.to(room).emit(events.PERMISION_TO_DELETE, user)
    })

    /*
    * ON REPLY TO DELETE
    * 
    */

    socket.on(events.REPLY_TO_DELETE, (answer, user) => {
      socket.broadcast.to(room).emit(events.CONFIRM_DELETE, answer, user)
    })
    /*
    * ON TYPING
    * When user types a message
    */

    socket.on(events.TYPING, (isTyping, userName)=>{
      socket.broadcast.to(room).emit(events.TYPING_USER, isTyping, userName)
    })

    /**
    |--------------------------------------------------
    | LOCATION
    |--------------------------------------------------
    */
    
    /*
    * ON SHARE_LOCATION
    * 
    */

    socket.on(events.SHARE_LOCATION, (loc, user, callback)=>{
      // Extract adress and from user name
      const {address, from} = loc

      // Create an save message to db
      const message = new Message({
        _id: mongoose.Types.ObjectId(),
        text: address,
        user: user.id,
        room: room,
        unread: true,
        type: 'location'
      })
      message
      .save()
      .then(doc => {

        // Create location message
        const locationMessage = {
          _id: doc._id,
          text: doc.text,
          from: from,
          room: 'love',
          unread: doc.unread,
          type: doc.type,
          link: doc.link,
          createdAt: doc.created_at
        }
        
        // Emit events to update
        socket.broadcast.to(room).emit(events.LOCATION_SHARED, loc)
        io.to(room).emit(events.NEW_MESSAGE, locationMessage)
        socket.broadcast.to(room).emit(events.UNREAD_COUNT_UPDATED)         
        callback(doc)
      })
      .catch(err => {
        console.log(err)
      })
    })


    /**
    |--------------------------------------------------
    | TODOS
    |--------------------------------------------------
    */
    
    /*
    * ON TODOS_UPDATED
    * 
    */

   socket.on(events.TODOS_UPDATED, () => {
     console.log('TODOS UPDATED')
    io.to(room).emit(events.TODOS_UPDATE)
   })


    /*
    * ON TODO_ADD
    * 
    */

    socket.on(events.TODO_ADD, (todo, user)=>{
      // Extract adress and from user name
      console.log('USER:::', user)
      console.log('TODO:::', todo)
      console.log('ROOM', room)

     // Create and save message to db
     const message = new Message({
      _id: mongoose.Types.ObjectId(),
      text: todo.title,
      user: user.id,
      room: room,
      unread: true,
      type: 'todo'
    })

    message
    .save()
    .then(doc => {

      // Create location message
      const todoMessage = {
        _id: doc._id,
        text: doc.text,
        from: user.name,
        room: room,
        unread: doc.unread,
        type: doc.type,
        link: doc.link,
        createdAt: doc.created_at
      }
      
      // Emit events to update
      io.to(room).emit(events.TODO_ADDED, todo, user)
      io.to(room).emit(events.NEW_MESSAGE, todoMessage)
      socket.broadcast.to(room).emit(events.UNREAD_COUNT_UPDATED) 
      io.to(room).emit(events.TODOS_UPDATE)
      // callback(doc)        
    })
    .catch(err => {
      console.log(err)
    })
  })

    /*
  * ON REMINDER_ADD
  * 
  */
  socket.on(events.REMINDER_ADD, (reminder, user)=>{
    console.log('REMINDER ADDED')
    console.log(reminder)

    // Create and save message to db
    const message = new Message({
      _id: mongoose.Types.ObjectId(),
      text: reminder.title,
      user: user.id,
      room: room,
      unread: true,
      type: 'reminder'
    })

    message
    .save()
    .then(doc => {

      // Create location message
      const reminderMessage = {
        _id: doc._id,
        text: doc.text,
        from: user.name,
        room: room,
        unread: doc.unread,
        type: doc.type,
        link: doc.link,
        createdAt: doc.created_at
      }
      
      // Emit events to update
      io.to(room).emit(events.REMINDER_ADDED, reminder, user) 
      io.to(room).emit(events.REMINDERS_UPDATE)
      io.to(room).emit(events.NEW_MESSAGE, reminderMessage)
      socket.broadcast.to(room).emit(events.UNREAD_COUNT_UPDATED) 
      // callback(doc)        
    })
    .catch(err => {
      console.log(err)
    })
  })

    /*
  * ON TODOS_UPDATED
  * 
  */

  socket.on(events.REMINDERS_UPDATE, () => {
    console.log('TODOS UPDATED')
    io.to(room).emit(events.REMINDERS_UPDATED)
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
  })
}


