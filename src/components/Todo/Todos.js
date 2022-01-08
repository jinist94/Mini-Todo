import React, { useState } from "react";
import "./css/Todo.scss";

import Progress from "./Progress";
import Finished from "./Finished";
import { useSelector } from "react-redux";

const Todos = (props) => {
  const todos = useSelector((state) => state);
  console.log(todos, "state");

  return (
    <div className="todo-container">
      <Progress todos={todos.todos} />
      <Finished finished={todos.finished} />
    </div>
  );
};

export default Todos;
