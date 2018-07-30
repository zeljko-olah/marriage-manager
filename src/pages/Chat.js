import React, { Component } from 'react'
import { connect } from 'react-redux'

class Chat extends Component {

  render () {
    const {socket, user} = this.props
    let welcomeMessage = 'Wait a minute, please!'
    console.log(socket)

    if (socket !== null) {
      welcomeMessage = (<p>{user.name} is Online!</p>)
    }
    return (
      <section>
        <h1>Chat</h1>
        {welcomeMessage}
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    socket: state.chat.socket,
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(Chat)