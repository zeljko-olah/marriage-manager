import React from 'react'
import styled from 'styled-components'
import { 
  disabled_color,
  primary_gradient
 } from '../../styles/variables'

const LoginFrom = ({ submit, onFocus, error }) => {

  let payload = {}
  
  return (
    <form onSubmit={ (e) => {e.preventDefault(); submit(payload)} }>
      <StyledForm>

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
        
        { /* SUBMIT BUTTON */ }
        <button
          type="submit"
          disabled={ !!error }
          >Login</button>

      </StyledForm>
    </form>
  )
}

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;

  & input {
    width: 100%;
    margin: 0 auto;
    padding: 5px;
  }

  & label p {
    margin: 0;
    font-weight: 700;
    font-size: 15px;
  }

  & p {
    margin-top: 5px;
  }

  & button {
    margin-top: 20px;
    outline: none;
    border: none;
    padding: 8px;
    font-weight: 400;
    font-size: 20px;
    text-transform: uppercase;
    color: WhiteSmoke;
    cursor: pointer;
    background: ${primary_gradient};
  }

  & button:disabled {
    background: ${disabled_color};
    cursor: not-allowed;
  }
`

export default LoginFrom
