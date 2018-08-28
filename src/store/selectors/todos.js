import { createSelector } from 'reselect'
import moment from 'moment'

export const selectUserName = (state) => state.auth.user.name
export const selectAllTodos = (state) => state.todo.todos
export const selectFilterParameters = (state) => {
  return {
    type: state.todo.sortType,
    criteria: state.todo.sortCriteria
  }
}

export const selectTodosDate = (state) => {
  return moment(state.todo.date).valueOf()
}

export const selectIsToday = createSelector(
  selectTodosDate, (todosDate) => {
    const isToday = moment(todosDate).isSame(moment(), 'd')
    return isToday
  }
)

export const selectPercentage = createSelector(
  selectAllTodos, (todos) => {
    if (todos) {
      const todosCount = todos.length
      const completed = todos.filter(t => t.completed === 'completed').length
      const percentage = completed / todosCount * 100
      return percentage
    }
  }
)

export const selectTodoStatusCount = createSelector(
  selectAllTodos, (todos) => {
    if (todos) {
      const completed = todos.filter(t => t.completed === 'completed').length
      const active = todos.filter(t => t.completed === 'active').length
      const failed = todos.filter(t => t.completed === 'failed').length

      return {
        completed,
        active,
        failed
      }
    }
  }
)

export const selectFilteredTodos = createSelector(
  selectFilterParameters, selectAllTodos,  (filterParameters, todos) => {
    if (filterParameters.type === 'user') {
      return todos.filter(t => t.who === filterParameters.criteria)      
    }
    if (filterParameters.type === 'status') {
      return todos.filter(t => t.completed === filterParameters.criteria) 
    }

    return todos
  }
)

export const selectNewTodosFirst = (state) => {
  const {todos} = state.todo
  if (todos) {
    return todos
    .sort((a,b) => moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf())
  } else {
    return []
  }
}