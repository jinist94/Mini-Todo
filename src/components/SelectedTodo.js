import React from "react";
import StepAddForm from "./Todo/StepAddForm";
import { addTodoStep } from "../modules/todo";
import { useDispatch } from "react-redux";
import { updateTodoStep } from "../modules/todo";
import StepInput from "./StepInput";

const SelectedTodo = ({ selectedTodo }) => {
  const { todoData, element } = selectedTodo;

  const dispatch = useDispatch();
  const onSubmit = (inputValue) => {
    const stepId = Date.now();
    const newStep = { id: stepId, title: inputValue };
    dispatch(addTodoStep(todoData.id, newStep));
  };

  const onChange = (event, index) => {
    const value = event.target.value;
    dispatch(updateTodoStep(todoData.id, value, index));
  };

  return (
    <div className="selected-todo">
      <div className="todo-box">
        <h3 className="todo-name">{todoData?.title}</h3>
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
    </div>
  );
};

export default SelectedTodo;
