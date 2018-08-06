import React from 'react'

import styled from 'styled-components'
import * as colors from '../../styles/variables'

import Backdrop from './Sidebar/Backdrop'

const SideBar = ({
  open, close, children, width, side
}) => {
  let toggleClass = open ? 'open' : 'close' 
  
  return (
    <div onDoubleClick={close}>

      { /* BACKDROP - OVERLAY */ }
      <Backdrop
        show={open}
      />
     
      { /* ASIDE */ }
      <StyledAside
        className={toggleClass}
        width={width}
        side={side}>
        {children}
      </StyledAside>
    </div>
  )
}

export default SideBar

const StyledAside = styled.aside`
  position: fixed;
  width: ${props => props.width};
  height: 100%;
  ${props => {
    return props.side === 'right' ? 'right: 0' : 'left: 0'
  } };
  top: 0;
  z-index: 200;
  padding: 32px 16px;
  border-right: 3px solid ${colors.prim_color};
  background-color: ${colors.backdrop};
  transition: transform 0.3s ease-out;

  @media (max-width: 768px) {
    padding: 0;
  }
  
  &.open {
    transform: translateX(0);
  }
  
  &.close {
    ${props => {
      return props.side === 'right' ?
       'transform: translateX(100%);' :
       'transform: translateX(-100%);'
    } };
  }
`

const StyledChatIcon = styled.div`
  & i.toggle {
    display: block;
    text-align: center;
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    padding: 10px;
    border-right: none;
    cursor: pointer;
  }

  & i.toggle svg {
    font-size: 40px !important;
    color: ${colors.prim_color};
    color: ${props => {
      return props.open ? `${colors.sec_color}` : `${colors.prim_color}`
    }};
    transition: all 0.1s ease-out; 

    &:hover {
      color: ${colors.sec_color};
    }
  }
`