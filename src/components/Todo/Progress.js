import React from "react";
import { useState } from "react/cjs/react.development";
import TodoAddForm from "./TodoAddForm";
import TodoItem from "./TodoItem";
import { updateTodo } from "../../modules/todo";
import { useDispatch } from "react-redux";

const Progress = ({ todos }) => {
  const dispatch = useDispatch();
  const [drag, setDrag] = useState(null);
  const [clickTodo, setClickTodo] = useState(null);
  let current = null;

  const onDragStart = (event) => {
    setDrag(event.target);
    event.target.style.opacity = "0.3";
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/html", event.target);
  };
  const onDragOver = (event) => {
    event.preventDefault();
    return false;
  };

  const onDragLeave = (event) => {
    if (event.currentTarget !== current) {
      event.currentTarget.classList.remove("bottom");
      event.currentTarget.classList.remove("top");
    }
  };

  const onDragEnter = (event) => {
    current = event.currentTarget;
    let dragIndex = Number(drag.dataset.index);
    let targetIndex = Number(event.currentTarget.dataset.index);
    if (dragIndex < targetIndex) {
      event.currentTarget.classList.add("bottom");
    } else {
      event.currentTarget.classList.add("top");
    }
  };

  const onDrop = (event) => {
    let dragIndex = Number(drag.dataset.index);
    let targetIndex = Number(event.currentTarget.dataset.index);
    let _lists = [...todos];
    let _listItem = _lists[dragIndex];
    if (dragIndex !== targetIndex) {
      _lists.splice(dragIndex, 1);
      _lists.splice(targetIndex, 0, _listItem);
      dispatch(updateTodo(_lists));
    }
    event.currentTarget.classList.remove("bottom");
    event.currentTarget.classList.remove("top");
  };

  const onDragEnd = (event) => {
    setDrag(null);
    event.target.style.opacity = "1";
  };
  const onClick = (event) => {
    if (clickTodo) {
      clickTodo.classList.remove("selected");
      event.currentTarget.classList.add("selected");
    } else {
      event.currentTarget.classList.add("selected");
    }
    setClickTodo(event.currentTarget);
  };
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
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={onClick}
            onDragEnd={onDragEnd}
          />
        ))}
      </ul>
    </div>
  );
};

export default Progress;
