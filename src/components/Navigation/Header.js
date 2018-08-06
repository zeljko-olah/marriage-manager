import React, {Component} from 'react'

import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'

// NAV ITEMS
import NavItems from './Header/NavItems'

import styled from 'styled-components';
import * as colors from '../../styles/variables'

// ICONS
import MenuIcon from 'react-icons/lib/md/menu'
import ChatIcon from 'react-icons/lib/md/forum'

class Header extends Component {
  render () {
    const { show, menuToggleClicked, showChat, toggleChat } = this.props
  
    return (
      <StyledHeader>
      
        { /* MENU ICON */ }
        <span
          className="items"
          onClick={ menuToggleClicked }>
          <i className={show ? 'rotate': null}><MenuIcon /></i>
        </span>
  
        { /* NAV ITEMS */ }
        <NavItems />
  
        { /* MENU ICON */ }
        <span
          className="items"
          onClick={ () => {toggleChat(showChat)} }>
          <i className={show ? 'rotate': null}><ChatIcon /></i>
        </span>
      </StyledHeader>
    )
  }
} 

const mapStateToProps = state => {
  return {
    show: state.chat.showChat
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
  
  & i.rotate {
    transform: rotate(180deg);
    opacity: 0;
    color: ${colors.danger};
  }
  
  & svg {
    font-size: 40px;
  }
`

