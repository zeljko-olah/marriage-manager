import React, { Component } from 'react'

// Moment
import moment from 'moment'

// Redux
import { connect } from 'react-redux'
import * as actions from '../store/actions'

// Styled components
import styled from 'styled-components'
import * as colors from '../styles/variables'
import {
  StyledSection, StyledMainHeading, StyledMainContent, StyledShadow
} from '../styles/section'

import { selectAllRoomUsers } from '../store/selectors/chat'

const formatReminderDate = (timestamp) => {
  return moment(timestamp).format('MMM Do')
}

const formatReminderTime = (timestamp) => {
  return moment(timestamp).format('HH:mm')
}

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
          <StyledShadow>
            <StyledReminders>

              { /* REMINDERS */ }
              { reminders && reminders.map(reminder => {
                return (
                  <div
                  className="reminder-box"
                  key={reminder.id}>
                    <div>
                      <StyledShadow>
                        <p className="reminder-title">{reminder.title}</p>
                      </StyledShadow>
                        <p className="reminder-time">{formatReminderTime(reminder.date)}</p>
                      <StyledShadow>
                        <p className="reminder-date">{formatReminderDate(reminder.date)}</p>
                      </StyledShadow>
                    </div>
                  </div>
                )
              }) }
                
            </StyledReminders> 
          </StyledShadow>
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

const StyledReminders = styled.div`
  width: 100%;
  padding: 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;

  & .reminder-box { 
    padding: 10px;
    flex-basis: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 20px;

    & > div {
      flex: 1;
      border: 1px solid ${colors.prim_color};
      display: flex;
      justify-content: space-between;
    }
  }

  & .reminder-title {
    color: ${colors.prim_color};
    font-size: 15px;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
  }

  & .reminder-time {
    color: ${colors.sec_light};
    font-size: 40px;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
    padding: 5px;
  }

  & .reminder-date {
    color: ${colors.prim_light};
    font-size: 20px;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
  }
`