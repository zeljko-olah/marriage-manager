import React, { Component } from 'react'

import moment from 'moment'

// Redux
import { connect } from 'react-redux'
import * as actions from '../store/actions'

// Styled components
import styled from 'styled-components'
import * as colors from '../styles/variables'
import {
  StyledSection, StyledMainHeading, StyledMainContent, StyledShadow, StyledNoItems
} from '../styles/section'

// Icons
import AddIcon from  'react-icons/lib/md/add'
import ArrowDownIcon from 'react-icons/lib/md/arrow-drop-down'
import ArrowUpIcon from 'react-icons/lib/md/arrow-drop-up'

import ListReminders from '../components/Reminders/ListReminders'
import ReminderTimer from '../components/Reminders/ReminderTimer'
import Loading from '../components/UI/Loading'

import { selectAllRoomUsers } from '../store/selectors/chat'
import { selectRelevantRemindersFirst, selectTodaysReminders, selectExpiredReminders } from '../store/selectors/reminders'

// Events
import * as events from '../events'

class Reminders extends Component {

  state = {
    showExpired: false,
    showToday: false,
    showNext: false,
    currentReminder: {},
    loading: true
  }

  // LIFECYCLE HOOKS
  componentDidMount = () => {
    const { getReminders } = this.props
    getReminders().then((reminders) => {
      // const current = reminders.find(r => r.date > moment().valueOf() && moment().isSame(moment(r.date), 'days'))
      const current = reminders.find(r => r.date > moment().valueOf())
      // console.log(current)
      this.setState({
        currentReminder: current,
        loading: false
    })
    })
  }

  componentDidUpdate(prevProps) {
    const { socket, todayReminders, reminders, getReminders } = this.props
    if (socket !== null && prevProps.socket !== socket) {
      socket.on(events.REMINDER_ADDED, (reminder, user) => {
        getReminders().then(() => {
          socket.emit('REMINDERS_UPDATE')
        })
      })
    }
    if (todayReminders.length) {
      if (!prevProps.todayReminders.length && todayReminders !== prevProps.todayReminders) {
        const current = todayReminders.find(r => r.date > moment().valueOf())
        this.setState({currentReminder: current})
      } 
    } else if (reminders.length) {
      if (!prevProps.reminders.length && reminders !== prevProps.reminders) {
        const current = reminders.find(r => r.date > moment().valueOf())
        this.setState({currentReminder: current})
      } 
    }
  }

  // HANDLERS
  handleRemoveReminder = (id) => {
    const { socket, deleteReminder, getReminders } = this.props
    this.setState({loading: true}) 
    deleteReminder(id).then(() => {
      this.setState({loading: false}) 
      socket.emit('REMINDERS_UPDATE')
      getReminders().then(reminders => {
        const current = reminders.find(r => r.date > moment().valueOf())
        this.setState({currentReminder: current})
      })
    })
  }

  handleShowExpired = () => {
    this.setState( (prevState) => {
      return { showExpired: !prevState.showExpired }
    })
  }

  handleShowToday = () => {
    this.setState( (prevState) => {
      return { showToday: !prevState.showToday }
    })
  }

  handleShowNext = () => {
    this.setState( (prevState) => {
      return { showNext: !prevState.showNext }
    })
  }

  handleSetTimer = (reminder) => {
    this.setState({currentReminder: reminder}) 
  }
  

  render () {
    const { 
      reminders, 
      todayReminders, 
      expiredReminders, 
      history, 
      users, 
    } = this.props
    const {
      showExpired, 
      showToday, 
      showNext, 
      currentReminder, 
      loading } = this.state
    
    // Show spinner innitially
    let forToday = <Loading />
    
    // Show reminders for today
    if (todayReminders.length && !loading) {
      forToday = (
        <StyledShadow>
          <StyledShadow>
            <StyledHeadlines
              onClick={this.handleShowToday}>
              For Today
              { showToday ? <ArrowUpIcon/> : <ArrowDownIcon/> }
            </StyledHeadlines>
          </StyledShadow>
          <ListReminders
            show={showToday}
            reminderClass='today'
            reminders={todayReminders}
            users={users}
            removeReminder={this.handleRemoveReminder}
            setTimer={this.handleSetTimer} />
        </StyledShadow>
      )
    }
    
    // No reminders for today
    if (!todayReminders.length && !loading) {
      forToday = (
          <StyledShadow>
          <StyledNoItems>
            <StyledShadow>
              <h3>No reminders for today. Add new?</h3>
              <div
                className="icon"
                onClick={() => {history.push('/add/reminder')}}
              ><AddIcon /></div>
            </StyledShadow>
          </StyledNoItems>
        </StyledShadow>
      )
    }

    return (
      <StyledSection>

        { /* SECTION HEADING */ }
        <StyledMainHeading>
          <h1>Reminders</h1>
        </StyledMainHeading>
        
        { /* CONTENT */ }
        <StyledMainContent>

            { /* CURRENT REMINDER BOX */ }
            { currentReminder && !currentReminder.length ? (
              <StyledShadow>
                <StyledShadow>
                  <StyledHeadlines>
                    Current
                  </StyledHeadlines>
                </StyledShadow>

                { /* SELECTED CURRENT REMINDER */ }
                { currentReminder.id ? (
                  <ListReminders
                  show={true}
                  reminderClass='current'
                  reminders={[currentReminder]}
                  users={users}
                  removeReminder={this.handleRemoveReminder}
                  setTimer={this.handleSetTimer} />
                ) : <Loading /> }

                { /* REMIDER TIMER */ }
                <ReminderTimer
                  reminder={currentReminder}
                  redirectTo="/reminder" />
            </StyledShadow>
            ) : null}

            { /* TODAY REMINDERS */ }
            { loading ? (<Loading/>) : null }
            { !todayReminders ? (<Loading/>) : forToday }

            { /* NEXT PENDING REMINDERS */ }
            { loading ? (<Loading/>) : null }
            { reminders ? (
            <StyledShadow>
              <StyledShadow>
                <StyledHeadlines
                  onClick={this.handleShowNext}>
                  Yet to arrive
                  { showNext ? <ArrowUpIcon/> : <ArrowDownIcon/> }
                </StyledHeadlines>
              </StyledShadow>

              <ListReminders
                show={showNext}
                reminderClass='next'
                reminders={reminders}
                users={users}
                removeReminder={this.handleRemoveReminder}
                setTimer={this.handleSetTimer} />
            </StyledShadow>
            ) : (
              <StyledShadow>

                { /* NO PENDING REMINDERS */ }
                <StyledNoItems>
                  <StyledShadow>
                    <h3>No pending reminders. Add new?</h3>
                    <div
                      className="icon"
                      onClick={() => {history.push('/add/reminder')}}
                    ><AddIcon /></div>
                  </StyledShadow>
                </StyledNoItems>
              </StyledShadow>
              ) }

            { /* EXPIRED REMINDERS */ }
            { loading ? (<Loading/>) : null }
            { expiredReminders ? (
            <StyledShadow>
              <StyledShadow>
                <StyledHeadlines
                  onClick={this.handleShowExpired}>
                  Show Expired
                  { showExpired ? <ArrowUpIcon/> : <ArrowDownIcon/> }
                </StyledHeadlines>
              </StyledShadow>
              
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
  setFlashMessage: () => dispatch(actions.setFlashMessage()),
  deleteReminder: (id) => dispatch(actions.deleteReminder(id))

})

// EXPORT
export default connect( mapStateToProps, mapDispatchToProps )( Reminders )

const StyledHeadlines = styled.h2`
  font-style: italic;
  text-transform: uppercase;
  font-size: 15px;
  margin: 0;
  color: ${colors.prim_light};

  & svg {
    position: relative;
    top: -2px;
    font-size: 30px;
    cursor: pointer;
  }
`