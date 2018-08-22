import React from 'react'
import styled from 'styled-components'
import * as colors from '../../styles/variables'
import { StyledForm, StyledButton } from '../../styles/section'

 

const LoginFrom = ({ submit, onFocus, error }) => {

  let payload = {}
  
  return (
    <form onSubmit={ (e) => {e.preventDefault(); submit(payload)} }>
      <StyledForm>
        <div>
          <div>
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
          </div>
          
          { /* SUBMIT BUTTON */ }
          <StyledButton
            type="submit"
            disabled={ !!error }
            >Login</StyledButton>
        </div>

      </StyledForm>
    </form>
  )
}

// const StyledForm = styled.div`
//   & div {
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     padding: 10px;
//     background-color: ${colors.backdrop};
//   }

//   @media (max-width: 768px) {
//     height:calc(100vh - 110px);
     
//     > * {
//       margin: 30px 0;
//     }
//   }

//   & input {
//     width: 100%;
//     margin: 0 auto;
//     padding: 8px;
//     color: #777;
//     background-color: transparent;
//     border: 2px solid Aquamarine;
//   }

//   & label p {
//     margin: 0;
//     font-weight: 100;
//     font-size: 20px;
//     color: Aquamarine;
//     text-transform: uppercase;
//   }

//   & p {
//     margin-top: 5px;
//   }

//   & button {
//     margin-top: 20px;
//     outline: none;
//     border: none;
//     padding: 10px;
//     font-weight: 100;
//     font-size: 25px;
//     text-transform: uppercase;
//     color: #555;
//     background-color: ${colors.prim_light};
//     border: 2px solid Aquamarine;
//     cursor: pointer;
//   }

//   & button:disabled {
//     background: ${colors.disabled};
//     cursor: not-allowed;
//   }
// `

export default LoginFrom
