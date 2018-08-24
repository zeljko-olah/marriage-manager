import React, {Component} from 'react'

// REDUX
import { connect } from 'react-redux'
import * as actions from '../store/actions'
// import { selectAllRoomUsers } from '../store/selectors/chat'

import Todo from '../components/Todos/Todo'

// Styled components
// import styled from 'styled-components'
import {
  StyledSection, StyledMainHeading, StyledMainContent, StyledShadow
} from '../styles/section'
// import * as colors from '../styles/variables'

class Todos extends Component {

  // STATE
  // state = {}

  // LIFECYCLE HOOKS
  componentDidMount = () => {
    const { getTodos } = this.props
    getTodos().then(() => {
      this.setState({todos: this.props.loadedTodos})
    })
  }

  // HANDLERS

  // RENDER METHOD
  render () {
    const { todos } = this.props
    return (
      <StyledSection>
          <StyledMainHeading>
            <h1>Todos</h1>
          </StyledMainHeading>
    
          <StyledMainContent>
            <StyledShadow>

              { /* TODOS */ }
              <h2>todos...</h2>
              { todos && todos.map(todo => (
                <Todo
                  todo={todo} />
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
    todos: state.todo.todos
  }
}

const mapDispatchToProps = (dispatch) => ({
  setFlashMessage: (flash) => dispatch(actions.setFlashMessage(flash)),
  getTodos: () => dispatch(actions.getTodos())

})

// EXPORT
export default connect( mapStateToProps, mapDispatchToProps )( Todos )