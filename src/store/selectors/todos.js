import { createSelector } from 'reselect'
import moment from 'moment'

export const selectUserName = (state) => state.auth.user.name
export const selectAllTodos = (state) => state.todo.todos

export const selectFilterParameters = (state) => {
  return {
    userType: state.todo.filterUserType,
    userCriteria: state.todo.filterUserCriteria,
    statusType: state.todo.filterStatusType,
    statusCriteria: state.todo.filterStatusCriteria,
    priorityType: state.todo.filterPriorityType,
    priorityCriteria: state.todo.filterPriorityCriteria
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

export const selectFilteredTodos = createSelector(
  selectFilterParameters, selectAllTodos,  (filterParameters, todos) => {
    const {userCriteria, statusCriteria, priorityCriteria} = filterParameters
    let filteredTodos = todos
    if (todos) {
      if (userCriteria === '' && statusCriteria === '' && priorityCriteria === '' ) {
        return todos
      }
      if (userCriteria !== '') {
        filteredTodos = todos.filter(t => t.who === userCriteria)
      }
      if (statusCriteria !== '') {
        filteredTodos = filteredTodos.filter(t => t.completed === statusCriteria) 
      }        
      if (priorityCriteria !== '') {
        filteredTodos = filteredTodos.filter(t => t.priority === priorityCriteria) 
      }        
      return filteredTodos

    } else {
      return todos
    }
})

export const selectTodoStatusCount = createSelector(
  selectFilteredTodos, (filteredTodos) => {
    if (filteredTodos) {
      const all = filteredTodos.length
      const completed = filteredTodos.filter(t => t.completed === 'completed').length
      const active = filteredTodos.filter(t => t.completed === 'active').length
      const failed = filteredTodos.filter(t => t.completed === 'failed').length
      const remain = all - completed

      return {
        all,
        remain,
        completed,
        active,
        failed
      }
    }
  }
)

export const selectNewTodosFirst = createSelector(
  selectFilteredTodos, (filteredTodos) => {
    if (filteredTodos) {
      return filteredTodos
      .sort((a,b) => moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf())
    } else {
      return []
    }
  }
)

export const selectLastTodayTodo = createSelector(
  selectNewTodosFirst, (sortedTodos) => {
    if (sortedTodos) {
      const lastTodo = sortedTodos[0]
      if (lastTodo && moment(lastTodo.date).isSame(moment(), 'day')) {
        return lastTodo 
      } else return null
    } else {
      return null
    }
  }
)

export const selectPercentage = createSelector(
  selectFilteredTodos, selectFilterParameters, (filteredTodos, filterParameters) => {
    if (filteredTodos && !filterParameters.statusCriteria) {
      const filteredTodosCount = filteredTodos.length
      const completed = filteredTodos.filter(t => t.completed === 'completed').length
      const percentage = completed / filteredTodosCount * 100
      return Math.trunc(percentage)
    } else {
      return 0
    }
  }
)