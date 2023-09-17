import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { FaEdit, FaTrash,FaClock } from 'react-icons/fa';
import EditTodo from "./EditTodo";
import instance from '../utils/axios';

const Todo = ({ todo }) => {
    const [showEditModal, setShowEditModal] = useState(false);
    
  
  const openEditModal = () => {
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };
  const deleteHandler = async() =>{
    try {
        window.confirm('Are you sure ?')
        await instance.delete(`todos/${todo._id}`)
    } catch (error) {
        console.log(error.message)
        
    }
  }
  return (
    <Card className='my-3 p-3 rounded todo-card'>
      <Card.Body className='container'>
        
          <div className={`status-badge ${
              todo.status === 'completed' ? 'completed': 'pending'
            }`}>
            {todo.status}
          </div>
        
        <Card.Title className="task-title">
          <strong>{todo.title}</strong>
        </Card.Title>

        <Card.Text className="task-description">
          {todo.description}
        </Card.Text>
        <div className="date-time">
          <FaClock size={18} className='mx-1 clock-icon'/>
          {
          `${todo.time} - ${todo.date} `
          }
        </div>
        <div className="edit-delete">
          <FaEdit size={20} color="blue" className='icon' onClick={openEditModal}/>
          <FaTrash size={20} color="red" className='icon' onClick={deleteHandler}/>
        </div>
      </Card.Body>
      {showEditModal && (
        <EditTodo closeModal={closeEditModal} todo={todo} />
      )}
    </Card>
  );
}

export default Todo;
