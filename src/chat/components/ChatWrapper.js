// IMPORTS
import React, { Component } from 'react'

import Sidebar from '../../components/Navigation/Sidebar'
import Chat from './Chat'

import { connect } from 'react-redux'
import * as actions from '../../store/actions'

import {socketInit} from '../../store/actions'

// COMPONENT
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
    const { user, show } = this.props

    return (
      <div>
      { user ? (

        // SIDEBAR
        <Sidebar
          width="100%"
          side="right"
          open={show}
        >
          { /* CHAT */ }
          <Chat />
          
        </Sidebar>)
        :
        null }
      </div>
    )
  }
}

// MAP REDUX STATE AND PROPS
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

// EXPORT
export default connect(mapStateToProps, mapDispatchToProps)(ChatWrapper)