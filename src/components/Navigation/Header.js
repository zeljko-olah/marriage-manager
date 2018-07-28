import React, { Component } from 'react'

import NavItems from './Header/NavItems'
import styled from 'styled-components';
import {
  primary_color,
  danger,
  backdrop
} from '../../styles/variables'


// INJECT HISTORY
import { history } from '../../router/AppRouter' 

// ICONS
import MenuIcon from 'react-icons/lib/md/menu'
import LogoutIcon from 'react-icons/lib/md/eject'

// REDUX CONNECT
import { connect } from 'react-redux';
// authCheckState() is action we need to import
import * as actions from '../../store/actions/index';

class Header extends Component {

  handleLogout = () => {
    this.props.logout()
    history.go('/')
  }
  
  render () {
    const { show } = this.props
    return (
      <StyledHeader>
      
      { /* MENU */ }
      <span
        className="items"
        onClick={ this.props.drawerToggleClicked }>
        <i className={show ? 'rotate': null}><MenuIcon /></i>
      </span>

      <NavItems />
      
        
      { /* LOGOUT */ }
      <span
        className="items"
        onClick={this.handleLogout}>
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
  & span.items {
    width: 100px;
    padding: 0px 20px;
    text-align: center;
    cursor: pointer;
  }

  & span.items:first-child i {
    transition: all 0.2s linear;
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
    display: block;
    color: ${primary_color};
    transition: all 0.1s ease-out;
  }

  & i:hover {
    color: ${danger};
    transform: scale(1.2);
  }
  
  & i.rotate {
    transform: rotate(180deg);
    opacity: 0;
    color: ${danger};
  }
  
  & svg {
    font-size: 50px;
  }
`

