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
  const [finishedTodos, setFinishedTodos] = useState([]);

  const onAddTodo = (todo) => {
    setTodos([todo, ...todos]);
  };
  const onDelete = (id, type) => {
    if (type === "todo") {
      const update = todos.filter((todo) => todo.id !== id);
      setTodos(update);
    }
    if (type === "finished") {
      const update = finishedTodos.filter((todo) => todo.id !== id);
      setFinishedTodos(update);
    }
  };
  const onMoveTodo = (todo, type) => {
    if (type === "todo") {
      onDelete(todo.id, type);
      setFinishedTodos([todo, ...finishedTodos]);
    }
    if (type === "finished") {
      onDelete(todo.id, type);
      setTodos([todo, ...todos]);
    }
  };
  return (
    <div className="todo-container">
      <h2 className="title">오늘 할 일</h2>
      <TodoAddForm onAddTodo={onAddTodo} />
      <ul className="todo-list">
        {todos.map((todo) => (
          <TodoList
            key={todo.id}
            todo={todo}
            type="todo"
            onDelete={onDelete}
            onMoveTodo={onMoveTodo}
          />
        ))}
      </ul>
      <div className="finished">
        <h3>완료된 할 일</h3>
        <ul className="todo-list">
          {finishedTodos.map((todo) => (
            <TodoList
              key={todo.id}
              todo={todo}
              type="finished"
              onDelete={onDelete}
              onMoveTodo={onMoveTodo}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todos;
