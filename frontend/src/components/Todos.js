import React, { useEffect, useState } from "react";
import instance from "../utils/axios";
import { Col, Row, Button } from "react-bootstrap";
import AddTodo from "./AddTodo";
import EditTodo from "./EditTodo";
import { FaPlus } from "react-icons/fa";
import { FiCheckSquare } from "react-icons/fi";
import Todo from "./Todo";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const getTodos = async () => {
    try {
      const response = await instance.get("todos");
      setTodos(response.data);
      // console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const addNewTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };
  const handleEditTodo = (todo) => {
    setSelectedTodo(todo);
    setShowEditModal(true);
  };
  const updateTodo = (updatedTodo) => {
    const updatedTodos = todos.map((todo) =>
      todo._id === updatedTodo._id ? updatedTodo : todo
    );
    setTodos(updatedTodos);
  };
  const deleteTodo = (todoId) => {
    const updatedTodos = todos.filter((todo) => todo._id !== todoId);
    setTodos(updatedTodos);
  };

  return (
    <div className="todo-container">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="my-4">
          <FiCheckSquare /> PlanIt
        </h1>
        <Button variant="primary" onClick={() => setShowAddModal(true)} className="my-4">
          <FaPlus /> Add Task
        </Button>
      </div>

      <Row>
        {todos && todos.length > 0 ? (
          todos.map((todo) => (
            <Col key={todo._id} sm={12} md={6} className="mb-4">
              <Todo
                todo={todo}
                editTodo={handleEditTodo}
                onDelete={deleteTodo}
              />
            </Col>
          ))
        ) : (
          <div className="text-center my-4">
            <p>No todo(s) left</p>
          </div>
        )}
      </Row>

      {showAddModal && (
        <AddTodo closeModal={() => setShowAddModal(false)} 
        addNewTodo={addNewTodo} />
      )}
      {showEditModal && (
        <EditTodo
          closeModal={() => setShowEditModal(false)}
          todo={selectedTodo}
          updateTodo={updateTodo} 
        />
      )}
    </div>
  );
};

export default Todos;
