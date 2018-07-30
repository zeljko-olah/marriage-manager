import * as actionTypes from './actionTypes'

// AUTH SUCCESS - pass token and user id in action object payload
export const socketInit = (socket) => {
  return {
      type: actionTypes.SOCKET_INIT,
      socket
  }
}