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

// Icons
import AddIcon from  'react-icons/lib/md/add'

import ListReminders from '../components/Reminders/ListReminders'

import { selectAllRoomUsers } from '../store/selectors/chat'
import { selectRelevantRemindersFirst, selectTodaysReminders, selectExpiredReminders } from '../store/selectors/reminders'

class Reminders extends Component {

  // LIFECYCLE HOOKS
  componentDidMount = () => {
    const { getReminders } = this.props
    getReminders().then(() => {
      // sortUserTodos(user.name, 'user')
    })
  }

  render () {
    const { reminders, todayReminders, expiredReminders, history, users } = this.props
    return (
      <StyledSection>
        <StyledMainHeading>
          <h1>Reminders</h1>
        </StyledMainHeading>
  
        <StyledMainContent>
            <StyledShadow>
              <StyledHeadlines>For Today</StyledHeadlines>

              { /* TODAY REMINDERS */ }
              <ListReminders
                reminderClass='today'
                reminders={todayReminders}
                users={users} />
              
            </StyledShadow>


            { /* REMINDERS */ }
            { reminders ? (
            <StyledShadow>
              <StyledHeadlines>Yet to arrive</StyledHeadlines>
              <ListReminders
                reminderClass='next'
                reminders={reminders}
                users={users} />
            </StyledShadow>
            ) : (
              <StyledNoReminders>
                <h3>No pending reminders.</h3>
                <h3>Add new</h3>
                <div
                  className="icon"
                  onClick={() => {history.push('/add')}}
                ><AddIcon /></div>
              </StyledNoReminders>
              ) }

            { /* EXPIRED REMINDERS */ }
            <StyledShadow>
              <StyledHeadlines>Expired</StyledHeadlines>

              <ListReminders
                reminderClass='expired'
                reminders={expiredReminders}
                users={users} />
                
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
    reminders: selectRelevantRemindersFirst(state),
    todayReminders: selectTodaysReminders(state),
    expiredReminders: selectExpiredReminders(state),
    users: selectAllRoomUsers(state)
  }
}

const mapDispatchToProps = (dispatch) => ({
  getReminders: () => dispatch(actions.getReminders())
})

// EXPORT
export default connect( mapStateToProps, mapDispatchToProps )( Reminders )

const StyledHeadlines = styled.h2`
  margin: 0;
  color: #fff;
  font-style: italic;
`

const StyledNoReminders = styled.div`
  text-align: center;
  font-weight: 100;
  color: ${colors.prim_font};
  padding: 30px;

  & h3 {
    color: ${colors.prim_light};
  }

  & .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    line-height: 40px;
    border: 2px solid ${colors.prim_color};
    border-radius: 40px;
    font-size: 40px;
    margin: 0 auto;
    cursor: pointer;
    background: ${colors.prim_light}
    box-shadow: 0px 0px 10px 10px rgba(255, 255, 255, 0.7);
    transition: all .1s ease-in;
    transform: scale(1);

    &:hover {
      transform: scale(1.1);
    }
  }
`