import React from "react";

const CloseBtn = ({ onClick }) => {
  return (
    <i className="close-icon" onClick={onClick}>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 26.15 25.96"
      >
        <g>
          <polygon
            points="24.74,1.15 24.04,0.44 12.89,11.59 1.74,0.44 1.04,1.15 12.18,12.3 1.04,23.44 1.74,24.15 12.89,13 24.04,24.15 
	24.74,23.44 13.6,12.3 "
          />
        </g>
      </svg>
    </i>
  );
};

export default React.memo(CloseBtn);
