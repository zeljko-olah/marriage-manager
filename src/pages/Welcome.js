import React, {Component} from 'react'
import styled from 'styled-components'
import { boy_color, girl_color } from '../styles/variables'


import { connect } from 'react-redux'

class Dashboard extends Component {

  render () {

    return (
      <div>
      <section>
        <WelcomeMessage user={ this.props.user }>
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
// CONNECT REDUX STATE AND ACTIONS TO AUTH COMPONENT
export default connect( mapStateToProps )( Dashboard )
