import React from 'react'
import moment from 'moment'

// Styled components
import styled from 'styled-components'
import { StyledShadow } from '../../styles/section'
import * as colors from '../../styles/variables'

import CheckIcon from 'react-icons/lib/md/check'
import DoneIcon from 'react-icons/lib/md/done-all'

const Todo = ({todo}) => {
  return (
    <StyledTodo>
      <StyledShadow>
        <StyledShadow>
          <div className="todo-header">
            <h2>{todo.title}</h2> 
            <div
              className={todo.completed ? 'check-icon-completed': 'check-icon'}>
             {!todo.completed ? (
              <span><CheckIcon /></span>
             ) : (
              <span><DoneIcon /></span>
             )}
            </div>
          </div>
        </StyledShadow>
        <div>
          <div className="schedule">
            <span>sheduled for: {moment(todo.date).format('ddd - Do MMM. YYYY')}</span>
          </div>
          <div>
            <span>task for: {todo.who}</span>
          </div>
          <div>
            <span>description: {todo.description}</span>
          </div>
          <div>
            <span>priority: {todo.priority}</span>
          </div>
          <div>
            <span>{todo.completed ? 'completed': 'not completed'}</span>
          </div>
        </div>  
      </StyledShadow>
    </StyledTodo>
  )
}

export default Todo

const StyledTodo = styled.div`

  & .todo-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  & h2 {
    color: ${colors.prim_color};
    margin: 5px 5px;
  }

  & .check-icon-completed {
    color: ${colors.prim_color};
    font-size: 30px;
    // background-color: #fff;
    // padding: 5px;
    cursor: pointer;
    border-radius: 50%;
  }

  & .check-icon {
    color: ${colors.disabled};
    font-size: 30px;
    cursor: pointer;
  }
`