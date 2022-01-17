import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../modules/todo";
import SelectDueDate from "../SelectDueDate";

const TodoAddForm = () => {
  const [todoValue, setTodoValue] = useState("");
  const [dueDate, setDueDate] = useState("");
  const dispatch = useDispatch();

  const onChange = (event) => {
    const { value } = event.target;
    setTodoValue(value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if (todoValue) {
      const newTodo = { id: Date.now(), title: todoValue, dueDate, steps: [] };
      setTodoValue("");
      setDueDate("");
      dispatch(addTodo(newTodo));
    }
  };

  const updateDueDate = (date) => {
    setDueDate(date);
  };

  return (
    <div className="add-todo">
      <form className="todo-form" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="할 일 추가"
          value={todoValue}
          onChange={onChange}
        />
        <button onClick={onSubmit}>추가</button>
      </form>
      <div className="due-date">
        <SelectDueDate dueDate={dueDate} updateDueDate={updateDueDate} />
      </div>
    </div>
  );
};

export default TodoAddForm;
