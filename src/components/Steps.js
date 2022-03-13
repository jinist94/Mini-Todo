import React from "react";
import StepAddForm from "./Todo/StepAddForm";
import StepInput from "./StepInput";

import { onAddStep, onUpdateStep } from "../lib/firebase/todosData";
import { addStep, updateStep } from "../modules/todo";
import { useDispatch } from "react-redux";

const Steps = ({ steps, todoId, type }) => {
  const dispatch = useDispatch();

  const onSubmit = (inputValue) => {
    const stepId = Date.now();
    const newStep = { id: stepId, title: inputValue, check: false };
    onAddStep(todoId, newStep, type);
    dispatch(addStep(todoId, newStep, type));
  };

  const onChange = (event, index) => {
    const value = event.target.value;
    onUpdateStep(todoId, value, index, type);
    dispatch(updateStep(todoId, value, index, type));
  };
  console.log(steps, "steps");

  return (
    <>
      <div className="step-box__list">
        {steps && steps.map((step, index) => <StepInput key={step.id} step={step} index={index} onChange={onChange} todoId={todoId} />)}
      </div>
      <div className="selected-todo__add-step">
        <StepAddForm onSubmit={onSubmit} />
      </div>
    </>
  );
};

export default Steps;