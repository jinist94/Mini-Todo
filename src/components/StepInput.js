import React, { useCallback, useState } from "react";
import CheckBtn from "./Button/CheckBtn";
import CloseBtn from "./Button/CloseBtn";
import { deleteStep, updateStepCheck, updateStep } from "../modules/todo";
import { useDispatch } from "react-redux";
import { onRemoveStep, onUpdateStep, onCheckStep } from "../lib/firebase/todosData";
import { useDebounce } from "../lib/custom/useDebounce";

const StepInput = ({ step, index, todoId, type }) => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState(step.title);
  const [isCheck, setIsCheck] = useState(step.check);
  const debounce = useDebounce();

  const onChange = (event) => {
    setInputValue(event.target.value);
    // onUpdateStep(todoId, event.target.value, index, type);
    // dispatch(updateStep(todoId, value, index, type));

    debounce(onUpdateStep, [todoId, event.target.value, index, type]);
  };

  const onClickCheck = useCallback((event) => {
    // dispatch(updateStepCheck(todoId, index));
    setIsCheck((prev) => !prev);
    onCheckStep(todoId, index, type);
  }, []);

  const onClickClose = useCallback(() => {
    dispatch(deleteStep(todoId, step.id, type));
    onRemoveStep(todoId, step.id, type);
  }, []);

  return (
    <div className="input-wrap">
      <CheckBtn onClick={onClickCheck} isCheck={isCheck} />
      <input className={step.check ? "check" : ""} value={inputValue} onChange={onChange} />
      <CloseBtn onClick={onClickClose} />
    </div>
  );
};

export default StepInput;
