import React from "react";
import Calendar from "react-calendar";

function TaskCalendar({ date, handleDateChange, tasks }) {
  return (
    <div>
      <Calendar onChange={handleDateChange} value={date} />
      {/* <ul>
        {tasks
          .filter((task) => task.taskDate === date.toISOString().slice(0, 10))
          .map((task) => (
            <li key={task.id}>
              {task.taskToDo} - {task.taskCategory} -{" "}
              {task.taskCompleted ? "Completed" : "Not Completed"}
            </li>
          ))}
      </ul> */}
    </div>
  );
}

export default TaskCalendar;
