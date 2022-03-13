import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { useListDrag } from "../../lib/custom/DragAndDrop";

const TodoList = ({ todos, type, onClickItem }) => {
  const { onDragStart, onDragOver, onDragEnd, onDragLeave, onDrop } =
    useListDrag(todos);

  return (
    <ul className={`todo-list ${type}`}>
      {todos?.map((todo, index) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          index={index}
          type={type}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onDragEnd={onDragEnd}
          onClickItem={onClickItem}
        />
      ))}
    </ul>
  );
};

export default TodoList;
