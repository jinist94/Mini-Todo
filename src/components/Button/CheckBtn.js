import React from "react";

const CheckBtn = ({ onClick, isCheck }) => {
  if (isCheck) {
    return (
      <i className="oncheck-icon" onClick={onClick}>
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 26.15 25.96"
        >
          <g>
            <path d="M13.07,24.81c-6.52,0-11.83-5.31-11.83-11.83S6.55,1.15,13.07,1.15s11.83,5.31,11.83,11.83S19.6,24.81,13.07,24.81z" />
            <polygon
              fill="white"
              points="11.21,16.43 7.51,12.39 8.25,11.72 11.3,15.05 18,9.54 18.64,10.31 	"
            />
          </g>
        </svg>
      </i>
    );
  } else {
    return (
      <i className="uncheck-icon" onClick={onClick}>
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 26.15 25.96"
        >
          <g>
            <path
              d="M13.07,24.81c-6.52,0-11.83-5.31-11.83-11.83S6.55,1.15,13.07,1.15s11.83,5.31,11.83,11.83S19.6,24.81,13.07,24.81z
           M13.07,2.15C7.1,2.15,2.24,7.01,2.24,12.98S7.1,23.81,13.07,23.81c5.97,0,10.83-4.86,10.83-10.83S19.05,2.15,13.07,2.15z"
            />
            <polygon points="11.21,16.43 7.51,12.39 8.25,11.72 11.3,15.05 18,9.54 18.64,10.31 	" />
          </g>
        </svg>
      </i>
    );
  }
};

export default CheckBtn;
