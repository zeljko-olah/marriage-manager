import * as actionTypes from '../actions/actionTypes'

import { updateObject } from '../../shared/utility'

const initialState = {
    todo: null
}

// SET LOCATION
const addTodo = (state, action) => {
    return updateObject( state, action.todo)
}

// // GET LOCATIONS
// const getLocations = (state, action) => {
//     return updateObject( state, {
//       locations: action.locations
//     })
// }

// DEFINE REDUCER
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_TODO: return addTodo(state, action)
        // case actionTypes.GET_LOCATIONS: return getLocations(state, action)
        default:
            return state
    }
}

export default reducer