import React, {Component} from 'react'

// REDUX
import { connect } from 'react-redux'
import * as actions from '../store/actions'
import { selectAllRoomUserNames } from '../store/selectors/chat'

import AddItem from '../components/AddNew/AddItem'

// Clear form
import { clearForm } from '../shared/utility'

// Styled components
import styled from 'styled-components'
import {
  StyledSection, StyledMainHeading, StyledMainContent, StyledShadow
} from '../styles/section'
import * as colors from '../styles/variables'

// Events
import * as events from '../events'

class AddNew extends Component {

  // STATE
  state = {
    activeTab: 'todo',
    error: ''
  }

  componentDidMount () {
    const { history } = this.props
    console.log(history.location.pathname)
    if (history.location.pathname.includes('reminder')) {
      this.setState({
        activeTab: 'reminder',
      }) 
    } else {
      this.setState({
        activeTab: 'todo',
      }) 
    }
  }

  // HANDLERS
  setActiveTab = (tab) => {
    this.setState({
      activeTab: tab,
    })    
  }

  handleClearError = () => {
    this.setState({
      error: ''
    }) 
  }

  handleSubmit = (inputs, date, time) => {
    // Define variables
    const { activeTab } = this.state
    const { user, addTodo, addReminder, setFlashMessage, roomUsers, history, socket } = this.props
    const {title, description, priority} = inputs
    let desc
    let who
    let task = activeTab === 'todo' ? 'todo' : 'reminder'
    let message = activeTab === 'todo' ?
      'somebody has to do it!' : 'who needs to be reminded?'
    
    // Validate
    if (title && title.value.trim() === '') {
      setFlashMessage({
        type: 'error',
        flashMessage: `Hey ${user.name}, define a ${task} first!`
      })
      this.setState({error: 'title'})
      return
    }

    if (!inputs[roomUsers[0]].checked && !inputs[roomUsers[1]].checked ) {
      setFlashMessage({
        type: 'error',
        flashMessage: `Hey ${user.name}, ${message}`
      })
      this.setState({error: 'checkboxes'})
      return
    } else if (!inputs[roomUsers[0]].checked) {
      who = roomUsers[1]
    } else if (!inputs[roomUsers[1]].checked) {
      who = roomUsers[0]
    } else {
      who = 'both'
    }
    
    // Set no description
    if (!description) {
      desc = 'No description'
    } else {
      desc = description.value
    }
    
    // Time for reminder task
    if (task === 'reminder' && time === '') {
      setFlashMessage({
        type: 'error',
        flashMessage: `Hey ${user.name}, define a time for a reminder!`
      })
      this.setState({error: 'time'})
      return
    } else {
      const pattern = /^([0-1]?\d|2[0-3])(:([0-5]?\d)|:?)$/
      if (pattern.test(time)) {
        if ((time.length === 3 && time.indexOf(':') === 1) || (time.length === 4 && time.indexOf(':') === 2)) {
          setFlashMessage({
            type: 'error',
            flashMessage: `Hey ${user.name}, invalid minutes format!`
          })
          this.setState({error: 'time'})
          return
        }
        if (time.length <=3 || (time.length === 3 && time.indexOf(':') === 2)) {
          setFlashMessage({
            type: 'error',
            flashMessage: `Hey ${user.name}, invalid time format!`
          })
          this.setState({error: 'time'})
          return
        }
        
        const timeParts = time.split(':')
        date.set({h: timeParts[0], m: timeParts[1]})
      }
    }
    
    // Prepare payload
    const payload = {
      userId: user.id,
      title: title.value,
      description: desc,
      who,
      priority: priority ? priority.value : 'normal',
      date: date.valueOf()
    }
    
    // Persist to database and to store
    if (activeTab === 'todo') {
      addTodo(payload)
      .then(( todo) => {
        socket.emit(events.TODO_ADD, todo, user)
        setFlashMessage({
          type: 'success',
          flashMessage: `Todo successfully added :)`
        })
        // Clear form
        clearForm(inputs, roomUsers)
        history.push('/todos')

      })
    } else {
      addReminder(payload)
      .then((reminder) => {
        socket.emit(events.REMINDER_ADD, reminder, user)
        socket.emit(events.REMINDERS_UPDATE)
        setFlashMessage({
          type: 'success',
          flashMessage: `Reminder successfully added :)`
        })
        // Clear form
        clearForm(inputs, roomUsers)
        history.push('/reminder')
      })
    }
  }
  
  
  // RENDER METHOD
  render () {
    const { activeTab, error } = this.state
    const { roomUsers } = this.props
    return (
      <StyledSection>
          <StyledMainHeading>
            <h1>Add New</h1>
          </StyledMainHeading>
    
          <StyledMainContent>
            <StyledShadow>

              { /* TABS */ }
              <StyledTabsWrapper>

                { /* TAB HEADER */ }
                <StyledTabHeader>
                  <div
                    className={activeTab === 'todo' ? 'active': ''}
                    onClick={() => {this.setActiveTab('todo')}} >
                    <h2>Todo</h2>
                  </div>
                  <div className={activeTab === 'reminder' ? 'active': ''}
                  onClick={() => {this.setActiveTab('reminder')}} >
                    <h2>Reminder</h2>
                  </div>
                </StyledTabHeader>

                { /* TABS */ }
                <StyledTabs>
                  { activeTab === 'todo' ? (
                    <AddItem
                      todo
                      title="Define"
                      who="Who's gonna do it?"
                      roomUsers={roomUsers}
                      error={error}
                      clearError={this.handleClearError}
                      submit={this.handleSubmit} />
                  ) : (
                    <AddItem
                      reminder
                      title="Set a reminder for"
                      who="Who to remind?"
                      timeInput
                      roomUsers={roomUsers}
                      error={error}
                      clearError={this.handleClearError}
                      submit={this.handleSubmit} />
                  ) }
                </StyledTabs>
              </StyledTabsWrapper>
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
    roomUsers: selectAllRoomUserNames(state)
  }
}

const mapDispatchToProps = (dispatch) => ({
  addTodo: (todo) => dispatch(actions.addTodo(todo)),
  addReminder: (reminder) => dispatch(actions.addReminder(reminder)),
  setFlashMessage: (flash) => dispatch(actions.setFlashMessage(flash))
})

// EXPORT
export default connect( mapStateToProps, mapDispatchToProps )( AddNew )

const StyledTabsWrapper = styled.div`
  padding: 10px 50px;
  @media (max-width: 768px) {
    padding: 0;
  }
`
const StyledTabHeader = styled.div`
  display: flex;
  text-align: center;
  padding: 10px;
  @media (max-width: 768px) {
    padding: 5px 0;
  }
  padding-bottom: 0;
  & div {
    flex-basis: 50%;
    padding: 10px;
    cursor: pointer;
    position: relative;
    top: 1px;
    @media (max-width: 768px) {
      top: 5px;
    }
  }

  & .active {
    z-index: 100;
    border-top: 1px solid grey;
    border-left: 1px solid grey;
    border-right: 1px solid grey;
    background-color: ${colors.prim_color};
  }

  & h2 {
    color: ${colors.ter_yellow};
    text-transform: uppercase;
    letter-spacing: 3px;
    font-weight: 100;
    margin: 5px 0;
    @media (max-width: 768px) {
      font-size: 20px;
      letter-spacing: 3px;
    }
  }

  & .active h2 {
    color: ${colors.prim_font};
  }
` 

const StyledTabs = styled.div`
  margin: 10px;
  margin-top: 0;
  border: 1px solid grey;
  padding: 10px;
  background-color: ${colors.backdrop};
  @media (max-width: 768px) {
    padding: 5px 0;
    margin: 0;
  }
`