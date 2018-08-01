import React from 'react'
import styled from 'styled-components'
import {
  prim_color,
  sec_color,
  backdrop,
} from '../../styles/variables'

import Backdrop from './Sidebar/Backdrop'
import BackIcon from 'react-icons/lib/md/keyboard-backspace'

const SideDrawer = ({
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
        {side !== 'right' && (
          <i className="back">
            <BackIcon
              onClick={close}/>
          </i>
        )}
      </StyledAside>
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
  
  & i.back {
    display: block;
    text-align: center;
    margin-top: 20px;
  }

  & i.back svg {
    font-size: 50px !important;
    color: ${sec_color};
    cursor: pointer;
  }
`