/*
 * ACTION CREATORS
 *
 */

import axios from '../../http'
import * as actionTypes from './actionTypes'
import { setFlashMessage } from './index'

// START THE SPINNER AND RESET POTENTIAL RESIDUAL ERRORS
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

// RESET ERRORS
export const setErrors = (error) => {
    return {
        type: actionTypes.SET_ERRORS,
        error: error
    }
}

// AUTH SUCCESS - pass token and user id in action object payload
export const authSuccess = (token, userId, user) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId,
        user
    }
}

// IF AUTH FAILS - pass error received from firebase
export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

// AUTHENTICATE THE USER AFTER SUBMIT BUTTON IS CLICKED
export const auth = (email, password) => {
    return dispatch => {
        // COMPOSE AUTH DATA TO SEND TO FIREBASE
        const authData = {
            email,
            password,
        }

        // SEND HTTP REQUEST - and return promise
        return axios.post(`api/user/login`, authData)
            // ON SUCCESS
            .then(response => {

              // LOCAL STORAGE
              localStorage.setItem('token', response.data.token)
              localStorage.setItem('userId', response.data.userId)
              localStorage.setItem('user', JSON.stringify(response.data.user))

              const {token, userId, user} = response.data
              dispatch(authSuccess(token, userId, user))
            })
            // ON ERROR
            .catch(error => {
              // DISPATCH AUTHFAIL - and pass error
              if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
                dispatch(authFail(error.response.data.message))

              } else if (error.request) {

                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request)
                dispatch(setFlashMessage({
                  type: 'error',
                  flashMessage: 'There is a problem with database. Sorry :('
                }))
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
              }
            })
    }
}

// LOGOUT - remove token, expiration date and user id from local storage
export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('user')
  return {
      type: actionTypes.AUTH_LOGOUT
  }
}

// TRY TO AUTOMATICALLY LOG IN USER
export const authCheckState = () => {
  return dispatch => {
      const token = localStorage.getItem('token')

      if (!token) {
          dispatch(logout())
      } else {
          const userId = localStorage.getItem('userId')
          const user = JSON.parse(localStorage.getItem('user'))
          // dispatch auth success and pass token and user id
          dispatch(authSuccess(token, userId, user))
      }
  }
}
