import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TaskForm from "./components/TaskForm";
import TaskCalendar from "./components/TaskCalendar";
import TaskList from "./components/TaskList";
import TaskListModal from "./components/TaskListModal";
import Notepad from "./components/Notepad";
// import MusicPlayer from "./components/MusicPlayer";
import WeatherDisplay from "./components/WeatherDisplay";
import "./App.css";

function App() {
  const [date, setDate] = useState(new Date());
  const [taskList, setTaskList] = useState([]);
  const [taskDetails, setTaskDetails] = useState({
    task: "",
    taskCompleted: false,
  });

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTaskDetails({ ...taskDetails, [name]: value });
  };

  function parseDate(rawTask, selectedDay) {
    const monthMatch = rawTask.match(/(\d+)월/);
    const dateMatch = rawTask.match(/(\d+)일/);
    const hourMatch = rawTask.match(/(\d+)시/);
    const minuteMatch = rawTask.match(/(\d+)분/);

    var tmpDate = new Date();
    const standardDate = new Date();
    // 기준 : 현재 날짜
    // 유효성 검사도 필요 -> 월 값만 들어오면 날짜를 확정할 수 없음.
    // 유효한 경우 -> 일, 시간, 분은 각각 들어와도 상관 없다.
    // 유효하지 않은 경우
    // 월&시간 -> 일은 존재 x
    // 일&분 -> 시간 존재 x
    // month -> minute를 비교하면서 tmpDate를 설정

    //유효성 검사
    if (monthMatch) {
      if (!dateMatch) {
        return selectedDay;
      }
    }

    if (dateMatch && !hourMatch && minuteMatch) {
      return selectedDay;
    }

    if (monthMatch) {
      if (tmpDate.getMonth() > monthMatch[1] - 1) {
        //입력한 달이 현재 달보다 작은 경우 -> 내년으로 설정
        tmpDate.setFullYear(tmpDate.getFullYear() + 1);
      }
      tmpDate.setMonth(monthMatch[1] - 1);
      tmpDate.setHours(0, 0, 0, 0); //뒤의 시간 초기화
    }

    if (dateMatch) {
      tmpDate.setHours(0, 0, 0, 0);
      tmpDate.setDate(dateMatch[1]);
      if (tmpDate < standardDate) {
        //설정한 날짜가 과거일 경우
        tmpDate.setMonth(tmpDate.getMonth() + 1);
      }
    }

    if (hourMatch) {
      tmpDate.setHours(hourMatch[1], 0, 0, 0);
      if (tmpDate < standardDate) {
        //설정한 날짜가 과거일 경우
        tmpDate.setDate(tmpDate.getDate() + 1);
      }
    }

    if (minuteMatch) {
      tmpDate.setMinutes(minuteMatch[1], 0, 0);
      if (tmpDate < standardDate) {
        //설정한 날짜가 과거일 경우
        tmpDate.setHour(tmpDate.getHour() + 1);
      }
    }

    return tmpDate;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const newTaskDate = parseDate(taskDetails.task, date);

    const regex = /\/\s*([^/ ]+)\s*(.*)/;
    const matches = taskDetails.task.match(regex);
    const category = matches ? matches[1].trim() : null;

    const newTask = {
      taskDate: newTaskDate.toISOString().slice(0, 10),
      taskToDo: taskDetails.task.trim(),
      taskCompleted: taskDetails.taskCompleted,
      taskCategory: category ? category.trim() : null,
      id: uuidv4(),
    };

    setTaskList([...taskList, newTask]);
    setTaskDetails({
      task: "",
      taskCompleted: false,
    });

    // fetch("http://localhost:3001/task", {
    //   method: "post",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify(newTask),
    // });
  };

  return (
    <div className="app">
      {/* <div className="player-container">
        <MusicPlayer />
      </div> */}
      <div className="weather-container">
        <WeatherDisplay />
      </div>

      <div className="content-container">
        <div className="paraphrase">
          <p>Time is Gold</p>
        </div>
        <div className="calendar-container">
          <TaskCalendar
            date={date}
            handleDateChange={handleDateChange}
            tasks={taskList}
          />
          <TaskForm
            taskDetails={taskDetails}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>

      <div className="notepad-container">
        <Notepad />
      </div>

      <div className="mt-4">
        <TaskListModal tasks={taskList} />
      </div>

      <div className="mt-4">
        <TaskList date={date} tasks={taskList} />
      </div>
    </div>
  );
}

export default App;
