import React from "react";
import Card from "react-bootstrap/Card";
import { FaEdit, FaTrash, FaClock } from "react-icons/fa";

import instance from "../utils/axios";

const Todo = ({ todo, editTodo, onDelete }) => {
  const deleteHandler = async () => {
    try {
      const confirmed = window.confirm("Are you sure?");
      if (confirmed) {
        await instance.delete(`todos/${todo._id}`);
        onDelete(todo._id);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const openEditModal = () => {
    editTodo(todo);
  };

  const timeOptions = { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: 'numeric', hour12: true };
  const dateOptions = { timeZone: 'Asia/Kolkata', year: 'numeric', month: 'numeric', day: 'numeric'};

  return (
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
            onClick={openEditModal}
          />
          <FaTrash
            size={20}
            color="red"
            className="icon"
            onClick={deleteHandler}
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default Todo;
