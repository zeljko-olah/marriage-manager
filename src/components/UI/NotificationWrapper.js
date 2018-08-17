import React from 'react'
import styled from 'styled-components'
import * as colors from '../../styles/variables'

// IMPORT
import { connect } from 'react-redux'
import * as actions from '../../store/actions'

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
    //* WRAPPER
    <StyledNotify className={info ? 'open': 'close'}>
      
      { /* INNER DIV */ }
      <div 
        className={ info ? 'notification-open' :   'notification-closed'}
        ref={(e) => {innerDiv(e)}}
        onClick={() => {disappear(3000)}}>
        
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

const mapDispatchToProps = (dispatch) => ({
  setFlashMessage: (message) => dispatch(actions.setFlashMessage(message)),
})

// EXPORT
export default connect(mapStateToProps, mapDispatchToProps)(Notification)

const StyledNotify = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: absolute;
  z-index: 10000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: all 0.5s linear;
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
    pointer-events: auto;
  }

  & div {
    margin-top: 10px;
    box-shadow: 0 0 20px 0 rgba(0,0,0, 0.5);
    text-align: center;
  }

  & p {
    font-size: 15px;
    margin: 0;
    padding: 10px 20px;
    text-transform: uppercase;
    font-weight: 100;
  }

  & p.success {
    background: ${colors.prim_light};
    color: ${colors.prim_font};
    border: 2px solid ${colors.prim_color}; 
  }

  & p.error {
    color: ${colors.prim_font};
    border: 2px solid ${colors.sec_color}; 
    background: ${colors.sec_light};
  }
`