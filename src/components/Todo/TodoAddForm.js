import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../modules/todo";

const TodoAddForm = () => {
  const [todoValue, setTodoValue] = useState("");
  const dispatch = useDispatch();

  const onChange = (event) => {
    const { value } = event.target;
    setTodoValue(value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if (todoValue) {
      const newTodo = { id: Date.now(), title: todoValue };
      setTodoValue("");
      dispatch(addTodo(newTodo));
    }
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
