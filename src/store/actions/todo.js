import axios from '../../http'
import * as actionTypes from './actionTypes'

import { setFlashMessage } from './index'

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

export const updateTodoStatus = (id, status) => {
  return dispatch => {
    return axios.patch('api/todos/completed', {id, status})
      .then(response => {
        dispatch(setFlashMessage(response.data))
        return response.data
      })
      .catch(err => {
        console.log(err)
        dispatch(setFlashMessage(err.data))
      })
  }
}

export const deleteTodo = (id) => {
  return dispatch => {
    return axios.delete('api/todos/delete/', {params: {id: id}})
      .then(response => {
        dispatch(setFlashMessage(response.data))
        return response.data
      })
      .catch(err => {
        console.log(err)
        dispatch(setFlashMessage(err.data))
      })
  }
}

export const renewTodo = (id, date) => {
  return dispatch => {
    return axios.patch('api/todos/renew', {id, date})
      .then(response => {
        dispatch(setFlashMessage(response.data))
        return response.data
      })
      .catch(err => {
        if (err) {
          dispatch(setFlashMessage(err.response.data))
        }
      })
  }
}

export const editTodoTitle = (id, title) => {
  return dispatch => {
    return axios.patch('api/todos/title', {id, title})
      .then(response => {
        dispatch(setFlashMessage(response.data))
        return response.data
      })
      .catch(err => {
        if (err) {
          dispatch(setFlashMessage(err.response.data))
        }
      })
  }
}

export const setCurrentDate = (date) => {
  return {
    type: actionTypes.SET_CURRENT_DATE,
    date
  }
}

export const sortUserTodos = (criteria, filterType) => {
  return {
    type: actionTypes.SORT_USER_TODOS,
    criteria,
    filterType
  }
}
export const sortStatusTodos = (criteria, filterType) => {
  return {
    type: actionTypes.SORT_STATUS_TODOS,
    criteria,
    filterType
  }
}
export const sortPriorityTodos = (criteria, filterType) => {
  return {
    type: actionTypes.SORT_PRIORITY_TODOS,
    criteria,
    filterType
  }
}
