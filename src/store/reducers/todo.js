import * as actionTypes from '../actions/actionTypes'

import { updateObject } from '../../shared/utility'

const initialState = {
    todos: null
}

// ADD TODO
const addTodo = (state, action) => {
    return updateObject(state, action.todo)
}

// GET TODOS
const getTodos = (state, action) => {
    return updateObject(state, action.todos)
}

// DEFINE REDUCER
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_TODO: return addTodo(state, action)
        case actionTypes.GET_TODOS: return getTodos(state, action)
        default:
            return state
    }
}

export default reducer