import React from "react";
import { ListGroup } from "react-bootstrap";

const TaskList = ({ date, tasks }) => {
  return (
    <div className="task-list">
      <h2>Task List</h2>
      <ListGroup>
        {tasks
          .filter((task) => task.taskDate === date.toISOString().slice(0, 10))
          .map((task) => (
            <ListGroup.Item key={task.id}>
              <div>Date: {task.taskDate}</div>
              <div>Task: {task.taskToDo}</div>
              <div>Completed: {task.taskCompleted ? "Yes" : "No"}</div>
              <div>Category: {task.taskCategory || "No Category"}</div>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  );
};

export default TaskList;
