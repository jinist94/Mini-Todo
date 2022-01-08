import React from "react";
import TodoItem from "./TodoItem";

import { useListDrag } from "../../lib/custom/DragAndDrop";

const Finished = ({ finished }) => {
  const {
    onDragStart,
    onDragOver,
    onDragEnd,
    onDragLeave,
    onDragEnter,
    onDrop,
  } = useListDrag(finished);
  return (
    <div className="finished">
      <h3>완료된 할 일</h3>
      <ul className="todo-list">
        {finished.map((todo, index) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            todos={finished}
            index={index}
            type="finished"
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

export default Finished;
