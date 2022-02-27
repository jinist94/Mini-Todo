import React from "react";
import "./css/Todo.scss";

import { useSelector } from "react-redux";

import TodoAddForm from "./TodoAddForm";
import TodoList from "./TodoList";
import SelectedTodo from "../SelectedTodo";

const Todos = (props) => {
  const { todos, finished, selectedTodo } = useSelector(
    (state) => state.todoReducer
  );

  return (
    <div className="todo-container">
      <div className="content">
        <TodoAddForm />
        <TodoList todos={todos} type="todos" />
        <div className="finished">
          <h3>완료된 할 일</h3>
          <TodoList todos={finished} type="finished" title="완료된 할 일" />
        </div>
      </div>
      {selectedTodo.todoData && (
        <div className="right-column">
          <SelectedTodo selectedTodo={selectedTodo} />
        </div>
      )}
    </div>
  );
};

export default Todos;
