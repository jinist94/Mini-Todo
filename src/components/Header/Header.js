import React from "react";
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
          <img src={profileImg} alt="profile" />
        </div>
      </div>
    </header>
  );
};

export default Header;
