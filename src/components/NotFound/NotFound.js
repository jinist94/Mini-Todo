import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.scss";

const NotFound = () => {
  return (
    <div className="error-page">
      <h1>404</h1>
      <p>페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.</p>
      <Link to="/">
        <span>홈으로 이동</span>
      </Link>
    </div>
  );
};

export default NotFound;
