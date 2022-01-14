import React from "react";
import CheckBtn from "./Button/CheckBtn";
import CloseBtn from "./Button/CloseBtn";
import { deleteStep, updateStepCheck } from "../modules/todo";
import { useDispatch } from "react-redux";
import { useState } from "react/cjs/react.development";

const StepInput = ({ step, onChange, index, todoId }) => {
  const dispatch = useDispatch();

  const onClickCheck = (event) => {
    dispatch(updateStepCheck(todoId, index));
  };
  const onClickClose = () => {
    dispatch(deleteStep(todoId, step.id));
  };
  return (
    <div className="input-wrap">
      <CheckBtn onClick={onClickCheck} isCheck={step.check} />
      <input
        className={step.check ? "check" : ""}
        value={step.title}
        onChange={(event) => {
          onChange(event, index);
        }}
      />
      <CloseBtn onClick={onClickClose} />
    </div>
  );
};

export default StepInput;
