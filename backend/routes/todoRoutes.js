const express = require('express')
const { getTodo, addTodo, updateTodo, deleteTodo } = require('../controllers/todoController')
const router = express.Router()

router.route('/todos').get(getTodo).post(addTodo) ;
router.route('/todos/:id').put(updateTodo).delete(deleteTodo)

module.exports = router