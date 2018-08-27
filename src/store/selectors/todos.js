import { createSelector } from 'reselect'
import moment from 'moment'

export const selectUserName = (state) => state.auth.user.name
export const selectAllTodos = (state) => state.todo.todos

export const selectNewTodosFirst = (state) => {
  const {todos} = state.todo
  if (todos) {
    return todos
    .sort((a,b) => moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf())
  } else {
    return []
  }
}