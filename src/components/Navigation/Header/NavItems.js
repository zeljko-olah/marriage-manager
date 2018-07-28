import React from 'react'

// NAVLINK
import { NavLink } from 'react-router-dom';

// ICONS
import HomeIcon from 'react-icons/lib/md/home'
import ChatIcon from 'react-icons/lib/md/forum'
import HeartIcon from 'react-icons/lib/md/favorite-border'
import AddIcon from 'react-icons/lib/md/add'
import LocationIcon from 'react-icons/lib/md/location-on'

export default ({ showText }) => {
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
            to='/chat'
            exact
            activeClassName='active'
          >
            <i>
              <ChatIcon />
            </i>
            { showText && <span>Chat</span> }
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
              <HeartIcon />
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
        
      </ul>
    </nav>
  )
}
