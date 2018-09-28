// IMPORTS
import React, { Component } from 'react'

// Moment
import moment from 'moment'

// Components
import ChatInfo from '../components/Welcome/ChatInfo'
import LocationInfo from '../components/Welcome/LocationInfo'
import TodoInfo from '../components/Welcome/TodoInfo'
import ReminderInfo from '../components/Welcome/ReminderInfo'

// Styled components
import styled from 'styled-components'
import * as colors from '../styles/variables'
import {StyledSection, StyledMainHeading, StyledMainContent, StyledShadow} from '../styles/section'

// Redux
import { connect } from 'react-redux'
import * as actions from '../store/actions'

// Selectors
import { selectAllRoomUsers, selectPartner, selectPartnerLastMessage, selectUnreadCount, selectImportantCount } from '../store/selectors/chat'
import {selectLastLocation} from '../store/selectors/location'
import {selectLastTodayTodo, selectTodoStatusCount} from '../store/selectors/todos'
import {selectCurrentReminder} from '../store/selectors/reminders'

// Events
import * as events from '../events'

// COMPONENT
class Welcome extends Component {

  componentDidMount () {
    const { getLocations, getTodosForDate, getReminders } = this.props
    getLocations()
    getTodosForDate(moment().valueOf())
    getReminders()
  }

  componentDidUpdate = (prevProps) => {
    const { socket, getTodosForDate, setFlashMessage, getReminders, getLocations } = this.props
    if (socket !== null && prevProps.socket !== socket) {
      socket.on(events.TODOS_UPDATE, () => {
        getTodosForDate(moment().valueOf())
        setFlashMessage({
          type: 'success',
          flashMessage: `Todos updated!`
        })
      })
      socket.on(events.REMINDERS_UPDATED, () => {
        getReminders()
        setFlashMessage({
          type: 'success',
          flashMessage: `Reminders updated!`
        })
      })
      socket.on(events.LOCATION_SHARED, () => {
        getLocations()
        setFlashMessage({
          type: 'success',
          flashMessage: `Location shared!`
        })
      })
    }
  }

  componentWillUnmount() {
    const { socket } = this.props
    socket.off(events.TODOS_UPDATED)
    socket.off(events.REMINDERS_UPDATE)
  }

  handleReloadReminder = () => {
    const { getReminders } = this.props
    getReminders()
  }

  render () {
    const { 
      history,
      user,
      users,
      activeUsers,
      toggleChat,
      partnerChatIsOpen,
      partner,
      partnerLastMessage,
      newMessages,
      newImportantMessages,
      partnerLastLocation,
      todoCount,
      userLastTodo,
      userLastReminder,
      loading
    } = this.props

    let partnerOnline = false
    if (activeUsers.length === 2) {
      partnerOnline = true
    }

    return (
      <StyledSection>
        <StyledMainHeading user={ user } >
          <h1>Welcome { user.name }</h1>
        </StyledMainHeading>
  
        <StyledMainContent>
          <StyledWelcome>
            <StyledShadow>
              <StyledShadow>

                { /* CHAT INFO */ }
                <StyledInfo className="chat-info">

                  <ChatInfo
                    users={users}
                    partner={partner}
                    partnerChatIsOpen={partnerChatIsOpen}
                    partnerOnline={partnerOnline}
                    newMessages={newMessages}
                    toggleChat={toggleChat}
                    loading={loading}
                    newImportantMessages={newImportantMessages}
                    partnerLastMessage={partnerLastMessage} />
                </StyledInfo>
              
                { /* LOCATION INFO */ }
                <StyledInfo className="location-info">

                  <LocationInfo
                    partner={partner}
                    history={history}
                    users={users}
                    partnerLastLocation={partnerLastLocation}/>                       
                </StyledInfo>
                  
                { /* TODO INFO */ }
                <StyledInfo className="todos-info">

                  <TodoInfo
                    history={history}
                    user={user}
                    partner={partner}
                    todoCount={todoCount}
                    userLastTodo={userLastTodo} />                    
                </StyledInfo>


                { /* REMINDER INFO */ }
                <StyledInfo className="reminder-info">

                  <ReminderInfo
                    history={history}
                    userLastReminder={userLastReminder}
                    reloadReminder={this.handleReloadReminder} />
                </StyledInfo>    

              </StyledShadow>
            </StyledShadow>
          
            
          </StyledWelcome>
        </StyledMainContent>
      </StyledSection>
    )
  }
}

// MAP REDUX STATE TO PROPS
const mapStateToProps = state => {
  return {
    socket: state.chat.socket,
    user: state.auth.user,
    users: selectAllRoomUsers(state),
    activeUsers: state.chat.activeUsers,
    partner: selectPartner(state),
    partnerChatIsOpen: state.chat.partnerChatOpen,
    partnerLastMessage: selectPartnerLastMessage(state),
    newMessages: selectUnreadCount(state),
    newImportantMessages: selectImportantCount(state),
    partnerLastLocation: selectLastLocation(state),
    todoCount: selectTodoStatusCount(state),
    userLastTodo: selectLastTodayTodo(state),
    userLastReminder: selectCurrentReminder(state),
    loading: state.loading.loading
  }
}

const mapDispatchToProps = (dispatch) => ({
  setFlashMessage: (flash) => dispatch(actions.setFlashMessage(flash)),
  toggleChat: (showChat) => dispatch( actions.toggleChat(showChat) ),  
  getLocations: () => dispatch(actions.getLocations()),
  getTodosForDate: (date) => dispatch(actions.getTodosForDate(date)),
  getReminders: () => dispatch(actions.getReminders()),
})

// EXPORT
export default connect( mapStateToProps, mapDispatchToProps )( Welcome )

const StyledWelcome = styled.div`

& h3,
& h4 {
    color: ${colors.prim_light};
    font-style: italic;
    text-transform: uppercase;
    font-size: 10px;
    // font-weight: 100;
  }
`
const StyledInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

&.chat-info svg {
  color: ${colors.sec_color};
    font-size: 30px;
    transform: scale(1) rotate(0deg);    
    transition: all .2s ease-out;
    &:hover {
      cursor: pointer;
      transform: scale(1.2) rotate(360deg);
      color: ${colors.sec_light};
    }
}

&.location-info,
&.reminder-info,
&.todos-info {
  justify-content: center;
  align-items: stretch;

  & svg {
    color: ${colors.sec_color};
    font-size: 30px;
    transform: scale(1) rotate(0deg);    
    transition: all .2s ease-out;
    &:hover {
      cursor: pointer;
      transform: scale(1.2) rotate(360deg);
      color: ${colors.sec_light};
    }
  }
}

&.todos-info {
  justify-content: space-between;
  align-items: center;
}

&.reminder-info {
  justify-content: space-between;
  align-items: center;
}

& h3 {
    color: ${colors.prim_light};
    font-style: italic;
  }

& .avatar-wrapper {
  border: 10px solid ${colors.sec_color};
  border-radius: 50%;
}

& .avatar-wrapper.online {
  border: 10px solid ${colors.success};
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
}
& .avatar-wrapper.offline {
  border: 10px solid ${colors.sec_color};
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
}

& span {
  display: inline-block;
  background-color: ${colors.overlay};
  padding: 1px 5px;
  margin: 0 5px;
}
& .chat-status.online {
  font-size: 20px;
  color: ${colors.success};
}
& .chat-status.offline {
  font-size: 18px;
  color: ${colors.sec_color};
}
& .partner-chat.open {
  font-size: 15px;
  color: ${colors.boy_color};
}
& .partner-chat.closed {
  font-size: 15px;
  color: ${colors.girl_color};
}
& .last-message,
& .new-todo {
  flex-basis: 300px;
  color: ${colors.ter_yellow};
  & p {
    font-size: 15px;
    font-style: italic;
    font-weight: 100;
    letter-spacing: 3px;
  }
}

& .last-message-time,
& .last-todo-time {
  display: inline block;
  font-size: 15px;
  color: ${colors.sec_light};
  background-color: ${colors.overlay};
  margin-left: 5px;
  margin-right: 5px;
  padding-left: 5px;
  padding-right: 5px;
  text-transform: lowercase;
}


& .new-messages {
  font-size: 15px;
  color: ${colors.prim_color};
  background-color: ${colors.sec_color};
  margin-left: 5px;
  margin-right: 5px;
  padding-left: 5px;
  padding-right: 5px;
}
& .important-messages {
  color: ${colors.sec_color};
  background-color: ${colors.overlay};
  font-size: 15px;
}

& .last-location,
& .last-reminder {
  color: ${colors.prim_color};
  font-size: 15px;
}

& .all-todos {
  color: ${colors.girl_color};
  font-size: 15px;
}

& .completed-todos {
  color: ${colors.success};
  font-size: 15px;
}
& .remain-todos {
  color: ${colors.boy_color};
  font-size: 15px;
}
& .under-remain-todos {
  text-align: right;
  margin: 0;
  margin-bottom: 5px;
}
& .failed-todos,
& .active-todos {
  font-size: 10px;
  background-color: ${colors.overlay};
  -color: ${colors.overlay};
}
& .failed-todos {
  color: ${colors.sec_color};
}
& .active-todos {
  color: ${colors.prim_color};
}
& .reminder-who {
  color: ${colors.sec_color};
  background-color: ${colors.overlay};    
  font-size: 15px;
}
& .last-reminder-time {
  margin: 0;
  text-align: right;
  & span {
    color: ${colors.sec_light};
    font-size: 12px;
  }
}
`
