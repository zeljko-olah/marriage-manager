

const express = require("express")
const router = express.Router()

const ChatController = require('../controllers/chat')

router.get("/messages", ChatController.get_messages)
router.post("/messages", ChatController.new_message)
router.post("/save", ChatController.email_chat_history)
router.delete("/messages", ChatController.delete_chat_history)

module.exports = router
