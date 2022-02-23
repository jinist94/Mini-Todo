import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header = (props) => {
  const profileImg = "images/profile-img.jpg";
  return (
    <header>
      <div className="logo">Minitodo</div>
      <div className="search">
        <input type="search" />
      </div>
      <div className="right-menu">
        <div className="profile">
          <Link to="/join" className="join-btn">
            Join
          </Link>
          <img src={profileImg} alt="profile" />
        </div>
      </div>
    </header>
  );
};

export default Header;
