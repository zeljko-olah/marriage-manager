// REMINDER ROUTES

const express = require("express")
const router = express.Router()

const ReminderController = require('../controllers/reminders')

router.get("/index", ReminderController.getReminders)
router.post("/create", ReminderController.saveReminder)
router.delete("/delete", ReminderController.deleteReminder)

module.exports = router