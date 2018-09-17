import React, { Component } from 'react'

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
import ArrowDownIcon from 'react-icons/lib/md/arrow-drop-down'
import ArrowUpIcon from 'react-icons/lib/md/arrow-drop-up'

import ListReminders from '../components/Reminders/ListReminders'
import ReminderTimer from '../components/Reminders/ReminderTimer'

import { selectAllRoomUsers } from '../store/selectors/chat'
import { selectRelevantRemindersFirst, selectTodaysReminders, selectExpiredReminders } from '../store/selectors/reminders'

class Reminders extends Component {

  state = {
    showExpired: false,
    currentReminder: null
  }

  // LIFECYCLE HOOKS
  componentDidMount = () => {
    const { getReminders } = this.props
    getReminders().then(() => {
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const { todayReminders } = this.props
    if (!prevProps.todayReminders.length && todayReminders !== prevProps.todayReminders) {
      this.setState({currentReminder: todayReminders[0]})
    }
  }

  // HANDLERS
  handleRemoveReminder = (id) => {
    const { deleteReminder, getReminders } = this.props
    console.log(id)
    deleteReminder(id).then(() => {
      getReminders()
    })
  }

  handleShowExpired = () => {
    this.setState( (prevState) => {
      return { showExpired: !prevState.showExpired }
    })
  }

  handleSetTimer = (reminder) => {
    this.setState({currentReminder: reminder}) 
  }
  

  render () {
    const { reminders, todayReminders, expiredReminders, history, users } = this.props
    const { showExpired, currentReminder } = this.state
    return (
      <StyledSection>
        <StyledMainHeading>
          <h1>Reminders</h1>
        </StyledMainHeading>
  
        <StyledMainContent>
            <StyledShadow>
              <StyledShadow>
               <ReminderTimer
               reminder={currentReminder} />
              </StyledShadow>
            </StyledShadow>

            { /* TODAY REMINDERS */ }
            {todayReminders.length ? (
              <StyledShadow>
                <StyledHeadlines>For Today</StyledHeadlines>
                <ListReminders
                  show={true}
                  reminderClass='today'
                  reminders={todayReminders}
                  users={users}
                  removeReminder={this.handleRemoveReminder}
                  setTimer={this.handleSetTimer} />
              </StyledShadow>
            ) : (
              <StyledShadow>
              <StyledNoReminders>
                <StyledShadow>
                  <h3>No reminders for today. Add new?</h3>
                  <div
                    className="icon"
                    onClick={() => {history.push('/add/reminder')}}
                  ><AddIcon /></div>
                </StyledShadow>
              </StyledNoReminders>
            </StyledShadow>
            )}

            { /* NEXT REMINDERS */ }
            { reminders ? (
            <StyledShadow>
              <StyledHeadlines>Yet to arrive</StyledHeadlines>
              <ListReminders
                show
                reminderClass='next'
                reminders={reminders}
                users={users}
                removeReminder={this.handleRemoveReminder}
                setTimer={this.handleSetTimer} />
            </StyledShadow>
            ) : (
              <StyledShadow>
                <StyledNoReminders>
                  <StyledShadow>
                    <h3>No pending reminders. Add new?</h3>
                    <div
                      className="icon"
                      onClick={() => {history.push('/add/reminder')}}
                    ><AddIcon /></div>
                  </StyledShadow>
                </StyledNoReminders>
              </StyledShadow>
              ) }

            { /* EXPIRED REMINDERS */ }
            { expiredReminders ? (
            <StyledShadow>
              <StyledHeadlines
                onClick={this.handleShowExpired}>
                Show Expired
                { showExpired ? <ArrowUpIcon/> : <ArrowDownIcon/> }
              </StyledHeadlines>
             
              <ListReminders
                show={showExpired}
                reminderClass='expired'
                reminders={expiredReminders}
                users={users}
                removeReminder={this.handleRemoveReminder} />
            </StyledShadow>
            ) : null }

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
  getReminders: () => dispatch(actions.getReminders()),
  deleteReminder: (id) => dispatch(actions.deleteReminder(id))
})

// EXPORT
export default connect( mapStateToProps, mapDispatchToProps )( Reminders )

const StyledHeadlines = styled.h2`
  margin: 0;
  color: ${colors.ter_yellow};
  font-style: italic;
  font-size: 20px;
  margin-bottom: 10px;

  & svg {
    font-size: 30px;
    cursor: pointer;
  }
`

const StyledNoReminders = styled.div`
  text-align: center;
  font-weight: 100;
  color: ${colors.prim_font};
  padding: 30px;
  transition: all .3s ease-in;

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
  }

  &:hover {
    transform: scale(1.1);
  }
`