import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseBtn from "../Button/CloseBtn";
import CheckBtn from "../Button/CheckBtn";

import {
  addTodo,
  deleteTodo,
  updateTodo,
  deleteFinished,
  addFinished,
  updateFinished,
  addSelectedTodo,
} from "../../modules/todo";
import DueDateText from "./DueDateText";

const TodoItem = ({
  todo,
  type,
  index,
  onDragStart,
  onDragOver,
  onDragEnter,
  onDragLeave,
  onDrop,
  onClick,
  onDragEnd,
}) => {
  const selectedTodo = useSelector((state) => state.selectedTodo);
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (type === "todo") dispatch(deleteTodo(todo.id));
    if (type === "finished") dispatch(deleteFinished(todo.id));
  };
  const handleClickChekck = (event) => {
    event.stopPropagation();
    if (type === "todo") {
      dispatch(deleteTodo(todo.id));
      dispatch(addFinished(todo));
    }
    if (type === "finished") {
      dispatch(deleteFinished(todo.id));
      dispatch(addTodo(todo));
    }
  };

  const handleDragStart = (event) => {
    onDragStart(event);
  };
  const handleDragOver = (event) => {
    onDragOver(event);
  };
  const handleDragEnter = (event) => {
    onDragEnter(event);
  };
  const handleDragLeave = (event) => {
    onDragLeave(event);
  };
  const handleDrop = (event) => {
    const update = onDrop(event);

    if (type === "todo") {
      dispatch(updateTodo(update));
    }

    if (type === "finished") {
      dispatch(updateFinished(update));
    }
  };
  const handleDropEnd = (event) => {
    onDragEnd(event);
  };

  const selectTodo = (event) => {
    if (event.target.tagName === "svg") {
      return;
    }
    if (selectedTodo.element) {
      selectedTodo.element.classList.remove("selected");
      event.currentTarget.classList.add("selected");
    } else {
      event.currentTarget.classList.add("selected");
    }
    dispatch(addSelectedTodo(todo, event.currentTarget, index));
  };

  return (
    <li
      data-index={index}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onDragEnd={handleDropEnd}
      onMouseDown={selectTodo}
      draggable
    >
      <div className="left">
        <CheckBtn
          onClick={handleClickChekck}
          isCheck={type === "todo" ? false : true}
        />
        <div className="simple-info">
          <span className="todo-name">{todo.title}</span>
          {todo.dueDate && (
            // <span className="due-date">{dateConverder(todo.dueDate)}</span>
            <DueDateText dueDate={todo.dueDate} />
          )}
        </div>
      </div>

      <CloseBtn onClick={handleDelete} />
    </li>
  );
};

export default TodoItem;
