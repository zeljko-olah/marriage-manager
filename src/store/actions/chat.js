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
        console.log(err)
        dispatch(setFlashMessage({
          type: 'error',
          flashMessage: 'Something went wrong'
        }))
      })
  }
}

export const markMessagesAsRead = (ids) => {
  return dispatch => {
    return axios.put('api/chat/messages/unread', ids)
      .then((response) => {
        dispatch(setFlashMessage(response.data))
        dispatch(getMessages())
      })
      .catch(err => {
        dispatch(setFlashMessage({
          type: 'error',
          flashMessage: 'Something went wrong'
        }))
      })
  }
}

export const removeImportantMessage = (id) => {
  return dispatch => {
    return axios.put('api/chat/messages/important', {id})
      .then(() => {
        dispatch(getMessages())
      })
      .catch(err => {
        dispatch(setFlashMessage({
          type: 'error',
          flashMessage: 'Something went wrong'
        }))
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
        dispatch(saveMessageSuccess(message))
        return response.data
      })
      .catch(err => {
        dispatch(saveMessageFail(err))
      })
  }
}

export const setFlashMessage = (flashMessage) => {
  return {
    type: actionTypes.SET_FLASH_MESSAGE,
    flashMessage
  }
}

export const emailChatHistory = (messages, user) => {
  return dispatch => {
    return axios.post('api/chat/save', {messages, user})
      .then(response => {
        console.log(response.data)
        dispatch(setFlashMessage(response.data))
      })
      .catch(err => {
        dispatch(setFlashMessage(err.response.data))
      })
  }
}

export const deleteChatHistory = (room) => {
  return dispatch => {
    return axios.delete('api/chat/messages', {
      params: {
        room: room
      }
    })
      .then(response => {
        console.log(response.data)
        dispatch(setFlashMessage(response.data))
      })
      .catch(err => {
        dispatch(setFlashMessage(err.response.data))
      })
  }
}

