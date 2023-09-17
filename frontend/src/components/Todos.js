import React, { useEffect, useState } from "react";
import instance from "../utils/axios";
import { Col, Row, Button } from "react-bootstrap";
import AddTodo from "./AddTodo";
import { FaPlus } from "react-icons/fa";
import {FiCheckSquare} from "react-icons/fi"
import Todo from "./Todo";

const Todos = () => {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const response = await instance.get("todos");
      setTodos(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="todo-container">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="my-4"><FiCheckSquare/> PlanIt</h1>
        <Button
          variant="primary"
          onClick={handleShowModal}
          className="my-4"
        >
          <FaPlus /> Add Task
        </Button>
      </div>

      <Row>
        {todos && todos.length > 0 ? (
          todos.map((todo) => (
            <Col key={todo._id} sm={12} md={6} className="mb-4">
              <Todo todo={todo} />
            </Col>
          ))
        ) : (
          <div className="text-center my-4">
            <p>No todo(s) left</p>
          </div>
        )}
      </Row>

      {showModal && <AddTodo closeModal={handleCloseModal} />}
    </div>
  );
};

export default Todos;
