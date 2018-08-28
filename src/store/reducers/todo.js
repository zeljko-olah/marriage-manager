import * as actionTypes from '../actions/actionTypes'
import moment from 'moment'

import { updateObject } from '../../shared/utility'

const initialState = {
    todos: null,
    date: moment(),
    sortType: '',
    sortCriteria: ''
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
const sortTodos = (state, action) => {
    return updateObject(state, {
      sortType: action.sortType,
      sortCriteria: action.criteria
    })
}

// DEFINE REDUCER
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_TODO: return addTodo(state, action)
        case actionTypes.GET_TODOS: return getTodos(state, action)
        case actionTypes.SET_CURRENT_DATE: return setCurrentDate(state, action)
        case actionTypes.SORT_TODOS: return sortTodos(state, action)
        default:
            return state
    }
}

export default reducer