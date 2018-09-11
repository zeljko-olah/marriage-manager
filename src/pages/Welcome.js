// IMPORTS
import React, {Component} from 'react'

import {StyledSection, StyledMainHeading, StyledMainContent} from '../styles/section'

import { connect } from 'react-redux'

// COMPONENT
class Welcome extends Component {

  render () {
    const { user } = this.props
    return (
      <StyledSection>
        <StyledMainHeading user={ user } >
          <h1>Welcome { user.name }</h1>
        </StyledMainHeading>
  
        <StyledMainContent>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati nam repellendus culpa esse nesciunt! Dignissimos, tempore enim? Perspiciatis odio suscipit qui repellendus aut, sunt aspernatur quos at cum itaque autem?</p>
        </StyledMainContent>
      </StyledSection>
    )
  }
}

// MAP REDUX STATE TO PROPS
const mapStateToProps = state => {
  return {
    user: state.auth.user,
  }
}

// EXPORT
export default connect( mapStateToProps )( Welcome );
