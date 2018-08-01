import React from 'react'

import { NavLink } from 'react-router-dom';

import HomeIcon from 'react-icons/lib/md/home'
import HeartIcon from 'react-icons/lib/md/favorite-border'
import TodoIcon from 'react-icons/lib/md/playlist-add-check'
import AddIcon from 'react-icons/lib/md/add'
import LocationIcon from 'react-icons/lib/md/location-on'

const NavItems = ({ showText }) => {
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

export default NavItems