
import React, { Component} from 'react'
import styled from 'styled-components'

let stopTimeout

class WithAnimation extends Component {

    state = {
      animationClasses: 'fade-enter'
    }

    isCanceled = false
  
    componentDidMount() {
      setTimeout(() => {
        !this.isCanceled && this.setState({
          animationClasses: "fade-enter"
        })
      })
  
      stopTimeout = setTimeout(() => {
        !this.isCanceled && this.setState({
          animationClasses: "fade-enter-active"
        })
      }, 300)
    }

    componentWillUnmount() {
      this.isCanceled = true
      clearTimeout(stopTimeout)
    }
    
    render () {
      const { animationClasses } = this.state
        return (
          <TransitionGroupWrapper>
            <div className={animationClasses}>
              {this.props.children}
            </div>          
          </TransitionGroupWrapper>
          )
    }
}

export default WithAnimation

const TransitionGroupWrapper = styled.div`
.fade-enter {
  opacity: 0.01;

}
.fade-enter-active {
  opacity: 1;
  transition: opacity 300ms ease-in;
}
.fade-exit {
  opacity: 1;
}

.fade-exit-active {
  opacity: 0.01;
  transition: opacity 2000ms ease-in;
}
`