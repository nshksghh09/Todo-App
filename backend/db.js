const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://anushkasingh09:kGtxW623RtVAD9KP@cluster0.qjuweye.mongodb.net/todo-app-data"
);

const todoSchema = mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

const todo = mongoose.model("todos", todoSchema);

module.exports = {
  todo,
};
