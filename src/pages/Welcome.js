// IMPORTS
import React, {Component, Fragment} from 'react'

// Moment
import moment from 'moment'

// Components
import Loading from '../components/UI/Loading'
import Avatar from '../components/user/Avatar'

// Styled components
import styled from 'styled-components'
import * as colors from '../styles/variables'
import {StyledSection, StyledMainHeading, StyledMainContent, StyledShadow} from '../styles/section'

// Icons
import LocationIcon from  'react-icons/lib/md/location-on'
import ChatIcon from 'react-icons/lib/md/forum'
import TodoIcon from  'react-icons/lib/md/playlist-add-check'
import ReminderIcon from  'react-icons/lib/md/alarm'

// Redux
import { connect } from 'react-redux'
import * as actions from '../store/actions'

// Selectors
import { selectAllRoomUsers, selectPartner, selectPartnerLastMessage, selectUnreadCount, selectImportantCount } from '../store/selectors/chat'
import {selectLastLocation} from '../store/selectors/location'
import {selectLastTodayTodo, selectTodoStatusCount} from '../store/selectors/todos'

// Events
import * as events from '../events'

// COMPONENT
class Welcome extends Component {

  componentDidMount () {
    const { getLocations, getTodosForDate } = this.props
    getLocations()
    getTodosForDate(moment().valueOf())
  }

  componentDidUpdate = (prevProps) => {
    const { socket, getTodosForDate, setFlashMessage } = this.props
    if (socket !== null && prevProps.socket !== socket) {
      socket.on(events.TODOS_UPDATE, () => {
        getTodosForDate(moment().valueOf())
        setFlashMessage({
          type: 'success',
          flashMessage: `Todos updated!`
        })
      })
    }
  }

  componentWillUnmount() {
    const { socket } = this.props
    socket.off(events.TODOS_UPDATE)
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
                { /* ********* */ }
                <StyledInfo className="chat-info">

                  { /* CHAT ICON */ }
                  <StyledShadow>
                    <StyledShadow onClick={ () => {toggleChat(partnerChatIsOpen)} }>
                      <h2><ChatIcon/></h2>  
                    </StyledShadow>
                  </StyledShadow>
                  { !users.length ? (<Loading/>) : (
                    <Fragment>
                      <div>

                        { /* STATUS */ }
                        <h3>{partner.name} is  
                        <span className={partnerOnline ? 'chat-status online' :'chat-status offline'}>
                        { partnerOnline ? ' online': ' offline' }
                        </span></h3>

                        { /* CHAT WINDOW */ }
                        <h4>
                          {partner.name}'s chat window is
                          <span className={partnerChatIsOpen ? 'partner-chat open':'partner-chat closed'}>
                            { partnerChatIsOpen ? ' opened' : ' closed' }
                          </span>
                        </h4>

                        { /* NEW MESSAGES */ }
                        { newMessages > 0 ? (
                          <h4>You have
                          <span className="new-messages">
                            {' ' + newMessages + ' new '} 
                          </span>
                            { newMessages === 1 && 'message'}
                            { newMessages > 1 && 'messages'}
                          </h4>
                        ) : (
                          <h4>No new messages.</h4>
                        ) }

                        { /* IMPORTANT MESSAGES */ }
                        { newImportantMessages > 0 ? (
                          <h4>And
                          <span className="important-messages">
                          {'  ' + newImportantMessages + ' important '} 
                        </span>
                          { newImportantMessages === 1 && 'message'}
                          { newImportantMessages > 1 && 'messages'}</h4>
                        ) : null }
                      </div>
                      
                      { /* PARTNER STATUS AVATAR */ }
                      <div className={partnerOnline ? 'avatar-wrapper online' :'avatar-wrapper offline'}>
                        <Avatar
                          width={'40px'}
                          height={'40px'}
                          name={partner.name}
                          src={partner.avatar} /> 
                      </div>
                    </Fragment>  
                  ) }

                  { /* LAST PARTNER MESSAGE */ }
                  { loading ? <Loading/> : (
                    <div className="last-message">
                    <h4>
                      Last message to you:
                      { partnerLastMessage && partnerLastMessage.createdAtFormatted ? (
                        <span className="last-message-time">
                          {partnerLastMessage.createdAtFormatted}                        
                        </span>
                      ) : (
                        null
                      )}
                    </h4>
                    <StyledShadow>
                      { partnerLastMessage ? (
                      <p>{partnerLastMessage.text && ('"' + partnerLastMessage.text.substr(0, 150) + '..."') }</p>
                      ) : (
                        <p>No meesages.</p>
                      ) }

                    </StyledShadow>
                  </div>
                  ) }
                </StyledInfo>
              
              { /* LOCATION INFO */ }
              { /* ************* */ }
              <StyledInfo className="location-info">
                { !users.length ? (<Loading/>) : (
                <Fragment>
                  <StyledShadow>
                    <StyledShadow onClick={() => {history.push('/location')}}>
                      <h2><LocationIcon/></h2>  
                    </StyledShadow>
                  </StyledShadow>
                  <StyledShadow>
                    <h3>{partner.name}'s last known location was:</h3>
                    <h4>{partnerLastLocation ? (
                      <span className="last-location">
                        { partnerLastLocation.address }
                      </span>

                    ) : (
                      <span>{'Unknown'}</span>
                    ) }</h4>
                  </StyledShadow>
                  </Fragment>
                  ) }          
                  </StyledInfo>
                  
                  { /* TODO INFO */ }
                  { /* ********* */ }
                  <StyledInfo className="todos-info">

                    { /* TODO ICON */ }
                    <StyledShadow>
                      <StyledShadow onClick={() => {history.push('/todos')}}>
                        <h2><TodoIcon/></h2>  
                      </StyledShadow>
                    </StyledShadow>

                    { /* TODOS STATUS */ }
                    { !todoCount && !userLastTodo ? (<Loading/>) : (
                      <Fragment>
                        { todoCount.all > 0 ? (
                          <div>
                          { /* TODOS COUNT ALL */ }
                          { todoCount.all > 0 ? (
                            <h4>You have
                            <span className="all-todos">
                              {' ' + todoCount.all + ' '} 
                              { todoCount.all === 1 && 'task '}
                              { todoCount.all > 1 && 'tasks '}
                            </span>
                              for today
                            </h4>
                          ) : (
                            <h4>No tasks for today.</h4>
                          ) }

                          { /* TODOS COUNT COMPLETED */ }
                          { todoCount.completed !== todoCount.all ? (
                            <Fragment>
                              { todoCount.completed !== 0 ? (
                                <h4>There
                                { todoCount.completed === 1 && ' is '}
                                { todoCount.completed > 1 && ' are '}
                                <span className="completed-todos">
                                  {' ' + todoCount.completed + ' completed '} 
                                  { todoCount.completed === 1 && 'task '}
                                  { todoCount.completed > 1 && 'tasks '}
                                </span>
                              </h4>
                              ) : (
                                <h4>There are no completed tasks yet.</h4>
                              ) }
                              { todoCount.remain !== 0 ? (
                                <h4>
                                To complete the day
                                <span className="remain-todos">
                                  {' ' + todoCount.remain + ' '} 
                                  { todoCount.remain === 1 && 'task remains '}
                                  { todoCount.remain > 1 && 'tasks remain '}
                                </span>
                              </h4>
                              ) : null }
                              { todoCount.failed !== 0 ? (
                                <h4 className="under-remain-todos">
                                  <span className="failed-todos">
                                    { todoCount.failed !== 0 && ' ' + todoCount.failed + ' '} 
                                    { todoCount.failed === 1 && 'failed task '}
                                    { todoCount.failed > 1 && 'failed tasks '}
                                  </span>
                                </h4>
                              ) : null }
                              { todoCount.active !== 0 ? (
                                <h4 className="under-remain-todos">
                                <span className="active-todos">
                                  { todoCount.active !== 0 && ' ' + todoCount.active + ' '} 
                                  { todoCount.active === 1 && 'active task '}
                                  { todoCount.active > 1 && 'active tasks '}
                                </span>
                              </h4>
                              ) : null }
                            </Fragment>
                            ) : (
                              <h4>All tasks are &nbsp;<span className="completed-todos">completed</span></h4>
                            )
                          }
                        </div>
                        ) : (
                          <h4>No tasks for today.</h4>
                        )  }
                        { user && partner && userLastTodo ? (
                          <div className="new-todo">
                          <h4>{userLastTodo.user !== partner.name ? 'You ' : partner.name + ' ' }
                            added new todo:
                            { userLastTodo && userLastTodo.createdAtFormatted ? (
                              <span className="last-todo-time">
                                {userLastTodo.createdAtFormatted}                        
                              </span>
                            ) : (
                              null
                            )}
                          </h4>
                          <StyledShadow>
                              {userLastTodo.title ? (
                                <p>{userLastTodo.title}</p>
                              ) : (
                                <p>No data</p>
                              )}
                            <p></p>                        
                          </StyledShadow>
                        </div>
                        ) : <h4>No new tasks for today yet</h4>}
                      </Fragment>  
                    ) }
                </StyledInfo>

                 { /* REMINDER INFO */ }
                { /* ********* */ }
                <StyledInfo className="todos-info">

                    { /* REMINDER ICON */ }
                    <StyledShadow>
                      <StyledShadow onClick={() => {history.push('/reminder')}}>
                        <h2><ReminderIcon/></h2>  
                      </StyledShadow>
                    </StyledShadow>
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
    loading: state.loading.loading
  }
}

const mapDispatchToProps = (dispatch) => ({
  setFlashMessage: (flash) => dispatch(actions.setFlashMessage(flash)),
  toggleChat: (showChat) => dispatch( actions.toggleChat(showChat) ),  
  getLocations: () => dispatch(actions.getLocations()),
  getTodosForDate: (date) => dispatch(actions.getTodosForDate(date))
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

& .last-location {
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
}
& .failed-todos {
  color: ${colors.sec_color};
}
& .active-todos {
  color: ${colors.prim_color};
}
`
