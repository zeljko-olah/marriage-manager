import React, {Component} from 'react'

import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import {selectUnreadCount, selectImportantCount} from '../../store/selectors/chat'


// NAV ITEMS
import NavItems from './Header/NavItems'

import events from '../../events'

import styled from 'styled-components';
import * as colors from '../../styles/variables'

// ICONS
import MenuIcon from 'react-icons/lib/md/menu'
import ChatIcon from 'react-icons/lib/md/forum'

class Header extends Component {

  componentDidUpdate(prevProps) {
    const { socket, getMessages } = this.props
    if (socket && prevProps.socket !== socket) {
      socket.on(events.UNREAD_COUNT_UPDATED, () => {
        getMessages()
      })
      socket.on(events.IMPORTANT_COUNT_UPDATED, () => {
        getMessages()        
      })
    }
  }

  componentWillUnmount() {
    const { socket } = this.props
    socket.off(events.UNREAD_COUNT_UPDATED)
    socket.off(events.IMPORTANT_COUNT_UPDATED)
  }

  render () {
    const { 
      show,
      menuToggleClicked,
      showChat,
      toggleChat,
      countUnread,
      countImportant
    } = this.props

    return (
      <StyledHeader>
      
        { /* MENU ICON */ }
        <span
          className="items"
          onClick={ menuToggleClicked }>
          <i><MenuIcon /></i>
        </span>
  
        { /* NAV ITEMS */ }
        <NavItems />
  
        { /* CHAT ICON */ }
        <span
          className="items"
          onClick={ () => {toggleChat(showChat)} }>
          <i className={show ? 'open-chat': null}><ChatIcon /></i>
          { countUnread ? (<span className="unread-count">{countUnread}</span>) : null }
          { countImportant ? (<span className="important-count">{countImportant}!</span>) : null }
          
        </span>
      </StyledHeader>
    )
  }
} 

const mapStateToProps = state => {  
  return {
    socket: state.chat.socket,
    show: state.chat.showChat,
    countUnread: selectUnreadCount(state),
    countImportant: selectImportantCount(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
      toggleChat: (showChat) => dispatch( actions.toggleChat(showChat) ),
      getMessages: () => dispatch(actions.getMessages())
  }
}

export default connect( mapStateToProps, mapDispatchToProps )( Header )


const StyledHeader = styled.header`
  position: fixed;
  z-index: 10000;
  width: 100vw;
  top: 0;
  right: 0;
  margin: 0;
  padding: 10px 30px;
  border-bottom: 2px solid ${colors.prim_color};
  background: ${colors.overlay};
  display: flex;
  justify-content: space-between;
  align-items: center;

  & nav {
    flex-basis: 70%;
    @media (max-width: 768px) {
      display: none;
    }
  }
  
  & ul {
    list-style-type: none;
    display: flex;
    justify-content: space-around;
    color: red;
  }
  
  & li,
  & span.items {
    text-align: center;
    cursor: pointer;
  }
  
  & li {
    flex-basis: 20%;
  }
  
  & span {
    display: inline-block;
  }

  & span.items {
    position: relative;
    width: 100px;
    padding: 0px 20px;
  }

  & span.items:first-child i {
    transition: all 0.2s linear;
  }

  & a.active i {
    color: ${colors.danger};
  }
  
  & i {
    display: block;
    color: ${colors.prim_color};
    transition: all 0.1s ease-out;
  }

  & i:hover {
    color: ${colors.danger};
    transform: scale(1.2);
  }
  
  & i.open-chat {
    color: ${colors.danger};
  }
  
  & svg {
    font-size: 40px;
  }

  & .unread-count,
  & .important-count {
    position: absolute;
    display: inline-block;
    font-size: 15px;
    font-weight: bold;
  }

  & .unread-count {
    width: 20px;
    height: 20px;
    top: 20px;
    left: 20px;
    line-height: 20px;
    border-radius: 20px;
    color: ${colors.prim_color};
    background-color: ${colors.sec_color};
  }
  & .important-count {
    width: 30px;
    height: 30px;
    top: -10px;
    right: 10px;
    font-size: 20px;
    line-height: 30px;
    border-radius: 30px;
    background-color: black;
    color: ${colors.sec_color};
  }
`

