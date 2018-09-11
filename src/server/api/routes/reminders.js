const express = require("express")
const router = express.Router()

const ReminderController = require('../controllers/reminders')

router.get("/index", ReminderController.getReminders)
router.post("/create", ReminderController.saveReminder)
module.exports = router