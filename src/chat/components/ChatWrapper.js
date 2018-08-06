import React, { Component } from 'react'

import Sidebar from '../../components/Navigation/Sidebar'
import Chat from './Chat'

import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'

import {socketInit} from '../../store/actions/index'

class ChatWrapper extends Component {

  componentDidMount = () => {
    document.addEventListener('keydown', this.escapeFunction, false)
  }

  componentWillUnmount = () => {
    document.removeEventListener('keydown', this.escapeFunction, false)
  }

  escapeFunction = (e) => {
    const { show, toggleChat } = this.props
    if (e.keyCode === 27) {
      toggleChat(show)
    }
  }
  
  render() {
    const { user, show, toggleChat } = this.props
    return (
      <div>
      { user ? (
        <Sidebar
          width="100%"
          side="right"
          open={show}
          toggleSidebar={toggleChat}
        >
          <Chat />
        </Sidebar>)
        :
        null }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    show: state.chat.showChat
  }
}

const mapDispatchToProps = (dispatch) => ({
  socketInit: (socket) => dispatch(socketInit(socket)),
  toggleChat: (showChat) => dispatch( actions.toggleChat(showChat) )
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatWrapper)