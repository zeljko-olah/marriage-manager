/*
 * CHAT COMPONENT
 *
 */

import React, { Component } from 'react'

import { connect } from 'react-redux'
import {socketInit} from '../store/actions/index'

import ChatHeading from './parts/ChatHeading'
import Messages from './parts/Messages'
import MessageInput from './parts/MessageInput'

import io from 'socket.io-client'

import styled from 'styled-components'
import { 
  prim_color,
  text_shadow,
  box_shadow
 } from '../styles/variables'
 
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
    messages: []
  }
  
  // Lifecycle
  componentDidMount = () => {
    this.initSocket()
  }

  componentWillUnmount() {
    console.log('Component Will Unmount')
		const { socket } = this.state
		socket.off('USER_CONNECTED')
    socket.off('UPDATE_USER_LIST')
    socket.off('NEW_MESSAGE')
    socket.emit('CLIENT_DISCONNECTED')
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
    socket.emit('JOIN', `${user.name} logged in`, {...user, id: socket.id} )
    socket.on('USER_CONNECTED', (users)=>{
			this.setState({ users })
    })
    socket.on('UPDATE_USER_LIST', (users) => {
      console.log("users", users)
      this.setState({users})
    })
    socket.on('NEW_MESSAGE', (message) => {
      const { messages } = this.state
      const formatedTime = moment(message.createdAt).format('h:mm a')
      const newMessage = Object.assign({}, message, {createdAt: formatedTime})
      const newMessages = messages.concat(newMessage)
      this.setState({messages: newMessages})

    })
    socket.on('disconnect', (message) => {
      // Log
      console.log('Disconnected from server');
      console.log(message)
    })
  }
  
  // Send message
  handleSendMessage = (message) => {
    console.log('Sending message...', message)
    const { socket } = this.state
    socket.emit('MESSAGE_SENT', message, () => {
      console.log('AKNOWLEDGEMENT FIRED:::')
    })
  }
  
  render () {
    const { users, socket, messages } = this.state
    const { user } = this.props

    return (
      <StyledSection>
        
        { /* CHAT HEADING */ }
        <ChatHeading
          user={user}
          users={users}
          socket={socket} />
        
        { /* MESSAGES THREAD */ }
        <Messages
          messages={messages}
          user={user} />

        { /* MESSAGE INPUT */ }
        <MessageInput
          sendMessage={this.handleSendMessage} />

      </StyledSection>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  }
}

const mapDispatchToProps = (dispatch) => ({
  socketInit: (socket) => dispatch(socketInit(socket))
})

export default connect(mapStateToProps, mapDispatchToProps)(Chat)

const StyledSection = styled.section`
  background-color: #fefeee;
  border: 3px solid ${prim_color};
  border-top-left-radius: 20px;
  box-shadow: ${box_shadow};
  max-width: 600px;
  margin: 100px auto 0;
  @media (max-width: 768px) {
    margin: 50px auto 0;
  }

  & h1 {
    text-align: center;
    font-size: 50px;
    @media (max-width: 768px) {
      font-size: 30px;
    }
    font-style: italic;
    padding-bottom: 5px;
    margin: 20px 30px 20px;
    border-bottom: 1px solid ${prim_color}
    text-shadow: ${text_shadow};
    color: tomato;
  }
`