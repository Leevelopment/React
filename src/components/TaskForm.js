import React from "react";
import { FaPaperPlane } from "react-icons/fa";
import "./TaskForm.css";

function TaskForm({ taskDetails, handleInputChange, handleSubmit }) {
  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="input-container">
        <input
          type="text"
          name="task"
          value={taskDetails.task}
          onChange={handleInputChange}
          placeholder="Enter task in format: '7일 15시 /학교 교수님 면담'"
          required
        />
        <button type="submit" className="submit-button">
          <FaPaperPlane className="submit-icon" />
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
