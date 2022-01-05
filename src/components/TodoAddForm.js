import React, { useState } from "react";

const TodoAddForm = ({ onAddTodo }) => {
  const [todoValue, setTodoValue] = useState("");

  const onChange = (event) => {
    const { value } = event.target;
    setTodoValue(value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    const newTodo = { id: Date.now(), title: todoValue };
    onAddTodo(newTodo);
    setTodoValue("");
  };
  return (
    <form className="todo-form" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="할 일 추가"
        value={todoValue}
        onChange={onChange}
      />
      <button onClick={onSubmit}>추가</button>
    </form>
  );
};

export default TodoAddForm;
