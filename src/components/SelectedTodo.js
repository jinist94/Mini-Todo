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

const SelectedTodo = ({ selectedTodo }) => {
  const { todoData, elementm, type } = selectedTodo;
  const [titleValue, setTitleValue] = useState(todoData.title);
  const [dueDate, setDueDate] = useState("");

  const dispatch = useDispatch();

  const onSubmit = (inputValue) => {
    const stepId = Date.now();
    const newStep = { id: stepId, title: inputValue };
    dispatch(addStep(todoData.id, newStep, type));
  };

  const onChange = (event, index) => {
    const value = event.target.value;
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

  const ChangeDueDate = (date) => {
    setDueDate(date);
    dispatch(updateDueDate(todoData.id, date, type));
  };

  useEffect(() => {
    setTitleValue(todoData.title);
    setDueDate(todoData.dueDate);
  }, [todoData]);

  return (
    <div className="selected-todo">
      <div className="todo-box">
        <h3 className="todo-name">
          <input
            value={titleValue}
            onChange={onTitleChange}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
          />
        </h3>
      </div>
      <div className="todo-step-box">
        <div className="step-list">
          {todoData?.steps.map((step, index) => (
            <StepInput
              key={step.id}
              step={step}
              index={index}
              onChange={onChange}
              todoId={todoData.id}
            />
          ))}
        </div>
        <div className="add-step">
          <StepAddForm onSubmit={onSubmit} />
        </div>
      </div>
      <div className="todo-due-date-box">
        <SelectDueDate ChangeDueDate={ChangeDueDate} dueDate={dueDate} />
      </div>
      <div className="todo-note">
        <DetailNote todoId={todoData.id} note={todoData.note} />
      </div>
    </div>
  );
};

export default SelectedTodo;
