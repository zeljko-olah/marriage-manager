import * as actionTypes from '../actions/actionTypes'
import moment from 'moment'

import { updateObject } from '../../shared/utility'

const initialState = {
    reminders: null,
    date: moment()
}

// // ADD TODO
// const addTodo = (state, action) => {
//     return updateObject(state, action.todo)
// }

// GET REMINDERS
const getReminders = (state, action) => {
    return updateObject(state, action.reminders)
}

// // SET CURRENT DATE
// const setCurrentDate = (state, action) => {
//     return updateObject(state, {date: action.date})
// }

// DEFINE REDUCER
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.GET_REMINDERS: return getReminders(state, action)
        default:
            return state
    }
}

export default reducer