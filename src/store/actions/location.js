import axios from '../../http'
import * as actionTypes from './actionTypes'
import {getCoordsPromise} from '../../shared/utility'

// AUTH SUCCESS - pass token and user id in action object payload
export const setLocationSuccess = (location) => {
  return {
      type: actionTypes.SET_LOCATION,
      location
  }
}

export const setLocationFail = (error) => {
  return {
      type: actionTypes.SET_LOCATION,
      error
  }
}

export const getUserCoords = (userId) => {
  return dispatch => {
    return getCoordsPromise()
      .then(({coords}) => {
        const { latitude, longitude } = coords
        const userLocation = {
          lat: latitude,
          lng: longitude,
          userId
        }
        return userLocation
      })
  }
}

export const setLocation = (userLocation) => {
  return dispatch => {
    return axios.post('api/location/current', userLocation)
    .then(response => {
      dispatch(setLocationSuccess(response.data))
      return response.data
    })
    .catch(err => {
      dispatch(setLocationFail(err))
    })
  }
}

export const getLocationsSuccess = (locations) => {
  return {
      type: actionTypes.GET_LOCATIONS,
      locations
  }
}

export const getLocationsFail = (error) => {
  return {
      type: actionTypes.GET_LOCATIONS,
      error
  }
}

export const getLocations = () => {
  return dispatch => {
    return axios.get('api/location/all')
      .then(response => {
        dispatch(getLocationsSuccess(response.data.locations))
        return response.data
      })
      .catch(err => {
        dispatch(getLocationsFail(err))
      })
  }
}
