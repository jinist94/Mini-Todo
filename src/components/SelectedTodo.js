import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateTitle, updateDueDate } from "../modules/todo";

import SelectDueDate from "./SelectDueDate";
import DetailNote from "./DetailNote";
import { onUpdateDueDate } from "../lib/firebase/todosData";
import { dateForData } from "../lib/util/date";
import Steps from "./Steps";

const SelectedTodo = ({ selectedTodo, test }) => {
  const { todoData, type } = selectedTodo;
  const [titleValue, setTitleValue] = useState(todoData.title);

  const dispatch = useDispatch();

  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      if (event.target.value === "") {
        setTitleValue(todoData.title);
        return;
      }
      event.target.blur();
    }
  };
  const onTitleChange = (event) => {
    setTitleValue(event.target.value);
  };

  const onBlur = (event) => {
    if (event.target.value === "") {
      setTitleValue(todoData.title);
      return;
    }
    dispatch(updateTitle(todoData.id, titleValue, type));
  };

  const onSelectDueDate = (date) => {
    const convertedDate = dateForData(date);
    onUpdateDueDate(todoData.id, convertedDate, type);
    dispatch(updateDueDate(todoData.id, convertedDate, type));
  };

  useEffect(() => {
    setTitleValue(todoData.title);
  }, [todoData]);

  return (
    <div className="selected-todo">
      <div className="selected-todo__todo-box selected-todo__item">
        <h3 className="todo-box__name">
          <input
            value={titleValue}
            onChange={onTitleChange}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
          />
        </h3>
      </div>
      <div className="selected-todo__step-box selected-todo__item">
        <Steps steps={todoData.steps} todoId={todoData.id} type={type} />
      </div>
      <div className="selected-todo__due-date-box selected-todo__item">
        <SelectDueDate
          onSelectDueDate={onSelectDueDate}
          dueDate={todoData.dueDate}
        />
      </div>
      <div className="selected-todo__note selected-todo__item">
        <DetailNote todoId={todoData.id} note={todoData.note} />
      </div>
    </div>
  );
};

export default SelectedTodo;
