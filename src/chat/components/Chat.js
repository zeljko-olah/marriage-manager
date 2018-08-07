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
    width: 0,
    height: 0
  }
  
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
    console.log('Component Will Unmount')
		const { socket } = this.state
		socket.off(events.USER_CONNECTED)
    socket.off(events.UPDATE_USER_LIST)
    socket.off(events.NEW_MESSAGE)
    socket.emit(events.CLIENT_DISCONNECTED)
    window.removeEventListener('resize', this.updateWindowDimensions)
  }
  
  // Handle socket events
  initSocket = () => {
    const socket = io(socketUrl)
    const { user } = this.props
    this.setState({socket})
    // this.props.socketInit(socket)
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
    socket.on(events.NEW_MESSAGE, (message) => {
      const { messages } = this.state
      const formatedTime = moment(message.createdAt).format('h:mm a')
      const newMessage = Object.assign({}, message, {createdAt: formatedTime})
      // const newMessages = messages.concat(newMessage)
      this.setState({messages: [...messages, newMessage]})
    })
    socket.on('disconnect', (message) => {
      console.log('Disconnected from server');
    })
  }
  
  // Send message
  handleSendMessage = (message) => {
    const { socket } = this.state
    const { saveMessage, user } = this.props
    if (message.from !== 'Admin') {
      saveMessage({
        text: message,
        userId: user.id
      })
    }
    socket.emit(events.MESSAGE_SENT, message, (info) => {
      console.log(info)
    })
  }
  
  // Update browser dimensions
  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  closeChat = () => {
    const { toggleChat } = this.props
    toggleChat(true)
  }

  saveChat = () => {
    const { saveHistory, user } = this.props
    const { messages } = this.state
    saveHistory(messages, user)
  }
  
  render () {
    const { users, socket, messages, width, height } = this.state
    const { user, saveHistory } = this.props

    return (
      <StyledSection>
        
        { /* CHAT HEADING */ }
        <ChatHeading
          user={user}
          users={users}
          socket={socket}
          close={this.closeChat}
          saveChatHistory={this.saveChat} />
        
        { /* MESSAGES THREAD */ }
        <Messages
          messages={messages}
          user={user} />

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
    loadedMessages: state.chat.messages
  }
}

const mapDispatchToProps = (dispatch) => ({
  socketInit: (socket) => dispatch(actions.socketInit(socket)),
  getMessages: () => dispatch(actions.getMessages()),
  saveMessage: (message) => dispatch(actions.saveMessage(message)),
  toggleChat: (showChat) => dispatch( actions.toggleChat(showChat) ),
  saveHistory: (messages, user) => dispatch( actions.saveHistory(messages, user) )

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