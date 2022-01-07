import React from "react";
import TodoItem from "./TodoItem";

const Finished = ({ finished }) => {
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
          />
        ))}
      </ul>
    </div>
  );
};

export default Finished;
