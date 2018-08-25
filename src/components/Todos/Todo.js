import React from 'react'
import moment from 'moment'

import Avatar from '../../components/user/Avatar'

// Styled components
import styled from 'styled-components'
import { StyledShadow } from '../../styles/section'
import * as colors from '../../styles/variables'

import CheckIcon from 'react-icons/lib/md/done-all'
import FailIcon from 'react-icons/lib/md/thumb-down'
import ActiveIcon from 'react-icons/lib/md/directions-run'
import MoreHorizIcon from 'react-icons/lib/md/more-horiz'

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
const Todo = ({todo, users}) => {

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
            <div className="todo-header">
              <h2>{todo.title}</h2> 
              <div className="check-icon">
                { statusIcon }
              </div>
            </div>
          </StyledShadow>
            <div className="todo-content">
              <div className="">
                <span>Task is for <strong>{todo.who}</strong></span>
              </div>
              <div className="todo-avatar">
                <span>{avatarForUser }</span>
              </div>
              <div className="schedule">
                <span>to do it <strong>{day === 'today' ? day : `on ${formatDate}`}</strong></span>
              </div>
              <div>
                <span>with <strong>{todo.priority}</strong> priority.</span>
              </div>
              <div className="todo-description">
                <span><strong>See description <MoreHorizIcon /></strong></span>
                <div>{todo.description}</div>
              </div>
            </div>
            
        </StyledShadow>
        <div className="todo-labeled">
          {statusClassName}!
        </div>
      </div>
    </StyledTodo>
  )
}

export default Todo

const StyledTodo = styled.div`
  position: relative;

  & .todo-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  & .completed .todo-header {
    border-left: 10px solid ${colors.success};
  }
  & .failed .todo-header {
    border-left: 10px solid ${colors.sec_color};
  }
  & .active .todo-header {
    border-left: 10px solid ${colors.prim_color};
  }

  & h2 {
    font-size: 17px;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding-left: 10px;
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

    & > div {
      font-size: 10px;
      margin-left: 5px;
      font-style: italic;
    }
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
    font-size: 15px;
    text-transform: uppercase;
    padding: 3px;
    top: 30%;
    right: 10%;
    transform: rotate(45deg);
  }

  & strong {
    text-transform: uppercase;
    color: ${colors.prim_color};
  }

  .completed .todo-labeled {
    color: ${colors.success};
    border: 2px solid ${colors.success};
  }

  .failed .todo-labeled {
    color: ${colors.sec_color};
    border: 2px solid ${colors.sec_color};
  }

  .active .todo-labeled {
    display: none;
  }
`