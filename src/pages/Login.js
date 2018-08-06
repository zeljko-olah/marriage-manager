import React, { Component } from 'react'

import LoginForm from '../components/Login/LoginForm'

import styled from 'styled-components'
import * as colors from '../styles/variables'


import MDArrowUp from 'react-icons/lib/md/keyboard-arrow-up'
import MDArrowDown from 'react-icons/lib/md/keyboard-arrow-down'

import { connect } from 'react-redux'
import * as actions from '../store/actions/index'

import { validateForm } from '../shared/utility'

class Login extends Component {
  
  state = {
    openLogin: false
  }

  submit = (payload) => {
    const { login } = this.props
    const { email, password } = payload
    const error = validateForm(email.value, password.value)
    if (error) {
    // Dispatch setErrors
    this.props.setErrors({ error })
    return
    }
    // Dispatch login
    login(email.value, password.value)
      .then((res) => {
      this.clearForm(payload)
    })
  }

  // CLEAR THE FORM
  clearForm = (payload) => {
    const { email, password } = payload
    if (email && password) {
      email.value = ''
      password.value = ''
    }
  }

  onFocusHandler = () => {
    this.props.setErrors({ error: null })
  }

  toggleLogin = () => {
    this.setState({openLogin: !this.state.openLogin})
  }
  
  render() {
    const { openLogin } = this.state
    const { error } = this.props

    return (
      <LoginFormWrapper>

        { /* FORM HEADER */ }
        <StyledFormHeader>
          <p 
            className={ error ? 'error' : null }
            onClick={ this.toggleLogin }>

          { /* SIGN IN OR ERROR */ }
          { error ? error : 'Sign In' }

            { /* ICON */ }
            <i>
              { openLogin ? <MDArrowDown /> : <MDArrowUp />  }
            </i>
          </p>
        </StyledFormHeader>

        { /* LOGIN FORM */ }
        {openLogin ? (
          <LoginForm
            error={ error }
            submit={this.submit}
            onFocus={this.onFocusHandler} />
        ) : null }  
        
        { /* LOGIN FORM FOOTER */ }        
        {openLogin ? 
          <StyledFormFooter>
            This App is <strong>private :)</strong>
          </StyledFormFooter> 
          : 
          null }
      </LoginFormWrapper>
    )
  }
}

/*
 * REDUX
 *
 */


// MAP STATE TO PROPS
const mapStateToProps = state => {
  return {
    error: state.auth.error
  }
}

// MAP DISPATCH TO PROPS
const mapDispatchToProps = dispatch => {
  return {
      // dispatch action when submit handler is called
      login: ( email, password ) => dispatch( actions.auth( email, password ) ),
      setErrors: (error) => dispatch( actions.setErrors(error) )
  };
};

/*
 * STYLED COMPONENTS
 *
 */

const LoginFormWrapper = styled.div`
  width: 300px;
  position: fixed;
  bottom: 0;
  right: 20px;
  border: 1px solid WhiteSmoke;
  background-color: transparent;
  overflow: hidden;
  box-shadow: 0 0 5px #000000;
  font-family: 'Cardo', serif;
  font-weight: 400;
  font-size: 15px;

  @media (max-width: 768px) {
    bottom: 0;
    right: 0;
    width: 100vw;
  }

  & span.error {
    position: absolute;
    color: tomato;
    top: 0;
    left: 0;
  }
  `
  
  const StyledFormHeader = styled.div`
  margin: 0;
  padding-right: 1rem;
  text-align: center;
  font-weight: 900;
  color: grey;
  background-color: ${colors.prim_color};
  cursor: pointer;
  

  & p {
    position: relative;
    margin: 0;
    padding: 10px;
    line-height: 45px; 
    text-transform: uppercase;
    font-size: 20px;
  }

  & p.error {
    color: ${colors.danger};
    font-size: 14px;
  }

  & svg {
    position: absolute;
    top: 12px;
    right: 0;
    font-size: 40px;
  }
`

const StyledFormFooter = styled.p`
  text-align: center;
`

/*
 * EXPORT
 *
 */

export default connect( mapStateToProps, mapDispatchToProps )( Login )