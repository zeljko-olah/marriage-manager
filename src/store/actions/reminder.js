import axios from '../../http'
import qs from 'qs'
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
    return axios.post('api/reminders/create', qs.stringify(reminder))
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

// GET REMINDERS
export const getReminders = () => {
  return dispatch => {
    return axios.get('api/reminders/index')
    .then(response => {
      dispatch(getRemindersSuccess(response.data))
      return response.data.reminders
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
