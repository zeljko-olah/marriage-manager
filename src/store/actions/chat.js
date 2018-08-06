import axios from '../../http'
import * as actionTypes from './actionTypes'

// AUTH SUCCESS - pass token and user id in action object payload
export const socketInit = (socket) => {
  return {
      type: actionTypes.SOCKET_INIT,
      socket
  }
}

export const toggleChat = (showChat) => {
  return {
    type: actionTypes.TOGGLE_CHAT,
    showChat
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
        dispatch(getMessagesFailed(err))
      })
  }
}

export const saveMessageSuccess = (message) => {
  return {
    type: actionTypes.SAVE_MESSAGE,
    message
  }
}

export const saveMessageFail = (error) => {
  return {
    type: actionTypes.SAVE_MESSAGE,
    error
  }
}

export const saveMessage = (message) => {
  return dispatch => {
    return axios.post('api/chat/messages', { message })
      .then(response => {
        dispatch(getMessagesSuccess(message))
      })
      .catch(err => {
        dispatch(saveMessageFail(err))
      })
  }
}