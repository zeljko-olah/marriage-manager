import React from 'react'
import styled from 'styled-components'
import {
  primary_color,
  danger,
  backdrop,
  text_shadow
} from '../../styles/variables'

import Backdrop from './Sidebar/Backdrop'
import NavItems from './Header/NavItems'

const SideDrawer = ( {open, close} ) => {
  let cls = open ? 'open' : 'close' 
  
  return (
    <div onClick={close}>
     <Backdrop
      show={open}
     />

     <StyledAside className={cls}>
      <h1>MM</h1>

      <NavItems showText />
     
     </StyledAside>
    </div>
  )
}

export default SideDrawer

// STYLED
const StyledAside = styled.aside`
  position: fixed;
  width: 280px;
  max-width: 70%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 200;
  background-color: ${backdrop};
  border-right: 3px solid ${primary_color};
  padding: 32px 16px;
  transition: transform 0.3s ease-out;
  
  &.open {
    transform: translateX(0);
  }
  
  &.close {
    transform: translateX(-100%);
  }
  
  & h1 {
    font-size: 50px;
    text-align: center;
    padding-bottom: 20px;
    margin-top: 100px;
    text-shadow: ${text_shadow};
    color: ${danger};
    border-bottom: 1px solid ${primary_color};
  }

  & nav ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  & nav li {
    padding: 10px;
  }
  
  & nav li a {
    color: ${primary_color};
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