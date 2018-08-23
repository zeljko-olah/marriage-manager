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

// export const getLocationsSuccess = (locations) => {
//   return {
//       type: actionTypes.GET_LOCATIONS,
//       locations
//   }
// }

// export const getLocationsFail = (error) => {
//   return {
//       type: actionTypes.GET_LOCATIONS,
//       error
//   }
// }

// export const getLocations = () => {
//   return dispatch => {
//     return axios.get('api/location/all')
//       .then(response => {
//         dispatch(getLocationsSuccess(response.data.locations))
//         return response.data
//       })
//       .catch(err => {
//         dispatch(getLocationsFail(err))
//       })
//   }
// }
