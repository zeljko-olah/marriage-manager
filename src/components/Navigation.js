import React, { Component, Fragment } from 'react'

import Header from './Navigation/Header'

import NavItems from './Navigation/Header/NavItems'
import Sidebar from './Navigation/Sidebar'

import styled from 'styled-components'
import {
  prim_color,
  danger
} from '../styles/variables'

class Navigation extends Component {

  state = {
    showMobileMenu: false,
  }

  sideDrawerCloseHandler = () => {
    this.setState({ showMobileMenu: false })
  }

  menuToggleHandler = () => {
    this.setState( (prevState) => {
      return { showMobileMenu: !prevState.showMobileMenu }
    })
  }
  
  render() {
    const { showMobileMenu } = this.state
    return (
      <Fragment>

        { /* HEADER */ }
        <Header
          show={showMobileMenu}
          menuToggleClicked={this.menuToggleHandler}
          showMobileMenu={showMobileMenu}
          chatToggleClicked={this.chatToggleHandler}
        />

        { /* SIDEBAR */ }
        <Sidebar
          open={showMobileMenu}
          close={this.sideDrawerCloseHandler}
          width="220px"
        >
          { /* NAV ITEMS */ }
          <StyledAsideNav>
            <NavItems showText />
          </StyledAsideNav>
        </Sidebar>
        
      </Fragment>
    )
  }
}

export default Navigation

const StyledAsideNav = styled.div`
margin-top: 100px;
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
  cursor: pointer;
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