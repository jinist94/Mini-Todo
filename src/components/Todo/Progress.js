import React from "react";
import TodoAddForm from "./TodoAddForm";
import TodoItem from "./TodoItem";

const Progress = ({ todos }) => {
  return (
    <div>
      <h2 className="title">오늘 할 일</h2>
      <TodoAddForm />
      <ul className="todo-list">
        {todos?.map((todo, index) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            todos={todos}
            index={index}
            type="todo"
          />
        ))}
      </ul>
    </div>
  );
};

export default Progress;
