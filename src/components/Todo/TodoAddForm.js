import React, { useState } from "react";
import { dateForData } from "../../lib/util/date";
import SelectDueDate from "../SelectDueDate";
import { onAddTodo } from "../../lib/firebase/todosData";

const TodoAddForm = () => {
  const [todoValue, setTodoValue] = useState("");
  const [dueDate, setDueDate] = useState("");

  const onChange = (event) => {
    const { value } = event.target;
    setTodoValue(value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if (todoValue) {
      const newTodo = {
        id: Date.now(),
        title: todoValue,
        dueDate,
        steps: "",
        note: "",
      };
      setTodoValue("");
      setDueDate("");

      onAddTodo(newTodo);
    }
  };

  const onSelectDueDate = (date) => {
    const convertedDate = dateForData(date);
    setDueDate(convertedDate);
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
      <div className="add-todo__due-date">
        <SelectDueDate dueDate={dueDate} onSelectDueDate={onSelectDueDate} />
      </div>
    </div>
  );
};

export default TodoAddForm;
