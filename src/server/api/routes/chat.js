

const express = require("express")
const router = express.Router()

const ChatController = require('../controllers/chat')

router.get("/messages", ChatController.get_messages)
router.post("/messages", ChatController.new_message)

console.log('iNSIDE CHAT ROUTE FILE')


module.exports = router
