import React, { useState } from "react";
import Modal from "react-modal";
import { ListGroup } from "react-bootstrap";

function TaskListModal({ tasks }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const sortedTasks = tasks.sort(
    (a, b) => new Date(a.taskDate) - new Date(b.taskDate)
  );

  return (
    <div>
      <button onClick={openModal}>Show Tasks</button>
      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        <h2>Sorted Tasks</h2>
        <ListGroup>
          {sortedTasks.map((task, index) => (
            <ListGroup.Item key={index}>{task.taskToDo}</ListGroup.Item>
          ))}
        </ListGroup>
      </Modal>
    </div>
  );
}

export default TaskListModal;
