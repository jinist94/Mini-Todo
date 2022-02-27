import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addStep,
  updateTitle,
  updateStep,
  updateDueDate,
} from "../modules/todo";

import StepAddForm from "./Todo/StepAddForm";
import StepInput from "./StepInput";
import SelectDueDate from "./SelectDueDate";
import DetailNote from "./DetailNote";
import {
  onAddStep,
  onUpdateStep,
  onUpdateDueDate,
} from "../lib/firebase/todosData";
import { dateForData } from "../lib/util/date";

const SelectedTodo = ({ selectedTodo, test }) => {
  const { todoData, elementm, type } = selectedTodo;
  const [titleValue, setTitleValue] = useState(todoData.title);

  const dispatch = useDispatch();

  const onSubmit = (inputValue) => {
    const stepId = Date.now();
    const newStep = { id: stepId, title: inputValue, check: false };

    onAddStep(todoData.id, newStep, type);
    dispatch(addStep(todoData.id, newStep, type));
  };

  const onChange = (event, index) => {
    const value = event.target.value;
    onUpdateStep(todoData.id, value, index, type);
    dispatch(updateStep(todoData.id, value, index, type));
  };

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
        <div className="step-box__list">
          {todoData.steps &&
            todoData.steps.map((step, index) => (
              <StepInput
                key={step.id}
                step={step}
                index={index}
                onChange={onChange}
                todoId={todoData.id}
              />
            ))}
        </div>
        <div className="selected-todo__add-step">
          <StepAddForm onSubmit={onSubmit} />
        </div>
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
      <div>
        <p>{test?.dueDate}</p>
        <p>{test?.note}</p>
        <p></p>
      </div>
    </div>
  );
};

export default SelectedTodo;
