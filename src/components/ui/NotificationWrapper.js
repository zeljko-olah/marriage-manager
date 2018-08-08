import React, {Fragment} from 'react'
import styled from 'styled-components'
import * as colors from '../../styles/variables'

// IMPORT
import { connect } from 'react-redux'
import * as actions from '../../store/actions'



const Notification = ({info, setFlashMessage}) => {

  return (
    <Fragment>
      { info ? 
        (<StyledNotify
          onClick={() => {setFlashMessage('')}} >

          <div className={ info ? 'notification-open' : 'notification-closed'}>

            <p className={info.type}>{info.flashMessage}</p>
          </div>
  
      </StyledNotify>) : null}
    </Fragment>
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
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${colors.backdrop};

  & div {
    margin-top: 100px;
    background: ${colors.backdrop};
    box-shadow: 0 0 20px 0 rgba(0,0,0, 0.5);

    text-align: center;
  }

  & div.notification-closed {
    transform: translateX(100%);
  }

  & p {
    font-size: 25px;
    margin: 0;
    padding: 10px 20px;
    text-transform: uppercase;
    font-weight: 100;
  }

  & p.success {
    color: ${colors.prim_color};
    border: 2px solid ${colors.prim_color}; 
  }

  & p.error {
    color: ${colors.sec_color};
    border: 2px solid ${colors.sec_color}; 
  }
`