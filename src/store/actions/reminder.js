import axios from '../../http'
import * as actionTypes from './actionTypes'

import { setFlashMessage } from './index'

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

// SUCCESS
export const getRemindersSuccess = (reminders) => {
  return {
      type: actionTypes.GET_REMINDERS,
      reminders
  }
}

// FAIL
export const getRemindersFail = (error) => {
  return {
      type: actionTypes.GET_REMINDERS,
      error
  }
}

// GET REMINDER
export const getReminders = () => {
  return dispatch => {
    return axios.get('api/reminders/index')
    .then(response => {
      console.log(response.data)
      dispatch(getRemindersSuccess(response.data))
      return response.data
    })
    .catch(err => {
      dispatch(getRemindersFail(err))
    })
  }
}

// DELETE REMINDER
export const deleteReminder = (id) => {
  return dispatch => {
    return axios.delete('api/reminders/delete/', {params: {id: id}})
      .then(response => {
        dispatch(setFlashMessage(response.data))
        return response.data
      })
      .catch(err => {
        console.log(err)
        dispatch(setFlashMessage(err.data))
      })
  }
}
