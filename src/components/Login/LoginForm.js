import React from 'react'
import styled from 'styled-components'
import * as colors from '../../styles/variables'
import { StyledButton, StyledForm, StyledShadow } from '../../styles/section'

 

const LoginFrom = ({ submit, onFocus, error }) => {

  let payload = {}
  
  return (
    <form onSubmit={ (e) => {e.preventDefault(); submit(payload)} }>
      <StyledForm>
        <StyledShadow>
          <StyledShadow>
            { /* EMAIL */ }
            <div>
              <label htmlFor="email">
                <p>Email</p>
              </label>

              <p>
                <input
                  type="text"
                  id="email"
                  onFocus={onFocus}
                  ref={ input => { payload.email = input } }
                  />
              </p>
            </div>

            { /* PASSWORD */ }
            <div>
              <label htmlFor="password">
                <p>Password</p>
              </label>

              <p>
                <input
                  type="password"
                  id="password"
                  onFocus={onFocus}
                  ref={ input => { payload.password = input } }
                  />
              </p>
            </div>
          </StyledShadow>
          
          { /* SUBMIT BUTTON */ }
          <StyledShadow>
            <StyledButton
              type="submit"
              disabled={ !!error }
              >Login</StyledButton>
            </StyledShadow>
        </StyledShadow>

      </StyledForm>
    </form>
  )
}

export default LoginFrom
