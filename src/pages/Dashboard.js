import React, { Component } from 'react'
import styled from 'styled-components'
import { danger } from '../styles/variables'

import { connect } from 'react-redux'

class Dashboard extends Component {
  render() {
    return (
      <div>
        
        <Welcome>
          { this.props.user && (
            <div>Welcome {this.props.user.name}</div>) }
        </Welcome>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  }
}

const Welcome = styled.h1`
  margin: 0
  color: ${danger}
`

// CONNECT REDUX STATE AND ACTIONS TO AUTH COMPONENT
export default connect( mapStateToProps )( Dashboard )
