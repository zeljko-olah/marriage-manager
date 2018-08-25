import axios from '../../http'
import * as actionTypes from './actionTypes'

// SUCCESS
export const addTodoSuccess = (todo) => {
  return {
      type: actionTypes.ADD_TODO,
      todo
  }
}

// FAIL
export const addTodoFail = (error) => {
  return {
      type: actionTypes.ADD_TODO,
      error
  }
}

// ADD TODO
export const addTodo = (todo) => {
  return dispatch => {
    return axios.post('api/todos/create', todo)
    .then(response => {
      dispatch(addTodoSuccess(response.data))
      return response.data
    })
    .catch(err => {
      dispatch(addTodoFail(err))
    })
  }
}

export const getTodosSuccess = (todos) => {
  return {
      type: actionTypes.GET_TODOS,
      todos
  }
}

export const getTodosFail = (error) => {
  return {
      type: actionTypes.GET_TODOS,
      error
  }
}

// export const getTodos = () => {
//   return dispatch => {
//     return axios.get('api/todos/index')
//       .then(response => {
//         dispatch(getTodosSuccess(response.data))
//         return response.data
//       })
//       .catch(err => {
//         dispatch(getTodosFail(err))
//       })
//   }
// }

export const getTodosForDate = (date) => {
  return dispatch => {
    return axios.get('api/todos/index', {
      params: {date: date}
    })
      .then(response => {
        dispatch(getTodosSuccess(response.data))
        return response.data
      })
      .catch(err => {
        console.log(err)
        dispatch(getTodosFail(err))
      })
  }
}
