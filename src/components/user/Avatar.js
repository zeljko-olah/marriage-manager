import React from 'react'

import styled from 'styled-components'

const Avatar = ({src}) => {
  return (
      <StyledAvatar src={src} />   
  )
}

export default Avatar

const StyledAvatar = styled.img`
  overflow: hidden;
  border-radius: 50%;
  display: block;
  width: 50px;
  height: 50px;
`
