import React from "react";
import { useState } from "react/cjs/react.development";

const StepAddForm = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue == "") {
      return;
    }
    onSubmit(inputValue);
    setInputValue("");
  };
  const onChange = (event) => {
    setInputValue(event.target.value);
  };
  return (
    <form className="step-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={onChange}
        placeholder="세부 일정 추가"
      />
    </form>
  );
};

export default StepAddForm;
