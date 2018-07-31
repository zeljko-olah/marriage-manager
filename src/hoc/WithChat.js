import React, { Component } from 'react'

import { connect } from 'react-redux'
import {socketInit} from '../store/actions/index'

import io from 'socket.io-client'
const socketUrl = "http://localhost:3231"

class WithChat extends Component {
  state = {
    socket: null
  }

  componentDidMount = () => {
    this.initSocket()
  }

  initSocket = () => {
    const socket = io(socketUrl)
    this.setState({socket})
    this.props.socketInit(socket)
      socket.on('connect', ()=>{
        console.log("Connected");
      })
  }
  
  render () {
    const { socket } = this.state
    return (
      <div>
        {React.cloneElement(this.props.children, { socket: socket })}
      </div>
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

export default connect( mapStateToProps, mapDispatchToProps )( WithChat );