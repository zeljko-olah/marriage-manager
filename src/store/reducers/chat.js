import * as actionTypes from '../actions/actionTypes'

import { updateObject } from '../../shared/utility'

const initialState = {
    // socket
    socket: null,
    showChat: false,
    messages: [],
    message: null
}

// SOCKET INIT
const socketInit = (state, action) => {
    return updateObject( state, {
        socket: action.socket
    })
}

// TOOGLE CHAT
const toggleChat = (state, action) => {
    return updateObject( state, {
        showChat: !action.showChat
    })
}

// GET CHAT MESSAGES
const getMessages = (state, action) => {
    return updateObject( state, {
        messages: action.messages
    })
}

// SAVE CHAT MESSAGE
const saveMessage = (state, action) => {
    return updateObject( state, {
        message: action.message
    })
}

// DEFINE REDUCER
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SOCKET_INIT: return socketInit(state, action)
        case actionTypes.TOGGLE_CHAT: return toggleChat(state, action)
        case actionTypes.GET_MESSAGES: return getMessages(state, action)
        case actionTypes.SAVE_MESSAGE: return saveMessage(state, action)
        default:
            return state
    }
}

export default reducer