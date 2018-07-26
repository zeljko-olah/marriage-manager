import React from 'react'
import styled from 'styled-components';
import {primary_color} from '../../styles/variables'

import HomeIcon from 'react-icons/lib/md/home'
import ChatIcon from 'react-icons/lib/md/forum'
import HeartIcon from 'react-icons/lib/md/favorite-border'
import AddIcon from 'react-icons/lib/md/add'
import LocationIcon from 'react-icons/lib/md/location-on'
import LogoutIcon from 'react-icons/lib/md/eject'

export default ({setActive}) => {
  return (
    <StyledHeader>
      <nav>
        <i>
          <HomeIcon />
        </i>
        <i onClick={setActive}>
          <ChatIcon />
        </i>
        <i>
          <HeartIcon />
        </i>
        <i>
          <AddIcon />
        </i>
        <i>
          <LocationIcon />
        </i>
        <i>
          <LogoutIcon />
        </i>
      </nav>
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  margin: 0;
  padding: 15px 30px;
  border-bottom: 2px solid ${primary_color};
  background-color: transparent;
  color: ${primary_color};

  & nav {
    display: flex;
    justify-content: space-around;
  }

  & h1 {
    margin: 0;
  }

  & i {
    flex-basis: 20%;
    padding 20px 20px;
    text-align: center;
  }
  
  & svg {
    font-size: 50px;

  }


`

