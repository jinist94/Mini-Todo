import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../modules/todo";
import Calendar from "../Calendar/Calendar";
import { dateToString } from "../../lib/util/date";

const TodoAddForm = () => {
  const [todoValue, setTodoValue] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [openCalendar, setOpenCalendar] = useState(false);
  const dispatch = useDispatch();
  const calendarRef = useRef();

  const onChange = (event) => {
    const { value } = event.target;
    setTodoValue(value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if (todoValue) {
      const newTodo = { id: Date.now(), title: todoValue, dueDate };
      setTodoValue("");
      setDueDate("");
      dispatch(addTodo(newTodo));
    }
  };
  const showCalendar = () => {
    setOpenCalendar(true);
  };
  const closeCalender = () => {
    setOpenCalendar(false);
  };

  const seleteDueDate = (date) => {
    setDueDate(date);
    closeCalender();
  };

  const handleClickOutside = ({ target }) => {
    if (openCalendar && !calendarRef.current?.contains(target)) {
      closeCalender();
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [openCalendar]);
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
        <button className="date" onClick={showCalendar}>
          기한 설정 {dueDate && <span>{dateToString(dueDate)}</span>}
        </button>
        {openCalendar && (
          <Calendar ref={calendarRef} seleteDueDate={seleteDueDate} />
        )}
      </div>
    </div>
  );
};

export default TodoAddForm;
