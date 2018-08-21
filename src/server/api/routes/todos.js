const express = require("express")
const router = express.Router()

const TodoController = require('../controllers/todos')

router.get("/index", TodoController.getTodos)
router.post("/create", TodoController.saveTodo)
module.exports = router