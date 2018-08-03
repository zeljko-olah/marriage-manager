import React, { Component } from 'react'

import Sidebar from '../../components/Navigation/Sidebar'
import Chat from './Chat'

import ChatIcon from 'react-icons/lib/md/forum'

import { connect } from 'react-redux'
import {socketInit} from '../../store/actions/index'

class ChatWrapper extends Component {

  state = {
    showChat: true
  }

  componentDidMount = () => {
    document.addEventListener('keydown', this.escapeFunction, false)
  }

  componentWillUnmount = () => {
    document.removeEventListener('keydown', this.escapeFunction, false)
  }

  closeChatHandler = () => {
    this.setState({ showChat: false })
  }

  chatToggleHandler = () => {
    this.setState( (prevState) => {
      return { showChat: !prevState.showChat }
    })
  }

  escapeFunction = (e) => {
    if (e.keyCode === 27) {
      this.chatToggleHandler()
    }
  }
  
  render() {
    const {showChat} = this.state
    const { user } = this.props
    return (
      <div>
      { user ? (
        <Sidebar
          width="100%"
          side="right"
          open={showChat}
          close={this.closeChatHandler}
          toggleSidebar={this.chatToggleHandler}
          sidebarIcon={<ChatIcon/>}
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
    user: state.auth.user
  }
}

const mapDispatchToProps = (dispatch) => ({
  socketInit: (socket) => dispatch(socketInit(socket))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatWrapper)