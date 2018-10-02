import * as actionTypes from '../actions/actionTypes'

import { updateObject } from '../../shared/utility'

const initialState = {
    lat: null,
    lng: null,
    from: '',
    createdAt: null,
    locations: []
}

// SET LOCATION
const setLocation = (state, action) => {
  const {lat, lng, from, createdAt } = action.location
    return updateObject( state, {
        lat: lat,
        lng: lng,
        from: from,
        createdAt: createdAt
    })
}

// GET LOCATIONS
const getLocations = (state, action) => {
    return updateObject( state, {
      locations: action.locations
    })
}

// DEFINE REDUCER
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SET_LOCATION: return setLocation(state, action)
        case actionTypes.GET_LOCATIONS: return getLocations(state, action)
        default:
            return state
    }
}

export default reducer