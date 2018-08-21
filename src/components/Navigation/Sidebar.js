import React from 'react'

import styled from 'styled-components'
import * as colors from '../../styles/variables'

import Backdrop from './Sidebar/Backdrop'

const SideBar = ({ open, close, children, width, side }) => {

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

// EXPORT
export default SideBar

// STYLED
const StyledAside = styled.aside`
  position: fixed;
  width: ${props => props.width};
  height: 100%;
  ${props => {
    return props.side === 'right' ? 
    'right: 0; z-index: 100;' : 'left: 0; z-index: 200;'
  } };
  top: 0;
  padding: 32px 16px;
  border-right: 3px solid ${colors.prim_color};
  background: ${colors.overlay};
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