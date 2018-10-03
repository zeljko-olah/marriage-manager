/*
 * CHAT COMPONENT
 *
 */

import React, { Component } from 'react'

import { connect } from 'react-redux'
import * as actions from '../../store/actions'

import ChatHeading from './ChatHeading'
import Messages from './Messages'
import MessageInput from './MessageInput'

import io from 'socket.io-client'
import * as events from '../../events'

import styled from 'styled-components'
import * as colors from '../../styles/variables'
 
import moment from 'moment'
import default_sound from '../cuckoo.ogg'
import important_sound from '../important.mp3'

let socketUrl = 'https://vast-falls-59724.herokuapp.com'
if (process.env.NODE_ENV === 'development') {
  socketUrl = 'http://localhost:3231'
}

class Chat extends Component {
  
  // STATE
  state = {
    socket: null,
    users: [],
    activeUsers: [],
    messages: [],
    width: 0,
    height: 0,
    typingUser: null,
    isTyping: false,
  }
  
  // List of selected message ids
  ids = []
  chatPartnerOpened = false
  updateMessageTime = setInterval(() => {
    const { showChat } = this.props
    const { messages } = this.state
    if (showChat) {
      const newMessages = messages.map((message) => {
        message.createdAtFormatted = moment(message.createdAt).fromNow()
        return message
      })
      this.setState({ messages: newMessages })
    }
  }, 60 * 1000)

  audioDefault = new Audio(default_sound)
  audioImportant = new Audio(important_sound)

  // LIFECYCLE HOOKS
  componentDidMount = () => {
    const { user, getMessages, getDefaultRoomUsers } = this.props
    getDefaultRoomUsers(user.id)
    this.initSocket()
    getMessages().then(() => {
      this.setState({messages: this.props.loadedMessages})
    })
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  componentDidUpdate(prevProps, prevState) {
    const { socket } = this.state
    const { showChat, getMessages } = this.props
    if (showChat !== prevProps.showChat) {
      socket.emit(events.CHAT_STATUS, showChat)
    }
  }

  componentWillUnmount() {
    const { socket } = this.state
		socket.off(events.USER_CONNECTED)
    socket.off(events.UPDATE_USER_LIST)
    socket.off(events.NEW_MESSAGE)
    socket.off(events.MARK_AS_READ)
    socket.off(events.MARK_AS_READED)
    socket.off(events.PERMISION_TO_DELETE)
    socket.off(events.CONFIRM_DELETE)
    socket.off(events.REMOVED_IMPORTANT)
    socket.off(events.CHAT_STAT)
    socket.off(events.TYPING_USER)
    socket.emit(events.CLIENT_DISCONNECTED)
    window.removeEventListener('resize', this.updateWindowDimensions)
  }
  
  // SOCKET
  // Handle socket events
  initSocket = () => {
    const { socketInit } = this.props
    const socket = io(socketUrl)
    socketInit(socket)
    const { user, deleteChatHistory, setFlashMessage } = this.props
    this.setState({socket})
    socket.on('connect', ()=>{
      console.log("Connected")
    })

    // Events
    socket.emit(events.JOIN, `${user.name} logged in`, {...user, id: socket.id} )

    socket.on(events.CHAT_STAT, (open)=>{
      const { setUsers } = this.props
      const { activeUsers } = this.state
      this.chatPartnerOpened = open
      setUsers(activeUsers, open)
    })

    socket.on(events.UPDATE_USER_LIST, (activeUsers) => {
      const { setUsers } = this.props
      this.setState({activeUsers})
      setUsers(activeUsers, false)
    })

    socket.on(events.NEW_MESSAGE, (message) => {
      const { messages } = this.state
      const { user, setFlashMessage } = this.props
      if (message.type === 'location') {
        socket.emit(events.UPDATE_OWN_UNREAD_COUNT )
      }
      const formatedTime = moment(message.createdAt).fromNow()
      const newMessage = Object.assign({}, message, {createdAtFormatted: formatedTime})
      const newMessages = messages ? messages.concat(newMessage) : null
      this.setState({messages: newMessages})
      if (message.from === 'Admin') {
        setFlashMessage({
          type: 'success',
          flashMessage: message.text
        })
        return     
      }
      if (user && user.name !== message.from) {
        if (message.type === 'important') {
          this.audioImportant.play()
          return
        }
        this.audioDefault.play()
      }
    })

    socket.on(events.CONFIRM_DELETE, (answer, user) => {
      const { getMessages } = this.props
      if (answer) {
        socket.emit(events.UPDATE_UNREAD_COUNT )
        this.setState({messages: []})
        setFlashMessage({
          type: 'success',
          flashMessage: `Deleted!`
        })
        getMessages()
      } else {
        setFlashMessage({
          type: 'error',
          flashMessage: `${user} denied deletion!`
        })
      }
    })

    socket.on(events.MARK_AS_READED, (message, user) => {
      const { messages } = this.state
      const markedMessages = messages.map(m => {
        if (m.id === message.id) {
          m.unread = false
        }
        return m
      })
      this.setState({ messages: markedMessages })
      setFlashMessage({
        type: 'success',
        flashMessage: `${user.name} is reading your messages!`
      })
    })

    socket.on(events.REMOVED_IMPORTANT, (message, user) => {
      const { messages } = this.state
      const { setFlashMessage } = this.props
      const markedMessages = messages.map(m => {
        if (m.id === message.id) {
          m.type = 'message'
        }
        return m
      })
      this.setState({ messages: markedMessages }, () => {
        socket.emit(events.UPDATE_PARTNER_IMPORTANT_COUNT, -1)
      })
      setFlashMessage({
        type: 'success',
        flashMessage: `${user.name} is aware of important message`
      })
    })

    socket.on(events.PERMISION_TO_DELETE, partner => {
      const { user, getMessages } = this.props
      const answer = window.confirm(`${partner.name} wants to delete chat history. Do you agree?`)
      socket.emit(events.REPLY_TO_DELETE, answer, user.name)
      if (answer) {
        deleteChatHistory('love')
        .then(() => {
          this.setState({messages: []})
          getMessages()
        })
      }
    })

    socket.on(events.TYPING_USER, (isTyping, userName) => {
      this.setState({
        isTyping,
        typingUser: userName
      })
    })

    socket.on('disconnect', (message) => {
      console.log('Disconnected from server');
    })
  }
  
  // HANDLERS
  // Send message
  handleSendMessage = (message) => {
    const { socket, activeUsers} = this.state
    const { saveMessage, setFlashMessage, user, getUserCoords, setLocation } = this.props
    let type = 'message'

    // Skip messages from admin
    if (message.from !== 'Admin') {

      // Shorcodes pattern
      const patterns = {
        important: /^@!!!/,
        location: /^@loc/,
        link: /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi,
        heart: /^@love/
      }

      // Important message
      const important = patterns.important.test(message)
      if (important) {
        type = 'important'
      }
      message = message.replace('@!!!', '')
      if (!message) {
        setFlashMessage({
          type: 'error',
          flashMessage: `Empty messages not allowed!`
        })
        return
      }

      // Set unread messages 
      const unread = !important ? ((activeUsers && activeUsers.length === 1) || !this.chatPartnerOpened ? 'true' : 'false') : 'false'

      // Link
      const link = patterns.link.test(message)

      // Heart Icons
      const love = patterns.heart.test(message)
      if (love) {
        type = 'love'
      }

      // Location message
      const location = patterns.location.test(message)
      if (location) {
        getUserCoords(user.id)
        .then(userLocation => {
          setLocation(userLocation)
            .then(loc => {
              socket.emit(events.SHARE_LOCATION, loc, user, (_) => {
                setFlashMessage({
                  type: 'success',
                  flashMessage: `You shared location!`
                })
              })
          })
        })
        return
      }
      // Persist message to db
      saveMessage({
        text: message.replace('!!!', ''),
        userId: user.id,
        unread,
        type,
        link
      })
        .then(savedMessage => {
          socket.emit(events.MESSAGE_SENT, savedMessage)
          if (savedMessage.type === 'important') {
            socket.emit(events.UPDATE_PARTNER_IMPORTANT_COUNT)
            return
          }
          if (savedMessage.unread) {
            socket.emit(events.UPDATE_PARTNER_UNREAD_COUNT)
          }
        })
    }
  }
  
  // Close chat window
  handleCloseChat = () => {
    const { toggleChat } = this.props
    toggleChat(true)
  }
  
  // Email chat history to user's email
  handleEmailChatHistory = () => {
    const { emailChatHistory, user } = this.props
    const { messages } = this.state
    const usersMessages = messages.filter(msg => msg.from !== 'Admin')
    emailChatHistory(usersMessages, user)
  }
  
  // Delete all chat messages
  handleDeleteChat = (user) => {
    const { socket, activeUsers } = this.state
    const { setFlashMessage } = this.props
    if (activeUsers.length < 2) {
      setFlashMessage({
        type: 'error',
        flashMessage: `Not possible if your partner is offline`
      })
      return
    } 
    socket.emit('ASK_PERMISION', user)
  }
  
  // Mark messages as read
  handleMarkAllRead = () => {
    const { markMessagesAsRead, user, setFlashMessage } = this.props
    const { socket, messages} = this.state

    const senderIds = messages.filter(m => m.from !== user.name && m.unread) 
      .map(m => m._id)  

    if (!senderIds.length) {
      setFlashMessage({
        type: 'error',
        flashMessage: `There are no unread messages!`
      }) 
      return
    }

    markMessagesAsRead(senderIds).then(() => {
     messages.forEach(m => {
        if (senderIds.includes(m._id)) {
          m.unread = false
          socket.emit(events.MARK_AS_READ, m, user)
        }
      })
      socket.emit(events.UPDATE_OWN_UNREAD_COUNT)  
    })
  }
  
  
  // Remove important flag from message
  handleRemoveImportant = (id) => {
    const { messages, socket } = this.state
    const { removeImportantMessage, user } = this.props
    removeImportantMessage(id).then(() => {
      const markedMessages = messages.map(m => {
        if (m._id === id) {
          socket.emit(events.REMOVE_IMPORTANT, m, user)
          m.type = 'message'
        }
        return m
      })
      this.setState({ messages: markedMessages })
    })
  }

  // User is typing message
  handleTypingStatus = (isTyping) => {
    const { socket } = this.state
    const { user } = this.props
    socket.emit(events.TYPING, isTyping, user.name)
  }
  
  
  // Update browser dimensions
  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  // RENDER  
  render () {
    const { activeUsers, socket, messages, width, height, typingUser, isTyping } = this.state
    const { user, info, showChat } = this.props

    return (
      <StyledSection>
        
        { /* CHAT HEADING */ }
        <ChatHeading
          user={user}
          users={activeUsers}
          socket={socket}
          close={this.handleCloseChat}
          info={info}
          saveChatHistory={this.handleEmailChatHistory}
          deleteChatHistory={this.handleDeleteChat}
          markAllRead={this.handleMarkAllRead} />
        
        { /* MESSAGES THREAD */ }
        <Messages
          messages={messages}
          user={user}
          isTyping={isTyping}
          typingUser={typingUser}
          removeImportant={this.handleRemoveImportant}
          close={this.handleCloseChat} />

        { /* MESSAGE INPUT */ }
        <MessageInput
          width={width}
          height={height}
          showChat={showChat}
          sendMessage={this.handleSendMessage}
          typingStatus={this.handleTypingStatus} />

      </StyledSection>
    )
  }
}

// MAP REDUX STATE AND DISPATCH TO PROPS
const mapStateToProps = state => {
  return {
    user: state.auth.user,
    loadedMessages: state.chat.messages,
    info: state.chat.flashMessage,
    showChat: state.chat.showChat
  }
}

const mapDispatchToProps = (dispatch) => ({
  socketInit: (socket) => dispatch(actions.socketInit(socket)),
  getDefaultRoomUsers: (userId) => dispatch(actions.getDefaultRoomUsers(userId)),
  getMessages: () => dispatch(actions.getMessages()),
  setUsers: (activeUsers, open) => dispatch(actions.setUsers(activeUsers, open)),
  saveMessage: (message) => dispatch(actions.saveMessage(message)),
  toggleChat: (showChat) => dispatch( actions.toggleChat(showChat) ),
  emailChatHistory: (messages, user) => dispatch( actions.emailChatHistory(messages, user) ),
  deleteChatHistory: (room) => dispatch( actions.deleteChatHistory(room) ),
  markMessagesAsRead: (id) => dispatch( actions.markMessagesAsRead(id) ),
  removeImportantMessage: (id) => dispatch( actions.removeImportantMessage(id) ),
  setFlashMessage: (flash) => dispatch( actions.setFlashMessage(flash) ),
  setLocation: (userLocation) => dispatch(actions.setLocation(userLocation)),
  getUserCoords: (userId) => dispatch(actions.getUserCoords(userId))
})

// EXPORT
export default connect(mapStateToProps, mapDispatchToProps)(Chat)


// STYLED
const StyledSection = styled.section`
  background: ${colors.ter_grad};
  border: 2px solid ${colors.prim_color};
  border-top-left-radius: 20px;
  box-shadow: ${colors.box_shadow};
  max-width: 768px;
  overflow: hidden;
  margin: 80px auto 0;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    margin: 0 auto;
    border: 0;
    border-top-left-radius: 0;
  }
`