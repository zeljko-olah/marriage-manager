// REACT
import React from 'react'

// Styled components
import styled from 'styled-components'

// DEFINE LOADING PAGE COMPONENT
const Loading = () => (
  <StyledLoader>
    { /* USE GIF IMAGE LOADER */ }
    <img className="loader__image" src="images/loader.gif" />
  </StyledLoader>
)

export default Loading

const StyledLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & .loader__image {
    height: 20px;
    width: 20px;
  }
`
