import { createSelector } from 'reselect'
import moment from 'moment'

export const allMessagesCount = (state) => {
  return state.chat.messages.length
}

export const selectUser = (state) => state.auth.user
export const selectUserName = (state) => state.auth.user.name

export const selectAllMessages = (state) => state.chat.messages
export const selectAllRoomUserNames = (state) => state.chat.allRoomUsers.map(u => u.name)
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

export const selectPartner = createSelector(
  selectUser, selectAllRoomUsers, (user, roomUsers) => roomUsers.find(u => u.name !== user.name)
)

export const selectPartnerLastMessage = createSelector(
  selectPartner, selectAllMessages, (partner, allMessages) => {
    if (partner) {
      return allMessages
      .filter(m => m.from === partner.name )
      .sort((a,b) => {
        return moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf()
      })[0]  
    } else {
      return 'Something went wrong'
    }
  }
)

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