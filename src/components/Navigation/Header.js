import React, {Component} from 'react'

import { connect } from 'react-redux'
import * as actions from '../../store/actions'

// NAV ITEMS
import NavItems from './Header/NavItems'

import styled from 'styled-components';
import * as colors from '../../styles/variables'

// ICONS
import MenuIcon from 'react-icons/lib/md/menu'
import ChatIcon from 'react-icons/lib/md/forum'

class Header extends Component {
  render () {
    const { show, menuToggleClicked, showChat, toggleChat, count } = this.props
  
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
          { count ? (<span className="unread-count">{count}</span>) : null }
        </span>
      </StyledHeader>
    )
  }
} 

const mapStateToProps = state => {
  const user = state.auth.user
  const unreadMessagesCount = state.chat.messages
    .filter(m => m.unread === true && m.from !== user.name).length
  
  return {
    show: state.chat.showChat,
    count: unreadMessagesCount
  }
}

const mapDispatchToProps = dispatch => {
  return {
      toggleChat: (showChat) => dispatch( actions.toggleChat(showChat) )
  }
}

export default connect( mapStateToProps, mapDispatchToProps )( Header )


const StyledHeader = styled.header`
  margin: 0;
  padding: 10px 30px;
  border-bottom: 2px solid ${colors.prim_color};
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

  & .unread-count {
    width: 20px;
    height: 20px;
    border-radius: 20px;
    line-height: 20px;
    display: inline-block;
    font-size: 15px;
    font-weight: bold;
    color: ${colors.prim_color};
    background-color: ${colors.sec_color};
    position: absolute;
    top: 20px;
    left: 20px;
  }
`

