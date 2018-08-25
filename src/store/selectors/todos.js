import { createSelector } from 'reselect'
// import moment from 'moment'

export const selectUserName = (state) => state.auth.user.name
export const selectAllTodos = (state) => state.todo.todos

// export const selectAllTodosForToday = (state) => {
//   const todayTodos = state.todo.todos
//   return todayTodos
// }
// export const selectAllRoomUsers = (state) => state.chat.allRoomUsers.map(u => {
//   return {
//     id: u._id,
//     name: u.name,
//     avatar: u.avatar
//   }
// })

// export const selectUnreadCount = createSelector(
//   selectUserName, selectAllMessages, (userName, messages) => {
//     return messages.filter(m => m.unread === true && m.from !== userName).length
//   }
// )

// export const selectImportantCount = createSelector(
//   selectUserName, selectAllMessages, (userName, messages) => {
//     return messages.filter(m => m.important === true && m.from !== userName).length
//   }
// )