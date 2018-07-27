import React from 'react'

// NAVLINK
import { NavLink } from 'react-router-dom';

// ICONS
import HomeIcon from 'react-icons/lib/md/home'
import ChatIcon from 'react-icons/lib/md/forum'
import HeartIcon from 'react-icons/lib/md/favorite-border'
import AddIcon from 'react-icons/lib/md/add'
import LocationIcon from 'react-icons/lib/md/location-on'

export default () => {
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
        
        { /* FAVORITE */ }
        <li>
          <NavLink
            to='/reminder'
            exact
            activeClassName='active'
          >
            <i>
              <HeartIcon />
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
        
      </ul>
    </nav>
  )
}
