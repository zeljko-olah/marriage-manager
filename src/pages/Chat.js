/*
 * CHAT COMPONENT
 *
 */

import React, { Component } from 'react'

import { connect } from 'react-redux'
import {socketInit} from '../store/actions/index'

import ChatHeading from '../components/Chat/ChatHeading'
import Messages from '../components/Chat/Messages'
import MessageInput from '../components/Chat/MessageInput'

import io from 'socket.io-client'

import styled from 'styled-components'
import { 
  prim_color,
  text_shadow,
  box_shadow
 } from '../styles/variables'
 
import moment from 'moment';

const socketUrl = "http://localhost:3231"

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
  
  // Handle socket
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
        <h1>Chat</h1>

        <ChatHeading
          users={users}
          socket={socket}
        />

        <Messages
          messages={messages}
          user={user}
           />

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
  background-color: #fefefe;
  border: 3px solid ${prim_color};
  border-top-left-radius: 20px;
  box-shadow: ${box_shadow};
  width: 600px;
  margin: 0 auto;

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