import React from 'react'
import styled from 'styled-components'
import {
  prim_color,
  sec_color,
  backdrop,
} from '../../styles/variables'

import Backdrop from './Sidebar/Backdrop'
import ChatIcon from 'react-icons/lib/md/forum'

const SideDrawer = ({
  open, close, children, width, side, toggleChat
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

      {side === 'right' && (
        <StyledChatIcon
          open={open}>
          <i
            className="back"
            onClick={toggleChat}>
            <ChatIcon/>
          </i>
        </StyledChatIcon>
      )}
    </div>
  )
}

export default SideDrawer

const StyledAside = styled.aside`
  position: fixed;
  width: ${props => props.width};
  // max-width: 70%;
  height: 100%;
  // left: 0;
  ${props => {
    return props.side === 'right' ? 'right: 0' : 'left: 0'
  } };
  top: 0;
  z-index: 200;
  background-color: ${backdrop};
  border-right: 3px solid ${prim_color};
  padding: 32px 16px;
  transition: transform 0.3s ease-out;
  
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
  & i.back {
    display: block;
    text-align: center;
    position: fixed;
    z-index: 1000;
    top: 50%;
    right: 0;
    background: ${backdrop};
    padding: 10px;
    border: 2px solid ${prim_color};
    border-right: none;
    cursor: pointer;

  }

  & i.back svg {
    font-size: 40px !important;
    color: ${prim_color};
    color: ${props => {
      return props.open? `${prim_color}` : `${sec_color}`
    }};
    transition: all 0.1s ease-out; 

    &:hover {
      color: ${sec_color};
    }
  }
`