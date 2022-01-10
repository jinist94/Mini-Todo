import React, { useState } from "react";
import "./css/Todo.scss";

import Progress from "./Progress";
import Finished from "./Finished";
import { useSelector } from "react-redux";

import SelectedTodo from "../SelectedTodo";
import Calendar from "../Calendar/Calendar";
import TodoAddForm from "./TodoAddForm";

const Todos = (props) => {
  const todoState = useSelector((state) => state);
  const { todos, finished, selectedTodo } = todoState;
  console.log(todos);

  return (
    <div className="todo-container">
      <div className="content">
        <TodoAddForm />
        <Progress todos={todos} />
        <Finished finished={finished} />
        {/* <Calendar /> */}
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
