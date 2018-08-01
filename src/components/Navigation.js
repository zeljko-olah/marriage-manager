import React, { Component } from 'react'

import Aux from '../hoc/Aux'
import Header from './Navigation/Header'
import Sidebar from './Navigation/Sidebar'

import NavItems from './Navigation/Header/NavItems'
import Chat from '../pages/Chat'

import styled from 'styled-components'
import {
  prim_color,
  danger,
  text_shadow
} from '../styles/variables'

class Navigation extends Component {

  state = {
    showMobileMenu: false,
    showChat: false
  }

  sideDrawerCloseHandler = () => {
    this.setState({ showMobileMenu: false })
  }
  closeChatHandler = () => {
    this.setState({ showChat: false })
  }

  menuToggleHandler = () => {
    this.setState( (prevState) => {
      return { showMobileMenu: !prevState.showMobileMenu }
    })
  }

  chatToggleHandler = () => {
    this.setState( (prevState) => {
      return { showChat: !prevState.showChat }
    })
  }
  
  render() {
    const { showMobileMenu, showChat } = this.state
    return (
      <Aux>

        { /* HEADER */ }
        <Header
          show={showMobileMenu}
          menuToggleClicked={this.menuToggleHandler}
          chatToggleClicked={this.chatToggleHandler}
        />

        { /* SIDEBAR */ }
        <Sidebar
          open={showMobileMenu}
          close={this.sideDrawerCloseHandler}
          width="280px"
        >
          <StyledLogo>
            MM
          </StyledLogo>
          { /* NAV ITEMS */ }
          <StyledAsideNav>
            <NavItems showText />
          </StyledAsideNav>
        </Sidebar>

        { /* CHAT SIDEBAR */ }
        <Sidebar
          open={showChat}
          close={this.closeChatHandler}
          width="100%"
          side="right"
        >
          <Chat />
        </Sidebar>
        
      </Aux>
    )
  }
}

export default Navigation

const StyledLogo = styled.h1`
  font-size: 50px;
  text-align: center;
  padding-bottom: 13px;
  margin-top: 0px;
  text-shadow: ${text_shadow};
  color: ${danger};
  border-bottom: 1px solid ${prim_color};
`

const StyledAsideNav = styled.div`
& nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

& nav li {
  padding: 10px;
}

& nav li a {
  color: ${prim_color};
}

& nav li span {
  display: inline-block;
  text-transform: uppercase;
  font-style: italic;
  font-weight: bold;
  margin-left: 10px;
}

& nav li i {
  font-size: 30px;
}

& nav li a:hover {
  transform: scale(1.1);
  color: ${danger};
}

& nav li a.active i,
& nav li a.active span {
  color: ${ danger };
}
`