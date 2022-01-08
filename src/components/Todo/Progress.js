import React from "react";
import { useState } from "react/cjs/react.development";
import TodoAddForm from "./TodoAddForm";
import TodoItem from "./TodoItem";
import { useListDrag } from "../../lib/custom/DragAndDrop";
import { useDispatch } from "react-redux";

const Progress = ({ todos }) => {
  const {
    onDragStart,
    onDragOver,
    onDragEnd,
    onDragLeave,
    onDragEnter,
    onDrop,
  } = useListDrag(todos);

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
            onDragEnd={onDragEnd}
          />
        ))}
      </ul>
    </div>
  );
};

export default Progress;
