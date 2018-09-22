import React, {Component} from  'react'

import { NavLink } from  'react-router-dom';

// REDUX
import { connect } from  'react-redux';
import * as actions from '../../../store/actions';

// HISTORY
import { history } from '../../../router/AppRouter' 

import HomeIcon from  'react-icons/lib/md/home'
import ReminderIcon from  'react-icons/lib/md/alarm'
import TodoIcon from  'react-icons/lib/md/playlist-add-check'
import AddIcon from  'react-icons/lib/md/add'
import LocationIcon from  'react-icons/lib/md/location-on'
import LogoutIcon from  'react-icons/lib/md/eject'

class NavItems extends Component {
  render () {
    const { showText, logout } = this.props

    return (
      <nav>
        <ul>
        
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
              { showText && <span>Home</span> }
            </NavLink>
          </li>
  
          { /* CHAT */ }
          <li>
            <NavLink
              to='/todos'
              exact
              activeClassName='active'
            >
              <i>
                <TodoIcon />
              </i>
              { showText && <span>Todos</span> }
            </NavLink>
          </li>
          
          { /* TODOS */ }
          <li>
            <NavLink
              to='/add'
              exact
              activeClassName='active'
            >
              <i>
                <AddIcon />
              </i>
              { showText && <span>Todos</span> }
            </NavLink>
          </li>
          
          { /* FAVORITE */ }
          <li>
            <NavLink
              to='/reminder'
              exact
              activeClassName='active'
            >
              <i>
                <ReminderIcon />
              </i>
              { showText && <span>Reminder</span> }
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
              { showText && <span>Location</span> }
            </NavLink>
          </li>
  
          { /* LOGOUT */ }
          <li onClick={() => {logout(); history.go('/');}}>
            <a>
              <i>
                <LogoutIcon />
              </i>
              { showText && <span>Logout</span> }
            </a>
          </li>
          
        </ul>
      </nav>
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
export default connect(null, mapDispatchToProps)(NavItems);