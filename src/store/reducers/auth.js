// IMPORT ACTION TYPE CONSTANTS
import * as actionTypes from '../actions/actionTypes'

// IMPORT UPDATE OBJECT HELPER
import { updateObject } from '../../shared/utility'

// DEFINE INITIAL STATE
const initialState = {
    // token
    token: null,
    // user id
    userId: null,
    // error
    error: null,
    // user
    user: null,
    // loading
    loading: false
}

// START AUTH PROCESS AND LOAD SPINNER AND REMOVE POTENTIAL ERRORS
const authStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } )
}

// WHEN AUTH SUCCEEDS UPDATE STATE WITH TOKEN AND USER ID
const authSuccess = (state, action) => {
    // use helper method upddate object here

    return updateObject( state, {
        token: action.idToken,
        userId: action.userId,
        user: action.user,
        error: null,
        loading: false
     } )
}

// IF AUTH FAILS THEN SET ERORR STATE AND STOP LOADING
const authFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    })
}

// ON LOGOUT REMOVE TOKEN AND USER ID
const authLogout = (state, action) => {
    return updateObject(state, { token: null, userId: null })
}

const setErrors = (state, action) => {
    return updateObject(state, action.error)
}

// DEFINE REDUCER
// need initial state on startup
// pass action as second argument (action.type, action.payload)
const reducer = ( state = initialState, action ) => {
    // MAIN SWITCH STATEMENT - managed by action types
    switch ( action.type ) {
        case actionTypes.AUTH_START: return authStart(state, action)
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action)
        case actionTypes.AUTH_FAIL: return authFail(state, action)
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action)
        case actionTypes.SET_ERRORS: return setErrors(state, action)
        default:
            return state
    }
}

export default reducer