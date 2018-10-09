// CHAT ROUTES

const express = require("express")
const router = express.Router()

const ChatController = require('../controllers/chat')

router.get("/allusers", ChatController.get_all_users)
router.get("/messages", ChatController.get_messages)
router.post("/messages", ChatController.new_message)
router.post("/save", ChatController.email_chat_history)
router.delete("/messages", ChatController.delete_chat_history)
router.put("/messages/unread", ChatController.mark_as_read)
router.put("/messages/important", ChatController.remove_important_message)

module.exports = router
