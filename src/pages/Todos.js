import React, {Component} from 'react'
import moment from 'moment'

// REDUX
import { connect } from 'react-redux'
import * as actions from '../store/actions'
import { selectAllRoomUsers } from '../store/selectors/chat'
import { 
  selectPercentage, selectTodosDate, selectIsToday, selectNewTodosFirst, selectTodoStatusCount
 } from '../store/selectors/todos'

import Todo from '../components/Todos/Todo'
import TodosMenu from '../components/Todos/TodosMenu'

// Styled components
import styled from 'styled-components'
import * as colors from '../styles/variables'
import {
  StyledSection, StyledMainHeading, StyledMainContent, StyledShadow
} from '../styles/section'

// Events
import * as events from '../events'

class Todos extends Component {

  // STATE

  // LIFECYCLE HOOKS
  componentDidMount = () => {
    const { getTodosForDate } = this.props
    getTodosForDate(moment().valueOf()).then(() => {
      // sortUserTodos(user.name, 'user')
    })
  }

  componentDidUpdate = (prevProps) => {
    const { socket, setFlashMessage, getTodosForDate } = this.props
    if (socket !== null && prevProps.socket !== socket) {
      socket.on(events.TODO_ADDED, (todo, user) => {
        getTodosForDate(todo.date)
        setFlashMessage({
          type: 'success',
          flashMessage: `${user.name} added new task!`
        })
      })
    }
  }

  componentWillUnmount() {
    const { socket } = this.props
    socket.off(events.TODO_ADDED)
  }

  // HANDLERS  
  handleDateUpdate = (date) => {
    const { getTodosForDate, setCurrentDate } = this.props
    setCurrentDate(moment(date))
    getTodosForDate(date).then(() => {
      // @TODO - loading
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

  handleEditTodoTitle = (id, title) => {
    const { editTodoTitle, getTodosForDate, todosDate } = this.props
    editTodoTitle(id, title).then(() => {
      getTodosForDate(todosDate)
    })
  }

  handleSortByUser = (userName) => {
    const { sortUserTodos } = this.props
    let type = 'user'
    if (!userName) {
      type = ''
    }
    sortUserTodos(userName, type)
  }

  handleSortByStatus = (status) => {
    const { sortStatusTodos } = this.props
    let type = 'status'
    if (!status) {
      type = ''
    }
    sortStatusTodos(status, type)
  }

  handleSortByPriority = (priority) => {
    const { sortPriorityTodos } = this.props
    let type = 'priority'
    if (!priority) {
      type = ''
    }
    sortPriorityTodos(priority, type)
  }

  handleCongratulations = () => {
    const { setFlashMessage } = this.props
    setFlashMessage({
      type: 'success',
      flashMessage: `Congratulations. You did it all!`
    })
  }
  

  // RENDER METHOD
  render () {
    const { 
      todos, user, users, isToday, todosDate, percentage, filterByUser, filterByStatus, filterByPriority, statusCount
    } = this.props

    let listTodos = null

    if (todos && todos.length === 0) {
      listTodos = (
        <StyledShadow>
          <StyledNoTodos>
            {filterByUser === '' && filterByStatus ==='' ? (
              <div>
                No Tasks for {moment(todosDate).format('MMM Do, YYYY')}
              </div>
            ) : (
              <div>
                No Tasks for desired filter.
              </div>
            )}
          </StyledNoTodos>
        </StyledShadow>
      ) 
    }

    if (todos && todos.length) {
      listTodos = todos.map(todo => (
        <Todo
          key={todo.id}
          todo={todo}
          user={user}
          users={users}
          isToday={isToday}
          updateTodoStatus={this.handleUpdateStatus}
          deleteTodo={this.handleDeleteTodo}
          renewTodo={this.handleRenewTodo}
          editTodoTitle={this.handleEditTodoTitle}/>
      ))
    }

    return (
      <StyledSection>
          <StyledMainHeading>
            <h1>Todos</h1>
          </StyledMainHeading>
    
          <StyledMainContent>
            <StyledTodos>
              <StyledShadow>

                { /* TODOS */ }
                <TodosMenu
                  dateUpdate={this.handleDateUpdate}
                  todosDate={moment(todosDate)}
                  percentage={percentage}
                  statusCount={statusCount}
                  users={users}
                  sortByUser={this.handleSortByUser}
                  sortByStatus={this.handleSortByStatus}
                  sortByPriority={this.handleSortByPriority}
                  filterByUser={filterByUser}
                  filterByStatus={filterByStatus}
                  filterByPriority={filterByPriority}
                  congratulations={this.handleCongratulations} />
                  
                {listTodos}
                
              </StyledShadow>      
            </StyledTodos>      
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
    percentage: selectPercentage(state),
    statusCount: selectTodoStatusCount(state),
    users: selectAllRoomUsers(state),
    todosDate: selectTodosDate(state),
    isToday: selectIsToday(state),
    filterByUser: state.todo.filterUserCriteria,
    filterByStatus: state.todo.filterStatusCriteria,
    filterByPriority: state.todo.filterPriorityCriteria
  }
}

const mapDispatchToProps = (dispatch) => ({
  setFlashMessage: (flash) => dispatch(actions.setFlashMessage(flash)),
  getTodos: () => dispatch(actions.getTodos()),
  getTodosForDate: (date) => dispatch(actions.getTodosForDate(date)),
  updateTodoStatus: (id, status) => dispatch(actions.updateTodoStatus(id, status)),
  deleteTodo: (id) => dispatch(actions.deleteTodo(id)),
  setCurrentDate: (date) => dispatch(actions.setCurrentDate(date)),
  renewTodo: (id, todosDate) => dispatch(actions.renewTodo(id, todosDate)),
  editTodoTitle: (id, title) => dispatch(actions.editTodoTitle(id, title)),
  sortUserTodos: (criteria, type) => dispatch(actions.sortUserTodos(criteria, type)),
  sortStatusTodos: (criteria, type) => dispatch(actions.sortStatusTodos(criteria, type)),
  sortPriorityTodos: (criteria, type) => dispatch(actions.sortPriorityTodos(criteria, type))
})

// EXPORT
export default connect( mapStateToProps, mapDispatchToProps )( Todos )

const StyledTodos = styled.div`

  & .completed {
    color: ${colors.success};
  }
  & .failed {
    color: ${colors.sec_color};
  }
  & .active {
    color: ${colors.prim_color};
  }
  
`

const StyledNoTodos = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;

  & div {
    color: ${colors.prim_light};
    font-size: 20px;
    text-transform: uppercase;
  }
`