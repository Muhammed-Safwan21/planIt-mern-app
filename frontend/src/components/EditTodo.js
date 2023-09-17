import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import instance from "../utils/axios";

function EditTodo({ closeModal,todo }) {
  const [taskTitle, setTaskTitle] = useState(todo.title);
  const [date, setDate] =useState(todo.date);

  console.log(date)

  const [time, setTime] = useState(todo.time);

  console.log(time)

  const [description, setDescription] = useState(todo.description);
  const [status, setStatus] = useState(todo.status);

  useEffect(() => {
    setTaskTitle(todo.title);
    setDate(todo.date);
    setTime(todo.time);
    setDescription(todo.description);
    setStatus(todo.status);
  }, [todo]);

  const handleTaskTitleChange = (e) => {
    setTaskTitle(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await instance.put(`todos/${todo._id}`, {
        title: taskTitle,
        date,
        time, // You can modify this according to your backend structure
        description,
        status
      });
      closeModal();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Modal show={true} onHide={closeModal}>
      <Modal.Header>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="taskTitle" className="form-label">
              Task
            </label>
            <input
              type="text"
              className="form-control"
              id="taskTitle"
              value={taskTitle}
              onChange={handleTaskTitleChange}
              required
            />
          </div>
          <div className="mb-3 row">
            <div className="col">
              <label htmlFor="date" className="form-label">
                Date
              </label>
              <input
                type="date"
                className="form-control"
                id="date"
                value={date}
                onChange={handleDateChange}
                required
              />
            </div>
            <div className="col">
              <label htmlFor="time" className="form-label">
                Time
              </label>
              <input
                type="time"
                className="form-control"
                id="time"
                value={time}
                onChange={handleTimeChange}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description(optional)
            </label>
            <textarea
              className="form-control"
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              rows="2"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <select
              className="form-select"
              id="status"
              value={status}
              onChange={handleStatusChange}
              required
            >
              <option value="todo">To-Do</option>
              <option value="inprogress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">
              Edit Task
            </button>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default EditTodo;
