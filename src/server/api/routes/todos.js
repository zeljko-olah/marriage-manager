// TODOS ROUTES

const express = require("express")
const router = express.Router()

const TodoController = require('../controllers/todos')

router.get("/index", TodoController.getTodos)
router.post("/create", TodoController.saveTodo)
router.patch("/completed", TodoController.updateTodoStatus)
router.patch("/renew", TodoController.renewTodo)
router.patch("/title", TodoController.editTodoTitle)
router.delete("/delete", TodoController.deleteTodo)

module.exports = router