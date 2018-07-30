import React, {Component} from 'react'
import styled from 'styled-components'
import { boy_color, girl_color } from '../styles/variables'

import { connect } from 'react-redux'

class Welcome extends Component {

  render () {
    const { user } = this.props
    return (
      <div>
      <section>
        <WelcomeMessage user={ user } >
          Welcome { this.props.user.name }
        </WelcomeMessage>
      </section>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  }
}

const WelcomeMessage = styled.h1`
  ${ props => props.user.name === 'Zeljko' ?
    'color:' + boy_color +'!important; ' :
    'color:' + girl_color +'!important; '}
`
export default connect( mapStateToProps )( Welcome );
