const Todo = require("../model/todoModel");
const cron = require("node-cron");
const sendEmailReminder = require("../utils/reminder");


const getTodo = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addTodo = async (req, res) => {
  try {
    const { title, dateTime, description, status } = req.body;
   
    const newTodo = await Todo.create({ title, dateTime, description, status });

    if (newTodo) {
      res.status(201).json(newTodo);
    } else {
      res.status(404);
      throw new Error("Resource not found");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (todo) {
      todo.title = req.body.title || todo.title;
      todo.dateTime = req.body.dateTime || todo.dateTime;
      todo.description = req.body.description || todo.description;
      todo.status = req.body.status || todo.status;
      const updatedTodo = await todo.save();

      res.status(201).json(updatedTodo);
    } else {
      res.status(404);
      throw new Error("Resource not found");
    }
  } catch (error) {
    console.log(error.message);
  }
};
const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "todo deleted successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { getTodo, addTodo, updateTodo, deleteTodo };
