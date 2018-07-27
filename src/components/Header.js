import React, { Component } from 'react'
import styled from 'styled-components';
import {
  primary_color,
  danger
} from '../styles/variables'

// NAVLINK
import { NavLink } from 'react-router-dom';
// INJECT HISTORY
import { history } from '../router/AppRouter' 

// ICONS
import MenuIcon from 'react-icons/lib/md/menu'
import HomeIcon from 'react-icons/lib/md/home'
import ChatIcon from 'react-icons/lib/md/forum'
import HeartIcon from 'react-icons/lib/md/favorite-border'
import AddIcon from 'react-icons/lib/md/add'
import LocationIcon from 'react-icons/lib/md/location-on'
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
        <nav>
          <ul>
  
            { /* MENU */ }
            <li>
              <i>
                <MenuIcon />
              </i>
            </li>
  
            { /* HOME */ }
            <li>
              <NavLink
                to='/welcome'
                exact 
                activeClassName='active'
              >
                <i>
                  <HomeIcon />
                </i>
              </NavLink>
            </li>
  
            { /* CHAT */ }
            <li>
              <NavLink
                to='/chat'
                exact
                activeClassName='active'
              >
                <i>
                  <ChatIcon />
                </i>
              </NavLink>
            </li>
            
            { /* TODOS */ }
            <li>
              <NavLink
                to='/todos'
                exact
                activeClassName='active'
              >
                <i>
                  <AddIcon />
                </i>
              </NavLink>
            </li>
            
            { /* LOCATION */ }
            <li>
              <NavLink
                to='/location'
                exact
                activeClassName='active'
              >
                <i>
                  <LocationIcon />
                </i>
              </NavLink>
            </li>
  
            { /* FAVORITE */ }
            <li>
              <i>
                <HeartIcon />
              </i>
            </li>
  
            { /* LOGOUT */ }
            <li onClick={this.handleLogout}>
              <i>
                <LogoutIcon />
              </i>
            </li>
          </ul>
        </nav>
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
  padding: 15px 30px;
  border-bottom: 2px solid ${primary_color};
  background-color: transparent;

  & ul {
    list-style-type: none;
    color: red;
    display: flex;
    justify-content: space-around;
  }

  & li {
    flex-basis: 20%;
    padding: 20px 20px;
    text-align: center;
    cursor: pointer;
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

