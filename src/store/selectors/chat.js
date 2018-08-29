import { createSelector } from 'reselect'

export const allMessagesCount = (state) => {
  return state.chat.messages.length
}

export const selectUserName = (state) => state.auth.user.name
export const selectAllMessages = (state) => state.chat.messages
export const selectAllRoomUsernames = (state) => state.chat.allRoomUsers.map(u => u.name)
export const selectAllRoomUsers = (state) => {
  const {allRoomUsers} = state.chat
  if (allRoomUsers) {
    return allRoomUsers.map(u => {
      return {
        id: u._id,
        name: u.name,
        avatar: u.avatar
      }
    })
  }
  return []
}

export const selectUnreadCount = createSelector(
  selectUserName, selectAllMessages, (userName, messages) => {
    return messages.filter(m => m.unread === true && m.from !== userName).length
  }
)

export const selectImportantCount = createSelector(
  selectUserName, selectAllMessages, (userName, messages) => {
    return messages.filter(m => m.important === true && m.from !== userName).length
  }
)