import * as actionTypes from '../actions/actionTypes'
import moment from 'moment'

import { updateObject } from '../../shared/utility'

const initialState = {
    todos: null,
    date: moment(),
    filterUserType: '',
    filterUserCriteria: '',
    filterStatusType: '',
    filterStatusCriteria: ''
}

// ADD TODO
const addTodo = (state, action) => {
    return updateObject(state, action.todo)
}

// GET TODOS
const getTodos = (state, action) => {
    return updateObject(state, action.todos)
}

// SET CURRENT DATE
const setCurrentDate = (state, action) => {
    return updateObject(state, {date: action.date})
}

// SET SORT PARAMETERS
const sortUserTodos = (state, action) => {
    return updateObject(state, {
      filterUserType: action.filterType,
      filterUserCriteria: action.criteria
    })
}

// SET SORT PARAMETERS
const sortStatusTodos = (state, action) => {
    return updateObject(state, {
      filterStatusType: action.filterType,
      filterStatusCriteria: action.criteria
    })
}

// DEFINE REDUCER
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_TODO: return addTodo(state, action)
        case actionTypes.GET_TODOS: return getTodos(state, action)
        case actionTypes.SET_CURRENT_DATE: return setCurrentDate(state, action)
        case actionTypes.SORT_USER_TODOS: return sortUserTodos(state, action)
        case actionTypes.SORT_STATUS_TODOS: return sortStatusTodos(state, action)
        default:
            return state
    }
}

export default reducer