import React, { Component } from 'react'

import NavItems from '../components/Header/NavItems'
import styled from 'styled-components';
import {
  primary_color,
  danger,
  backdrop
} from '../styles/variables'


// INJECT HISTORY
import { history } from '../router/AppRouter' 

// ICONS
import MenuIcon from 'react-icons/lib/md/menu'
import LogoutIcon from 'react-icons/lib/md/eject'

// REDUX CONNECT
import { connect } from 'react-redux';
// authCheckState() is action we need to import
import * as actions from '../store/actions/index';

class Header extends Component {

  handleLogout = () => {
    this.props.logout()
    history.go('/')
  }
  
  render () {
    return (
      <StyledHeader>
      
      { /* MENU */ }
      <span>
        <i>
          <MenuIcon />
        </i>
      </span>

      <NavItems />
      
        
      { /* LOGOUT */ }
      <span onClick={this.handleLogout}>
        <i>
          <LogoutIcon />
        </i>
      </span>
      </StyledHeader>
    )
  }
}

// MAP DISPATCH TO PROPS - available on props object
const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch( actions.logout() )
  }
}

// EXPORT CONNECTED COMPONENT WITHOUT STATE
export default connect(null, mapDispatchToProps)(Header);

const StyledHeader = styled.header`
  margin: 0;
  padding: 10px 30px;
  border-bottom: 2px solid ${primary_color};
  background-color: ${backdrop};
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
    color: red;
    display: flex;
    justify-content: space-around;
  }

  & li,
  & span {
    padding: 0px 20px;
    text-align: center;
    cursor: pointer;
  }

  & li {
    flex-basis: 20%;
  }

  & span {
    display: inline-block;
  }

  & a.active i {
    color: ${ danger };
  }

  & i {
    color: ${primary_color};
  }
  
  & svg {
    font-size: 50px;
  }
`

