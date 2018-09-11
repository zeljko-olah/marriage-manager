import React, { Component } from 'react'

// Redux
import { connect } from 'react-redux'
import * as actions from '../store/actions'

// Styled components
import styled from 'styled-components'
// import * as colors from '../styles/variables'
import {
  StyledSection, StyledMainHeading, StyledMainContent, StyledShadow
} from '../styles/section'

import { selectAllRoomUsers } from '../store/selectors/chat'

class Reminders extends Component {

  // LIFECYCLE HOOKS
  componentDidMount = () => {
    const { getReminders } = this.props
    getReminders().then(() => {
      // sortUserTodos(user.name, 'user')
    })
  }

  render () {
    const { reminders } = this.props
    return (
      <StyledSection>
        <StyledMainHeading>
          <h1>Reminders</h1>
        </StyledMainHeading>
  
        <StyledMainContent>
          <StyledTodos>
            <StyledShadow>

              { /* REMINDERS */ }
              { reminders && reminders.map(reminder => {
                return (
                  <div key={reminder.id}>
                    <span>{reminder.title}</span>
                  </div>
                )
              }) }
              
            </StyledShadow>      
          </StyledTodos>      
        </StyledMainContent>
      </StyledSection>
    )
  }
}

// MAP REDUX STATE TO PROPS
const mapStateToProps = state => {
  return {
    user: state.auth.user,
    socket: state.chat.socket,
    reminders: state.reminder.reminders,
    users: selectAllRoomUsers(state)
  }
}

const mapDispatchToProps = (dispatch) => ({
  getReminders: () => dispatch(actions.getReminders())
})

// EXPORT
export default connect( mapStateToProps, mapDispatchToProps )( Reminders )

const StyledTodos = styled.div`
  color: orange;
`