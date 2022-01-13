import React from "react";

const StepInput = ({ step, onChange, index }) => {
  return (
    <div className="input-wrap">
      <input
        value={step.title}
        onChange={(event) => {
          onChange(event, index);
        }}
      />
    </div>
  );
};

export default StepInput;
