import styled from 'styled-components'
import * as colors from './variables'

// PAGE SECTIONS
export const StyledSection = styled.section`
  background-color: ${colors.backdrop};
  border: 3px solid ${colors.prim_color};
  border-top-left-radius: 20px;
  overflow: hidden;
  @media (max-width: 768px) {
    overflow: auto;
    border: none;
    border-top-left-radius: 0;
  }
  
`

// MAIN PAGE HEADINGS
export const StyledMainHeading = styled.div`
  // background: ${colors.sec_grad};

  & h1 {
    text-align: center;
    font-size: 30px;
    @media (max-width: 768px) {
      font-size: 20px;
    }
    font-style: italic;
    padding: 10px;
    margin: 0;
    text-shadow: ${colors.text_shadow};
    color: tomato;
  }
`

// MAIN PAGE CONTENT
export const StyledMainContent = styled.div`
  // background: ${colors.ter_grad};
  // padding: 20px;
  `

// FORM
export const StyledForm = styled.div`
  margin: 10px;
  margin-top: 0;
  padding: 10px;
  background-color: ${colors.backdrop};

  & div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px;
    background-color: ${colors.backdrop};
  }

  & label p {
    margin: 0;
    font-weight: 100;
    font-size: 20px;
    color: ${colors.prim_light};
    text-transform: uppercase;
  }

  & p {
    margin-top: 5px;
  }

  & input,
  & textarea,
  & select {
    width: 100%;
    margin: 0 auto;
    padding: 8px;
    color: #fefeee;
    background-color: transparent;
    border: 2px solid Aquamarine;
  }

  & *::placeholder  {
    color: #fefeee;
  }


`

// BUTTON
export const StyledButton = styled.button`
  width: 100%;
  margin-top: 20px;
  outline: none;
  border: none;
  padding: 10px;
  font-weight: 100;
  font-size: 25px;
  text-transform: uppercase;
  color: #555;
  background-color: ${colors.prim_light};
  border: 2px solid Aquamarine;
  cursor: pointer;
}

 &:disabled {
  background: ${colors.disabled};
  cursor: not-allowed;
}
`

