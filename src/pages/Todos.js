import React, {Component} from 'react'
import moment from 'moment'

// REDUX
import { connect } from 'react-redux'
import * as actions from '../store/actions'
import { selectAllRoomUsers } from '../store/selectors/chat'
import { selectNewTodosFirst, selectTodosDate, selectIsToday } from '../store/selectors/todos'

import Todo from '../components/Todos/Todo'
import TodosMenu from '../components/Todos/TodosMenu'

// Styled components
// import styled from 'styled-components'
import {
  StyledSection, StyledMainHeading, StyledMainContent, StyledShadow
} from '../styles/section'

class Todos extends Component {

  // STATE

  // LIFECYCLE HOOKS
  componentDidMount = () => {
    const { getTodosForDate } = this.props
    getTodosForDate(moment().valueOf()).then((data) => {
    })
  }

  // HANDLERS  
  handleDateUpdate = (date) => {
    const { getTodosForDate, setCurrentDate } = this.props
    setCurrentDate(moment(date))
    getTodosForDate(date).then(() => {
      console.log('Success after update date!')
    })
  }

  handleUpdateStatus = (id, status) => {
    const { updateTodoStatus, getTodosForDate, todosDate } = this.props
    updateTodoStatus(id, status).then(() => {
      getTodosForDate(todosDate)
    })
  }

  handleDeleteTodo = (id) => {
    const { deleteTodo, getTodosForDate, todosDate } = this.props
    deleteTodo(id).then(() => {
      getTodosForDate(todosDate)
    })
  }

  handleRenewTodo = (id) => {
    const { renewTodo, getTodosForDate, todosDate, setCurrentDate } = this.props
    renewTodo(id, todosDate).then(() => {
      getTodosForDate(moment().valueOf())
      setCurrentDate(moment())
    })
  }
  

  // RENDER METHOD
  render () {
    const { todos, users, isToday, todosDate, updateTodoStatus } = this.props
    return (
      <StyledSection>
          <StyledMainHeading>
            <h1>Todos</h1>
          </StyledMainHeading>
    
          <StyledMainContent>
            <StyledShadow>

              { /* TODOS */ }
              <TodosMenu
                dateUpdate={this.handleDateUpdate}
                todosDate={moment(todosDate)} />
              { todos && todos.map(todo => (
                <Todo
                  key={todo.id}
                  todo={todo}
                  users={users}
                  isToday={isToday}
                  updateTodoStatus={this.handleUpdateStatus}
                  deleteTodo={this.handleDeleteTodo}
                  renewTodo={this.handleRenewTodo}/>
              ))}
              
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
    todos: selectNewTodosFirst(state),
    users: selectAllRoomUsers(state),
    todosDate: selectTodosDate(state),
    isToday: selectIsToday(state)
  }
}

const mapDispatchToProps = (dispatch) => ({
  setFlashMessage: (flash) => dispatch(actions.setFlashMessage(flash)),
  getTodos: () => dispatch(actions.getTodos()),
  getTodosForDate: (date) => dispatch(actions.getTodosForDate(date)),
  updateTodoStatus: (id, status) => dispatch(actions.updateTodoStatus(id, status)),
  deleteTodo: (id) => dispatch(actions.deleteTodo(id)),
  setCurrentDate: (date) => dispatch(actions.setCurrentDate(date)),
  renewTodo: (id, todosDate) => dispatch(actions.renewTodo(id, todosDate))
  

})

// EXPORT
export default connect( mapStateToProps, mapDispatchToProps )( Todos )