import React, { useState } from "react";
import "./css/Todo.scss";

import Progress from "./Progress";
import Finished from "./Finished";
import { useDispatch, useSelector } from "react-redux";

import { addSelectedTodo } from "../../modules/todo";
import SelectedTodo from "../SelectedTodo";
import Calendar from "../Calendar/Calendar";

const Todos = (props) => {
  const todoState = useSelector((state) => state);
  const { todos, finished, selectedTodo } = todoState;

  return (
    <div className="todo-container">
      <div className="content">
        <Progress todos={todos} />
        <Finished finished={finished} />
        <Calendar />
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
