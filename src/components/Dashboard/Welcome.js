import React from 'react'
import styled from 'styled-components';
import {boy_color, girl_color} from '../../styles/variables'

export default ({user}) => {
  return (
    <section>
      <WelcomeMessage user={ user }>
        Welcome { user.name }
      </WelcomeMessage>
    </section>
  )
}

const WelcomeMessage = styled.h1`
${ props => props.user.name === 'Zeljko' ?
  'color:' + boy_color +'; ' : 'color:' + girl_color +'; '}
`
