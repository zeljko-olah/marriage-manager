import axios from '../../http'
import * as actionTypes from './actionTypes'

// SUCCESS
export const addReminderSuccess = (reminder) => {
  return {
      type: actionTypes.ADD_REMINDER,
      reminder
  }
}

// FAIL
export const addReminderFail = (error) => {
  return {
      type: actionTypes.ADD_REMINDER,
      error
  }
}

// ADD REMINDER
export const addReminder = (reminder) => {
  return dispatch => {
    return axios.post('api/reminders/create', reminder)
    .then(response => {
      dispatch(addReminderSuccess(response.data))
      return response.data
    })
    .catch(err => {
      dispatch(addReminderFail(err))
    })
  }
}
