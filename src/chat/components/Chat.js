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
import * as events from '../Events'

import styled from 'styled-components'
import * as colors from '../../styles/variables'
 
import moment from 'moment';

let socketUrl = 'https://vast-falls-59724.herokuapp.com'
if (process.env.NODE_ENV === 'development') {
  socketUrl = 'http://localhost:3231'
}

class Chat extends Component {
  
  // State
  state = {
    socket: null,
    users: [],
    messages: [],
    selectedMessages: [],
    width: 0,
    height: 0
  }

  ids = []

  
  // Lifecycle
  componentDidMount = () => {
    this.initSocket()
    this.props.getMessages().then(() => {
      this.setState({messages: this.props.loadedMessages})
    })
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  componentWillUnmount() {
		const { socket } = this.state
		socket.off(events.USER_CONNECTED)
    socket.off(events.UPDATE_USER_LIST)
    socket.off(events.NEW_MESSAGE)
    socket.off(events.MARK_AS_READ)
    socket.off(events.ASK_PERMISION)
    socket.off(events.CONFIRM_DELETE)
    socket.off(events.REMOVED_IMPORTANT)
    socket.emit(events.CLIENT_DISCONNECTED)
    window.removeEventListener('resize', this.updateWindowDimensions)
  }
  
  // Handle socket events
  initSocket = () => {
    const socket = io(socketUrl)
    const { user, deleteChatHistory, setFlashMessage } = this.props
    this.setState({socket})
    socket.on('connect', ()=>{
      console.log("Connected")
    })

    // Events
    socket.emit(events.JOIN, `${user.name} logged in`, {...user, id: socket.id} )
    socket.on(events.USER_CONNECTED, (users)=>{
			this.setState({ users })
    })
    socket.on(events.UPDATE_USER_LIST, (users) => {
      this.setState({users})
    })
    socket.on(events.CONFIRM_DELETE, (answer, user) => {
      console.log(answer)
      if (answer) {
        this.setState({messages: []})
      } else {
        setFlashMessage({
          type: 'error',
          flashMessage: `${user} denied deletion!`
        })
      }
    })
    socket.on(events.MARK_AS_READED, (message) => {
      const { messages } = this.state
      const markedMessages = messages.map(m => {
        if (m.id === message.id) {
          m.unread = false
        }
        return m
      })
      this.setState({ messages: markedMessages })
    })

    socket.on(events.REMOVED_IMPORTANT, (message) => {
      const { messages } = this.state
      const { setFlashMessage } = this.props
      const markedMessages = messages.map(m => {
        if (m.id === message.id) {
          m.important = false
        }
        return m
      })
      this.setState({ messages: markedMessages })
      setFlashMessage({
        type: 'success',
        flashMessage: `Removed important flag`
      })
    })

    socket.on(events.NEW_MESSAGE, (message) => {
      const { messages } = this.state
      const formatedTime = moment(message.createdAt).format('h:mm a')
      const newMessage = Object.assign({}, message, {createdAt: formatedTime})
      const newMessages = messages ? messages.concat(newMessage) : null
      this.setState({messages: newMessages})
    })
    socket.on(events.PERMISION_TO_DELETE, partner => {
      const { user } = this.props
      const answer = window.confirm(`${partner.name} wants to delete chat history. Do you agree?`)
      socket.emit(events.REPLY_TO_DELETE, answer, user.name)
      if (answer) {
        deleteChatHistory('love')
        .then(() => {
          this.setState({messages: []})
        })
      }
    })
    socket.on('disconnect', (message) => {
      console.log('Disconnected from server');
    })
  }
  
  // Send message @TODO
  handleSendMessage = (message) => {
    const { socket, users} = this.state
    const { saveMessage, user } = this.props
    if (message.from !== 'Admin') {
      const unread = users && users.length === 1 ? 'true' : 'false'
      const pattern = /^[!!!]/
      const important = pattern.test(message)
      saveMessage({
        text: message.replace('!!!', ''),
        userId: user.id,
        unread,
        important
      }).then(savedMessage => {
        socket.emit(events.MESSAGE_SENT, savedMessage, (info) => {
          console.log(info)
        })
      })
    }
  }

  handleCloseChat = () => {
    const { toggleChat } = this.props
    toggleChat(true)
  }

  handleEmailChatHistory = () => {
    const { emailChatHistory, user } = this.props
    const { messages } = this.state
    const usersMessages = messages.filter(msg => msg.from !== 'Admin')
    emailChatHistory(usersMessages, user)
  }

  handleDeleteChat = (user) => {
    const { socket, users } = this.state
    const { setFlashMessage } = this.props
    if (users.length < 2) {
      setFlashMessage({
        type: 'error',
        flashMessage: `Not possible if your partner is offline`
      })
      return
    } 
    socket.emit('ASK_PERMISION', user)
  }
  
  handleSelectMessages = (id, from) => {
    const { user } = this.props
    if (from === user.name ) {
      return
    }
    if (this.ids.includes(id)) {
      console.log(this.ids.includes(id))
      this.ids = this.ids.filter(_id => id !== _id)      
    } else {
      this.ids.push(id)
    }

    this.setState({ selectedMessages: this.ids })
  }

  handleMarkAllRead = () => {
    const { markMessagesAsRead } = this.props
    const { socket, messages, selectedMessages} = this.state

      markMessagesAsRead(selectedMessages).then(() => {
        const markedMessages = messages.map(m => {

          if (selectedMessages.includes(m.id)) {
            m.unread = false
            socket.emit(events.MARK_AS_READ, m)
          }
          return m
        })
        this.setState({ messages: markedMessages })
      })
  }

  handleRemoveImportant = (id) => {
    const { messages, socket } = this.state
    console.log('triggered', id)
    const { removeImportantMessage } = this.props
    removeImportantMessage(id).then(() => {
      const markedMessages = messages.map(m => {
        if (m.id === id) {
          m.important = false
          socket.emit(events.REMOVE_IMPORTANT, m)
        }
        return m
      })
      this.setState({ messages: markedMessages })
    })
  }
  
  // Update browser dimensions
  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }
  
  render () {
    console.log(this.ids)
    const { users, socket, messages, width, height } = this.state
    const { user, info } = this.props

    return (
      <StyledSection>
        
        { /* CHAT HEADING */ }
        <ChatHeading
          user={user}
          users={users}
          socket={socket}
          close={this.handleCloseChat}
          info={info}
          saveChatHistory={this.handleEmailChatHistory}
          deleteChatHistory={this.handleDeleteChat}
          markAllRead={this.handleMarkAllRead}
           />
        
        { /* MESSAGES THREAD */ }
        <Messages
          messages={messages}
          user={user}
          markAsRead={this.handleSelectMessages}
          removeImportant={this.handleRemoveImportant}
          />

        { /* MESSAGE INPUT */ }
        <MessageInput
          width={width}
          height={height}
          sendMessage={this.handleSendMessage} />

      </StyledSection>
    )
  }
}

// MAP REDUX STATE AND DISPATCH TO PROPS
const mapStateToProps = state => {
  return {
    user: state.auth.user,
    loadedMessages: state.chat.messages,
    info: state.chat.flashMessage
  }
}

const mapDispatchToProps = (dispatch) => ({
  socketInit: (socket) => dispatch(actions.socketInit(socket)),
  getMessages: () => dispatch(actions.getMessages()),
  saveMessage: (message) => dispatch(actions.saveMessage(message)),
  toggleChat: (showChat) => dispatch( actions.toggleChat(showChat) ),
  emailChatHistory: (messages, user) => dispatch( actions.emailChatHistory(messages, user) ),
  deleteChatHistory: (room) => dispatch( actions.deleteChatHistory(room) ),
  markMessagesAsRead: (id) => dispatch( actions.markMessageAsRead(id) ),
  removeImportantMessage: (id) => dispatch( actions.removeImportantMessage(id) ),
  setFlashMessage: (flash) => dispatch( actions.setFlashMessage(flash) ),
})


// EXPORT
export default connect(mapStateToProps, mapDispatchToProps)(Chat)


// STYLED
const StyledSection = styled.section`

  background: ${colors.ter_grad};
  border: 2px solid ${colors.prim_color};
  border-top-left-radius: 20px;
  box-shadow: ${colors.box_shadow};
  max-width: 600px;
  overflow: hidden;
  margin: 30px auto 0;
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