import React, {Component} from 'react'
import moment from 'moment'

// REDUX
import { connect } from 'react-redux'
import * as actions from '../store/actions'
import { selectAllRoomUsers } from '../store/selectors/chat'
import { selectNewTodosFirst } from '../store/selectors/todos'

import Todo from '../components/Todos/Todo'
import TodosMenu from '../components/Todos/TodosMenu'

// Styled components
// import styled from 'styled-components'
import {
  StyledSection, StyledMainHeading, StyledMainContent, StyledShadow
} from '../styles/section'

class Todos extends Component {

  // STATE
  // state = {}

  // LIFECYCLE HOOKS
  componentDidMount = () => {
    const { getTodosForDate } = this.props
    getTodosForDate(moment().valueOf()).then((data) => {
      console.log('Succes!!!!')
      console.log(data)
    })
  }

  handleDateUpdate = (date) => {
    const { getTodosForDate } = this.props
    getTodosForDate(date).then(() => {
      console.log('Success after update date!')
    })
  }

  // HANDLERS

  // RENDER METHOD
  render () {
    const { todos, users } = this.props
    return (
      <StyledSection>
          <StyledMainHeading>
            <h1>Todos</h1>
          </StyledMainHeading>
    
          <StyledMainContent>
            <StyledShadow>

              { /* TODOS */ }
              <TodosMenu
                dateUpdate={this.handleDateUpdate} />
              { todos && todos.map(todo => (
                <Todo
                  key={todo.id}
                  todo={todo}
                  users={users} />
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
    users: selectAllRoomUsers(state)
  }
}

const mapDispatchToProps = (dispatch) => ({
  setFlashMessage: (flash) => dispatch(actions.setFlashMessage(flash)),
  getTodos: () => dispatch(actions.getTodos()),
  getTodosForDate: (date) => dispatch(actions.getTodosForDate(date))

})

// EXPORT
export default connect( mapStateToProps, mapDispatchToProps )( Todos )