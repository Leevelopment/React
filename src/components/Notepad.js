import React, { useState } from "react";
import { FaLock, FaUnlock, FaTasks } from "react-icons/fa";
import "./Notepad.css";

const Notepad = () => {
  const [content, setContent] = useState("");
  const [locked, setLocked] = useState(false);

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const toggleLock = () => {
    setLocked(!locked);
  };

  const exportToTask = () => {
    // Export logic goes here
  };

  return (
    <div className={"notepad"}>
      <div className={"buttonContainer"}>
        <div className={"button"} onClick={exportToTask} disabled={locked}>
          <FaTasks />
        </div>
        <div className={"button"} onClick={toggleLock}>
          {locked ? <FaUnlock /> : <FaLock />}
        </div>
      </div>
      <div className={"textareaContainer"}>
        <textarea
          rows={4}
          value={content}
          onChange={handleChange}
          disabled={locked}
          placeholder="Enter your notes..."
        />
      </div>
    </div>
  );
};

export default Notepad;
