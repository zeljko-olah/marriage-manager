import React, { Component } from 'react'

import io from 'socket.io-client'

const socketUrl = 'http://localhost:3231'

export default class Chat extends Component {

  state = {
    socket: null,
    user: null
  }

  componentWillMount() {
    this.initSocket()
  }

  initSocket = () => {
    const socket = io(socketUrl)
    socket.on('connect', () => {
      console.log("Connected")
    })

    this.setState({socket})
  }
  

  render () {
    return (
      <section>
        <h1>Chat</h1>
      </section>
    )
  }
}
