// EXPORT ALL ACTIONS FROM ONE FILE

// AUTH RELATED ACTIONS
export {
  auth,
  authCheckState,
  setErrors,
  logout
} from './auth'

// CHAT RELATED ACTIONS
export {
  getDefaultRoomUsers,
  socketInit,
  toggleChat,
  setUsers,
  getMessages,
  saveMessage,
  emailChatHistory,
  deleteChatHistory,
  setFlashMessage,
  markMessagesAsRead,
  removeImportantMessage
} from './chat'

// LOCATION RELATED ACTIONS
export {
  getUserCoords,
  setLocation,
  getLocations,
  clearLocations
} from './location'

// TODO RELATED ACTIONS
export {
  addTodo,
  getTodos,
  getTodosForDate,
  updateTodoStatus,
  deleteTodo,
  renewTodo,
  setCurrentDate,
  editTodoTitle,
  sortUserTodos,
  sortStatusTodos,
  sortPriorityTodos
} from './todo'

// REMINDER RELATED ACTIONS
export {
  addReminder,
  getReminders,
  deleteReminder
} from './reminder'

// LOADING RELATED ACTIONS
export {
  setLoading
} from './loading'