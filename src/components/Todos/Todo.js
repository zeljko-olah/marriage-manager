import React, {Component} from 'react'
import moment from 'moment'

import WithOutsideClick from '../../hoc/WithOutsideClick'
import Avatar from '../../components/user/Avatar'

// Styled components
import styled from 'styled-components'
import { StyledShadow } from '../../styles/section'
import * as colors from '../../styles/variables'

import CheckIcon from 'react-icons/lib/md/done'
import FailIcon from 'react-icons/lib/md/thumb-down'
import ActiveIcon from 'react-icons/lib/md/directions-run'
import MoreHorizIcon from 'react-icons/lib/md/more-horiz'
import MoreIcon from 'react-icons/lib/md/more-vert'
import DeleteIcon from  'react-icons/lib/md/delete'
import EditIcon from  'react-icons/lib/md/edit'
import RenewIcon from  'react-icons/lib/md/refresh'

const handleAvatars = (todo, users) => {
  const user = todo.who

  let avatar
  if (user === 'both') {
    avatar = [users[0], users[1]]
  } else {
    avatar = [users.find(u => u.name === user)]
  }

  return avatar.map(a => (
    <Avatar
      key={a.id}
      name={a.name}
      src={a.avatar} />
  ))
}

// COMPONENT
class Todo extends Component {

  state = {
    showMoreInfo: false,
    showMarkTodo: false,
    showEditMode: false,
    editTitle: 'Zeljko je car'
  }
  
  todoId = ''
  titleInput = React.createRef()

  handleShowMore = () => {
    this.setState((prevState) => {
      return {showMoreInfo: !prevState.showMoreInfo}
    })
  }

  handleMarkTodos = () => {
    this.setState((prevState) => {
      return {showMarkTodo: !prevState.showMarkTodo}
    })
  }

  closeMarkTodos = () => {
    this.setState({
      showMarkTodo: false
    })
  }

  handleUpdateTodoStatus = (id, status) => {
    const { updateTodoStatus } = this.props
    updateTodoStatus(id, status)
    this.closeMarkTodos()
  }

  handleDeleteTodo = (id) => {
    const { deleteTodo } = this.props
    deleteTodo(id)
    this.closeMarkTodos()
  }

  handleRenewTodo = (id) => {
    const { renewTodo } = this.props
    renewTodo(id)
    this.closeMarkTodos()
  }

  handleEditMode = (todo) => {
    const { showMoreInfo } = this.state
    this.setState((prevState) => {
      return {
        showEditMode: !prevState.showEditMode,
        editTitle: todo.title
      }
    }, () => {
      if (this.state.showEditMode) {
        this.titleInput.current.focus()
        this.closeMarkTodos()
        if (!showMoreInfo) {
          this.handleShowMore()          
        }
        this.todoId = todo.id
      }
    })
  }

  closeEditMode = () => {
    this.setState({
      showEditMode: false,
      showMoreInfo: false
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { editTodoTitle } = this.props
    const { editTitle } = this.state
    editTodoTitle(this.todoId, editTitle)
    this.setState((prevState) => {
      return {
        showEditMode: !prevState.showEditMode,
        showMoreInfo: !prevState.showMoreInfo
      }
    })
  }
  

  render () {
    const { showMoreInfo, showMarkTodo, showEditMode, editTitle } = this.state
    const {todo, users, isToday} = this.props

    // Display avatar which task is it
    let avatarForUser;
    
    if (!users.length) {
      avatarForUser = null
    } else {
      avatarForUser = handleAvatars(todo, users)
    }
  
    let day
    const formatDate = moment(todo.date).format('MMM D')
    let todoTime = moment(todo.date)
    let today = moment()
    if (today.isSame(todoTime, 'd')) {
     day = 'today'
    }
  
    let statusClassName
    let statusIcon
    switch (todo.completed) {
      case 'completed':
        statusClassName = 'completed'
        statusIcon = (
          <span><CheckIcon /></span>
        )
        break
      case 'failed':
        statusClassName = 'failed'
        statusIcon = (
          <span><FailIcon /></span>
        )
        break
      default:
        statusClassName = 'active'
        statusIcon = (
          <span><ActiveIcon /></span>
        )
        break
    }
  
    return (
      <StyledTodo>
        <div className = {statusClassName}>
          <StyledShadow>
            <StyledShadow>
              <div
                className="todo-header">
                <div className="check-icon">
                  { statusIcon }
                </div>
               { !showEditMode ? (
                <h2 onClick={this.handleShowMore}>{todo.title}</h2>
               ) : (
                <form className="edit-todo-form" onSubmit={this.handleSubmit}>
                  <WithOutsideClick executeMethod={this.closeEditMode}>
                      <input
                        className="edit-title"
                        type="text"
                        ref={this.titleInput}
                        value={editTitle}
                        onChange={({target}) => {this.setState({
                          editTitle: target.value
                        })}} />
                  </WithOutsideClick>
                </form>
               )  }

                <div className="mark-todo-icon">
                <MoreIcon onClick={this.handleMarkTodos} />
                  <WithOutsideClick executeMethod={this.closeMarkTodos}>
                    <div 
                      className={showMarkTodo ? 'show-todo-actions todo-actions': 'hide-todo-actions todo-actions'} >
                      { todo.completed !== 'completed' ? (
                        <CheckIcon
                          className="done"
                          onClick={() => {this.handleUpdateTodoStatus(todo.id, 'completed')}} />
                      ) : null }
                      { todo.completed !== 'active' && isToday ? (
                        <ActiveIcon 
                          className="active"
                          onClick={() => {this.handleUpdateTodoStatus(todo.id, 'active')}} />
                      ) : null }
                      { todo.completed !== 'failed' ? (
                        <FailIcon
                          className="fail"
                          onClick={() => {this.handleUpdateTodoStatus(todo.id, 'failed')}} />
                      ) : null }
                      { !isToday ? (
                        <RenewIcon
                        className="renew"
                        onClick={() => {this.handleRenewTodo(todo.id)}} />
                      ) : null }
                      <EditIcon
                        className="edit"
                        onClick={() => {this.handleEditMode(todo)}}/>
                      <DeleteIcon
                        className="delete"
                        onClick={() => {this.handleDeleteTodo(todo.id)}} />
                    </div>
                  </WithOutsideClick>
                </div>
              </div>
            </StyledShadow>
              <div className={showMoreInfo ? 'todo-content show' : 'todo-content hide'}>
                <div className="">
                  <span>Task is for <strong>{todo.who}</strong></span>
                </div>
                <div className="todo-avatar">
                  <span>{avatarForUser }</span>
                </div>
                <div className="schedule">
                  <span>Do it <strong>{day === 'today' ? day : `on ${formatDate}`}</strong></span>
                </div>
                <div>
                  <span>With <strong>{todo.priority}</strong> priority.</span>
                </div>
                <div className="todo-description">
                  <span><strong>See description <MoreHorizIcon /></strong></span>
                  <div>{todo.description}</div>
                </div>
              </div>
            </StyledShadow>
        </div>
      </StyledTodo>
    )
  }
}

export default Todo

const StyledTodo = styled.div`
  position: relative;

  & .todo-header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
  }
  & .completed .todo-header h2 {
    // border-left: 5px solid ${colors.success};
  }
  & .failed .todo-header h2{
    // border-left: 5px solid ${colors.sec_color};
  }
  & .active .todo-header h2 {
    // border-left: 5px solid ${colors.prim_color};
  }

  & h2, input.edit-title {
    flex-grow: 1;
    font-size: 17px;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding-left: 5px;
    color: ${colors.prim_color};
    margin: 5px 5px;
    background-color: transparent;
  }

  & .edit-todo-form {
    width: 100%;
    flex-grow: 1;
  }

  & input.edit-title {
    width: 100%;
    padding: 5px;
    outline: none;
    border: none;
  }
  
  & .completed h2,
  & .completed input.edit-title {
    color: ${colors.success};
    text-decoration: line-through;
  }
  & .active h2,
  & .active input.edit-title {
    color: ${colors.prim_color};
  }
  & .failed h2,
  & .failed input.edit-title {
    color: ${colors.sec_color};
  }

  & .mark-todo-icon {
    position: relative;
    flex-basis: 25%;
    text-align: right;
    font-size: 20px;
    cursor: pointer;
    color: ${colors.prim_light};

    & .todo-actions {
      position: absolute;
      top: -9px;
      right: -9px;
      padding: 9px;
      transition: all .3s ease-in; 
      transform-origin: top right;

      & svg {
        margin-right: 5px;
        color: grey;
        transition: all .1s linear;

        &:hover {
          transform: scale(1.1) translateX(10%);

        }
      }

      & svg.done:hover {
        color: ${colors.success};
      }
      & svg.active:hover {
        color: ${colors.prim_color};
      }
      & svg.fail:hover {
        color: ${colors.sec_color};
      }
      & svg.delete:hover {
        color: ${colors.sec_light};
      }
      & svg.edit:hover {
        color: ${colors.boy_color};
      }
      & svg.renew:hover {
        color: ${colors.girl_color};
      }
    }

    .show-todo-actions {
      background-color: ${colors.overlay};
      opacity: 1;
      transform: scale(1);
      margin-right: 0;
    }
    .hide-todo-actions {
      margin-right: 15px;
      opacity: 0;
      transform: scale(0);
    }
  }

  & .check-icon {
    font-size: 30px;
    cursor: pointer;
  }

  & .completed .check-icon {
    color: ${colors.success};
  }
  & .active .check-icon {
    color: ${colors.prim_color};

  }
  & .failed .check-icon {
    color: ${colors.sec_color};
  }

  & .todo-content {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color:${colors.ter_yellow};
    transition: all .3s ease-in;

    & > div {
      font-size: 10px;
      margin-left: 5px;
      font-style: italic;
    }
  }
  & .hide {
    opacity: 0;
    height: 0;
    transform: translateY(-10%);
  }
  & .show {
    opacity: 1;
    height: 20px;
    transform: translateY(0);
  }

  & .todo-avatar {
  }
  & .todo-avatar span {
    display: flex;
  }

  & .todo-avatar span div {
    width: 30px;
  }

  & .todo-description {
    position: relative;
    & div {
      display: none;
    }
  }
  & .todo-description:hover {

    & span {
    cursor: pointer;
    }

    & div {
      position: absolute;
      min-width: 200px;
      top: -50px;
      right: 10px;
      display: block;
      padding: 10px;
      font-size: 13px;
      font-weight: bold;
      background-color: ${colors.ter_yellow};
      color: ${colors.prim_font};
      border-radius: 3px;
      z-index: 1000;

      &:after {
        content: '';
        position: absolute;
        top: 90%;
        left: 90%;
        border-top: 8px solid ${colors.ter_yellow};
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
      }
    }
  }

  .todo-labeled {
    position: absolute;
    color: white;
    font-size: 20px;
    text-transform: uppercase;
    padding: 3px;
    top: 40%;
    right: 30%;
    transform: rotate(30deg);
    z-index: 1000;
  }

  & strong {
    text-transform: uppercase;
    color: ${colors.prim_color};
  }

  .completed .todo-labeled {
    color: ${colors.success};
    border: 2px solid ${colors.success};
    // background-color: ${colors.success_light};
  }

  .failed .todo-labeled {
    color: ${colors.sec_color};
    border: 1px solid ${colors.sec_color};
    background-color: ${colors.sec_light};
  }

  .active .todo-labeled {
    display: none;
  }

  // EDIT TODO FORM
  .edit-todo-form {
    & .edit-title {
      width: 100%;
    }
  }
`
 