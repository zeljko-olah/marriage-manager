
import React, { Component} from 'react'
import styled from 'styled-components'
import * as colors from './../styles/variables'

const withTimeout = (WrappedComponent, time) => {
  return class extends Component {

    state = {
      disappear: false
    }

    componentDidMount () {
      setTimeout(() => {
        this.setState({ disappear: true })
      }, time);
    }
    
    render () {
      const { disappear } = this.state
        return <WrappedComponent {...this.props} disappear={disappear} /> 
    }

  }
}

export default withTimeout