import React, { Fragment } from 'react'

import Loading from '../../components/UI/Loading'
import TodoIcon from  'react-icons/lib/md/playlist-add-check'

import { StyledShadow } from '../../styles/section'

const TodoInfo = ({
  user,
  partner,
  history,
  todoCount,
  userLastTodo
 }) => {
  return (
    <Fragment>
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
      
    </Fragment>
  )
}

export default TodoInfo