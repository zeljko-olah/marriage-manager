// IMPORTS
import React from 'react'

import styled from 'styled-components'

// COMPONENT
const Loading = () => (
  <StyledLoader>
    { /* USE GIF IMAGE LOADER */ }
    <img className="loader__image" src="images/loader.gif" alt="loader" />
  </StyledLoader>
)

// EXPORT
export default Loading

// STYLED
const StyledLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & .loader__image {
    height: 20px;
    width: 20px;
  }
`
