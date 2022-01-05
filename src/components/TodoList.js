import React from "react";

const TodoList = ({ todo }) => {
  return (
    <li>
      <span>{todo.title}</span>
    </li>
  );
};

export default TodoList;
