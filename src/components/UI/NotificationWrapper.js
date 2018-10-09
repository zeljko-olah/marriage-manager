// IMPORT
import React from 'react'
import styled from 'styled-components'
import * as colors from '../../styles/variables'

import { connect } from 'react-redux'
import * as actions from '../../store/actions'

// COMPONENT
const Notification = ({info, setFlashMessage}) => {

  const disappear = (delay) => {
    setTimeout(function() {
      setFlashMessage('')
    }, delay)
  }

  const innerDiv = (e) => {
    if (e && info) {
     setTimeout(function() {
       e.click()
     }, 1000)
    }
  } 

  return (
    // WRAPPER
    <StyledNotify className={info ? 'open': 'close'}>
      
      { /* INNER DIV */ }
      <div 
        className={ info ? 'notification-open' :   'notification-closed'}
        ref={(e) => {innerDiv(e)}}
        onClick={() => {disappear(2000)}}>
        
        { /* FLASH MESSAGE */ }
        <p className={info.type}>{info.flashMessage}</p>
      </div>

    </StyledNotify>
  )
} 

// MAP STATE AND DISPATCH TO PROPS
const mapStateToProps = state => {
  return {
    info: state.chat.flashMessage,
    }
}

// MAP DISPATCH TO PROPS
const mapDispatchToProps = (dispatch) => ({
  setFlashMessage: (message) => dispatch(actions.setFlashMessage(message)),
})

// EXPORT
export default connect(mapStateToProps, mapDispatchToProps)(Notification)


// STYLED
const StyledNotify = styled.div`
  position: fixed;
  z-index: 100000;
  top: 0;
  left: 50%;
  transition: all 0.5s linear;
  cursor: wait;
  @media (max-width: 768px) {
    top: 0%;
  }

  &.close {
    opacity: 0;
    transform: translateY(-100%);
    pointer-events: none;
  }

  &.open {
    opacity: 1;
    transform: translateY(0%);
  transform: translateX(-50%);
    pointer-events: auto;
  }

  & div {
    margin-top: 10px;
    box-shadow: 0 0 20px 0 rgba(0,0,0, 0.5);
    text-align: center;
  }

  &.open p {
    padding: 10px 20px;
    font-size: 20px;
    @media (max-width: 768px) {
      font-size: 15px;
    }
    margin: 0;
    text-transform: uppercase;
    font-weight: 100;
  }
  
  &.close p {
    padding: 0;
  }

  & p.success {
    background: rgba(127,255,212, 0.8);
    color: ${colors.prim_font};
    border: 2px solid ${colors.prim_color}; 
  }

  & p.error {
    color: ${colors.prim_font};
    border: 2px solid ${colors.sec_color}; 
    background: ${colors.sec_light};
  }
`