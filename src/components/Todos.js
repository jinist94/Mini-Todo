import React, { useState } from "react";
import TodoAddForm from "./TodoAddForm";
import TodoList from "./TodoList";
import "../css/Todo.css";

const Todos = (props) => {
  const initialTodos = [
    { id: 1, title: "밥먹기" },
    { id: 2, title: "청소하기" },
  ];
  const [todos, setTodos] = useState(initialTodos);

  const onAddTodo = (todo) => {
    setTodos([todo, ...todos]);
  };
  return (
    <div className="todo-container">
      <h2 className="title">오늘 할 일</h2>
      <TodoAddForm onAddTodo={onAddTodo} />
      <ul className="todo-list">
        {todos.map((todo) => (
          <TodoList key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
};

export default Todos;
