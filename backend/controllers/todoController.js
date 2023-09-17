
const Todo = require('../model/todoModel')

const getTodo = async(req,res)=>{
    try {
        const todos = await Todo.find()
        res.status(200).json(todos)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const addTodo = async (req,res) =>{
    try {
        const {title,date,time,description,status} = req.body;
        // console.log(req.body)
        const newTodo = await Todo.create({title,date,time,description,status})
        // console.log(newTodo)
       if(newTodo){
        res.status(201).json(newTodo)
       }else{
        res.status(404)
        throw new Error("Resource not found")
       }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updateTodo = async (req,res)=>{
    try {
        const todo = await Todo.findById(req.params.id)
        console.log(todo)
        if(todo){
            todo.title = req.body.title || todo.title;
            todo.date = req.body.date || todo.date;
            todo.time = req.body.time || todo.time;
            todo.description = req.body.description || todo.description;
            todo.status = req.body.status || todo.status;

            const updatedTodo = await todo.save()
            console.log(updatedTodo)

            res.status(201).json(updatedTodo)
        }else{
            res.status(404)
            throw new Error("Resource not found")
        }
    } catch (error) {
        console.log(error.message)
        
    }
}
const deleteTodo = async (req,res)=>{
    try {
        const todo = await Todo.findById(req.params.id);
        if(todo){
            await Todo.deleteOne({_id:todo._id})
            res.status(200).json({message:'todo deleted successfully'})
        }else{
            res.status(404)
            throw new Error("Resource not found")
        }
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {getTodo,addTodo,updateTodo,deleteTodo}