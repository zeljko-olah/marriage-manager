import axios from '../../http'
import * as actionTypes from './actionTypes'
import {getCoordsPromise} from '../../shared/utility'
import { setLoading } from './index'

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
    dispatch(setLoading(1))
    return axios.post('api/location/current', userLocation)
    .then(response => {
      dispatch(setLocationSuccess(response.data))
      dispatch(setLoading(-1))
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
    dispatch(setLoading(1))
    return axios.get('api/location/all')
      .then(response => {
        dispatch(getLocationsSuccess(response.data.locations))
        dispatch(setLoading(-1))
        return response.data
      })
      .catch(err => {
        dispatch(getLocationsFail(err))
      })
  }
}

export const clearLocations = (userId) => {
  return dispatch => {
    dispatch(setLoading(1))
    return axios.delete('api/location/clear', {params: {uid: userId}})
    .then(response => {
      // dispatch(setFlashMessage(response.data))
      dispatch(setLoading(-1))
      return response.data
    })
    .catch(err => {
      console.log(err)
      // dispatch(setFlashMessage(err.data))
      dispatch(setLoading(-1))
    })
  }
}
