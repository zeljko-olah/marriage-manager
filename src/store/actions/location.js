import axios from '../../http'
import * as actionTypes from './actionTypes'

// AUTH SUCCESS - pass token and user id in action object payload
export const setLocation = (location) => {
  return {
      type: actionTypes.SET_LOCATION,
      location
  }
}