import axios from '../../http'
import * as actionTypes from './actionTypes'

// AUTH SUCCESS - pass token and user id in action object payload
export const socketInit = (socket) => {
  return {
      type: actionTypes.SOCKET_INIT,
      socket
  }
}

export const getMessagesSuccess = (messages) => {
  return {
    type: actionTypes.GET_MESSAGES,
    messages
  }
}

export const getMessagesFailed = (error) => {
  return {
    type: actionTypes.GET_MESSAGES,
    error
  }
}

export const getMessages = () => {
  return dispatch => {
    return axios.get('api/chat/messages')
      .then(response => {
        dispatch(getMessagesSuccess(response.data.messages))
      })
      .catch(err => {
        dispatch(getMessagesFailed(err.response.data.message))
      })
  }
}