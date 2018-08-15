import * as actionTypes from '../actions/actionTypes'

import { updateObject } from '../../shared/utility'

const initialState = {
    lat: 44.8482181,
    lng: 19.3548942
}

// SOCKET INIT
const setLocation = (state, action) => {
  console.log('ACTION', action)
  const {lat, lng} = action.location
    return updateObject( state, {
        lat: lat,
        lng: lng
    })
}

// DEFINE REDUCER
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SET_LOCATION: return setLocation(state, action)
        default:
            return state
    }
}

export default reducer