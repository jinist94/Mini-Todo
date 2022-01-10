import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { dateToString } from "../../lib/util/date";
import {
  addTodo,
  deleteTodo,
  updateTodo,
  deleteFinished,
  addFinished,
  updateFinished,
  addSelectedTodo,
} from "../../modules/todo";

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
    dispatch(addSelectedTodo(todo, event.currentTarget));
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
        {type === "todo" ? (
          <i className="uncheck-icon" onClick={handleClickChekck}>
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 26.15 25.96"
              width="24"
              height="24"
            >
              <g>
                <path
                  d="M13.07,24.81c-6.52,0-11.83-5.31-11.83-11.83S6.55,1.15,13.07,1.15s11.83,5.31,11.83,11.83S19.6,24.81,13.07,24.81z
		 M13.07,2.15C7.1,2.15,2.24,7.01,2.24,12.98S7.1,23.81,13.07,23.81c5.97,0,10.83-4.86,10.83-10.83S19.05,2.15,13.07,2.15z"
                />
                <polygon points="11.21,16.43 7.51,12.39 8.25,11.72 11.3,15.05 18,9.54 18.64,10.31 	" />
              </g>
            </svg>
          </i>
        ) : (
          <i className="oncheck-icon" onClick={handleClickChekck}>
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 26.15 25.96"
              width="24"
              height="24"
            >
              <g>
                <path d="M13.07,24.81c-6.52,0-11.83-5.31-11.83-11.83S6.55,1.15,13.07,1.15s11.83,5.31,11.83,11.83S19.6,24.81,13.07,24.81z" />
                <polygon
                  fill="white"
                  points="11.21,16.43 7.51,12.39 8.25,11.72 11.3,15.05 18,9.54 18.64,10.31 	"
                />
              </g>
            </svg>
          </i>
        )}

        <div className="simple-info">
          <span className="todo-name">{todo.title}</span>
          {todo.dueDate && (
            <span className="due-date">{dateToString(todo.dueDate)} 까지</span>
          )}
        </div>
      </div>
      <i className="close-icon" onClick={handleDelete}>
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 26.15 25.96"
          width="15"
          height="15"
        >
          <g>
            <polygon
              points="24.74,1.15 24.04,0.44 12.89,11.59 1.74,0.44 1.04,1.15 12.18,12.3 1.04,23.44 1.74,24.15 12.89,13 24.04,24.15 
	24.74,23.44 13.6,12.3 "
            />
          </g>
        </svg>
      </i>
    </li>
  );
};

export default TodoItem;
