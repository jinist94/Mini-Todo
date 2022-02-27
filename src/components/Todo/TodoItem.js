import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseBtn from "../Button/CloseBtn";
import CheckBtn from "../Button/CheckBtn";

import { addSelectedTodo } from "../../modules/todo";
import DueDateText from "./DueDateText";
import {
  onAddTodo,
  onRemoveTodo,
  onUpdateTodos,
  onAddFinished,
  onRemoveFinished,
  onUpdateFinished,
} from "../../lib/firebase/todosData";

const TodoItem = ({
  todo,
  type,
  index,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
  onDragEnd,
}) => {
  const { selectedTodo } = useSelector((state) => state.todoReducer);
  const dispatch = useDispatch();
  const handleDelete = useCallback(() => {
    if (type === "todos") {
      onRemoveTodo(todo.id);
    }
    if (type === "finished") onRemoveFinished(todo.id);
  }, []);

  const handleClickChekck = useCallback((event) => {
    event.stopPropagation();
    if (type === "todos") {
      onAddFinished(todo);
      onRemoveTodo(todo.id);
    }
    if (type === "finished") {
      onAddTodo(todo);
      onRemoveFinished(todo.id);
    }
  }, []);

  const handleDragStart = (event) => {
    onDragStart(event);
  };
  const handleDragOver = (event) => {
    onDragOver(event);
  };
  const handleDragLeave = (event) => {
    onDragLeave(event);
  };
  const handleDrop = (event) => {
    const update = onDrop(event);
    if (!update) {
      return;
    }

    if (type === "todos") {
      onUpdateTodos(update);
    }

    if (type === "finished") {
      onUpdateFinished(update);
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
    dispatch(addSelectedTodo(todo, event.currentTarget, type));
  };

  return (
    <li
      data-index={index}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onDragEnd={handleDropEnd}
      onMouseDown={selectTodo}
      draggable
    >
      <div className="left">
        <CheckBtn
          onClick={handleClickChekck}
          isCheck={type === "todos" ? false : true}
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
