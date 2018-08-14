import { createSelector } from 'reselect'

export const allMessagesCount = (state) => {
  return state.chat.messages.length
}

export const selectUserName = (state) => state.auth.user.name
export const selectAllMessages = (state) => state.chat.messages

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