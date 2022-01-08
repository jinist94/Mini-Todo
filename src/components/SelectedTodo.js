import React from "react";

const SelectedTodo = ({ selectedTodo }) => {
  return (
    <div className="selected-todo">
      <div className="todo-box">
        <h3 className="todo-name">{selectedTodo.todoData.title}</h3>
      </div>
    </div>
  );
};

export default SelectedTodo;
