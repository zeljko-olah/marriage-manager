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
    showMarkTodo: false
  }

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
  

  render () {
    const { showMoreInfo, showMarkTodo } = this.state
    const {todo, users} = this.props

    // Display avatar which task is it
    let avatarForUser;
    
    if (!users.length) {
      avatarForUser = null
    } else {
      avatarForUser = handleAvatars(todo, users)
    }
  
    let day
    const formatDate = moment(todo.date).format('MMM D')
    console.log(formatDate)
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
                <h2 onClick={this.handleShowMore}>{todo.title}</h2> 
                <div className="mark-todo-icon">
                <MoreIcon onClick={this.handleMarkTodos} />
                  <WithOutsideClick executeMethod={this.closeMarkTodos}>
                    <div 
                      className={showMarkTodo ? 'show-todo-actions todo-actions': 'hide-todo-actions todo-actions'}>
                      { todo.completed !== 'completed' ? <CheckIcon className="done"/> : null }
                      { todo.completed !== 'active' ? <ActiveIcon className="active"/> : null }
                      { todo.completed !== 'failed' ? <FailIcon className="fail"/> : null }
                      <RenewIcon className="renew"/>
                      <EditIcon className="edit"/>
                      <DeleteIcon className="delete"/>
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

  & h2 {
    font-size: 17px;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding-left: 5px;
    color: ${colors.prim_color};
    margin: 5px 5px;
  }
  
  & .completed h2 {
    color: ${colors.success};
    text-decoration: line-through;
  }
  & .active h2 {
    color: ${colors.prim_color};
  }
  & .failed h2 {
    color: ${colors.sec_color};
  }

  & .mark-todo-icon {
    position: relative;
    flex-grow: 1;
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
    font-size: 10px;
    text-transform: uppercase;
    padding: 3px;
    top: 40%;
    right: 10%;
    transform: rotate(45deg);
  }

  & strong {
    text-transform: uppercase;
    color: ${colors.prim_color};
  }

  .completed .todo-labeled {
    color: ${colors.success};
    border: 1px solid ${colors.success};
  }

  .failed .todo-labeled {
    color: ${colors.sec_color};
    border: 1px solid ${colors.sec_color};
  }

  .active .todo-labeled {
    display: none;
  }
`