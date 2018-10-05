import * as actionTypes from '../actions/actionTypes'

import { updateObject } from '../../shared/utility'

const initialState = {
    loading: 0
}

// SET LOADING
const setLoading = (state, action) => {
    const obj = {
      loading: state.loading + action.loading
    }
    return updateObject(state, obj)
}

// DEFINE REDUCER
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.LOADING: return setLoading(state, action)
        default:
            return state
    }
}

export default reducer