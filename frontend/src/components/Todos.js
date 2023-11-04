import React, { useEffect, useState } from "react";
import instance from "../utils/axios";
import { Col, Row, Button, Card } from "react-bootstrap";
import AddTodo from "./AddTodo";
import EditTodo from "./EditTodo";
import { FaClock, FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { FiCheckSquare } from "react-icons/fi";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const getTodos = async () => {
    try {
      const response = await instance.get("todos");
      setTodos(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const handleEditTodo = (todo) => {
    setSelectedTodo(todo)
    setShowEditModal(true);
  };

  const deleteHandler = async (id) => {
    try {
      const confirmed = window.confirm("Are you sure?");
      if (confirmed) {
        await instance.delete(`todos/${id}`);
        getTodos();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const timeOptions = { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: 'numeric', hour12: true };
  const dateOptions = { timeZone: 'Asia/Kolkata', year: 'numeric', month: 'numeric', day: 'numeric'};

  return (
    <div className="todo-container">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="my-4">
          <FiCheckSquare /> PlanIt
        </h1>
        <Button
          variant="primary"
          onClick={() => setShowAddModal(true)}
          className="my-4"
        >
          <FaPlus /> Add Task
        </Button>
      </div>

      <Row>
        {todos && todos.length > 0 ? (
          todos.map((todo) => (
            <Col key={todo._id} sm={12} md={6} className="mb-4">
               <Card className="my-3 p-3 rounded todo-card">
      <Card.Body className="container">
        <div
          className={`status-badge ${
            todo.status === "completed" ? "completed" : "pending"
          }`}
        >
          {todo.status}
        </div>

        <Card.Title className="task-title">
          <strong>{todo.title}</strong>
        </Card.Title>

        <Card.Text className="task-description">{todo.description}</Card.Text>
        <div className="date-time">
          <FaClock size={18} className="mx-1 clock-icon" />
          {`${ new Date(todo.dateTime).toLocaleString('en-US', timeOptions)} - ${ new Date(todo.dateTime).toLocaleString('en-US', dateOptions)}`}
        </div>
        <div className="edit-delete">
          <FaEdit
            size={20}
            color="blue"
            className="icon"
            onClick={()=>handleEditTodo(todo)}
          />
          <FaTrash
            size={20}
            color="red"
            className="icon"
            onClick={()=>deleteHandler(todo._id)}
  
          />
        </div>
      </Card.Body>
    </Card>
            </Col>
          ))
        ) : (
          <div className="text-center my-4">
            <p>No todo(s) left</p>
          </div>
        )}
      </Row>

      {showAddModal && (
        <AddTodo
          closeModal={() => setShowAddModal(false)}
        />
      )}
      {showEditModal && (
        <EditTodo
          closeModal={() => setShowEditModal(false)}
          todo={selectedTodo}
          getUpdatedTodos={getTodos} 
        />
      )}
    </div>
  );
};

export default Todos;
