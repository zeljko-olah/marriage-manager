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

const socketUrl = "http://localhost:3231"

class Chat extends Component {
  
  // State
  state = {
    socket: null,
    users: []
  }
  
  // Lifecycle
  componentDidMount = () => {
    console.log('mounted')
    this.initSocket()
  }

  componentWillUnmount() {
    console.log('Component Will Unmount')
		const { socket } = this.state
		socket.off('USER_CONNECTED')
    socket.off('UPDATE_USER_LIST')
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
    socket.emit('MESSAGE_SENT', message)

  }
  

  render () {
    const { users, socket } = this.state

    return (
      <StyledSection>
        <h1>Chat</h1>

        <ChatHeading
          users={users}
          socket={socket}
        />

        <Messages />

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
  color: inherit;
`