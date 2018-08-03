/*
 * CHAT COMPONENT
 *
 */

import React, { Component } from 'react'

import { connect } from 'react-redux'
import {socketInit} from '../../store/actions/index'

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
      console.log("users", users)
      this.setState({users})
    })
    socket.on(events.NEW_MESSAGE, (message) => {
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

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }
  
  // Send message
  handleSendMessage = (message) => {
    console.log('Sending message...', message)
    const { socket } = this.state
    socket.emit(events.MESSAGE_SENT, message, () => {
      console.log('AKNOWLEDGEMENT FIRED:::')
    })
  }
  
  render () {
    const { users, socket, messages, width, height } = this.state
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
          width={width}
          height={height}
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
  background: ${colors.ter_grad};
  border: 2px solid ${colors.prim_color};
  border-top-left-radius: 20px;
  box-shadow: ${colors.box_shadow};
  max-width: 600px;
  overflow: hidden;
  margin: 30px auto 0;
  @media (max-width: 768px) {
    margin: 0px auto 0;
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
    border-bottom: 1px solid ${colors.prim_color}
    text-shadow: ${colors.text_shadow};
    color: tomato;
  }
`