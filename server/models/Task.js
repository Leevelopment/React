const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  taskDate: {
    type: Date,
    required: true,
  },
  taskToDo: {
    type: String,
    required: true,
    trim: true,
  },
  taskCompleted: {
    type: Boolean,
    required: true,
  },
  taskCategory: {
    type: String,
    trim: true,
    default: null,
  },
  id: {
    type: String,
    required: true,
  },
});
