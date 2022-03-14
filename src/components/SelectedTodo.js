import React from "react";
import { useDispatch } from "react-redux";
import { updateDueDate } from "../modules/todo";
import { onUpdateDueDate } from "../lib/firebase/todosData";
import { dateForData } from "../lib/util/date";

import TitleEditForm from "./Todo/TitleEditForm";
import Steps from "./Steps";
import SelectDueDate from "./SelectDueDate";
import DetailNote from "./DetailNote";

const SelectedTodo = ({ selectedTodo }) => {
  const { todoData, type } = selectedTodo;

  const dispatch = useDispatch();

  const onSelectDueDate = (date) => {
    const convertedDate = dateForData(date);
    onUpdateDueDate(todoData.id, convertedDate, type);
    dispatch(updateDueDate(todoData.id, convertedDate, type));
  };

  return (
    <div className="selected-todo">
      <div className="selected-todo__todo-box selected-todo__item">
        <h3 className="todo-box__name">
          <TitleEditForm title={todoData.title} type={type} todoId={todoData.id} />
        </h3>
      </div>
      <div className="selected-todo__step-box selected-todo__item">
        <Steps steps={todoData.steps} todoId={todoData.id} type={type} />
      </div>
      <div className="selected-todo__due-date-box selected-todo__item">
        <SelectDueDate onSelectDueDate={onSelectDueDate} dueDate={todoData.dueDate} type={type} />
      </div>
      <div className="selected-todo__note selected-todo__item">
        <DetailNote todoId={todoData.id} note={todoData.note} type={type} />
      </div>
    </div>
  );
};

export default SelectedTodo;
