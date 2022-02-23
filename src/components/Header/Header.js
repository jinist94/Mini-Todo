import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./Header.scss";
import { logoutInitiate } from "../../modules/user";

const Header = (props) => {
  const profileImg = "images/profile-img.jpg";
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logoutInitiate());
  };
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
          <Link to="/login" className="login-btn">
            Login
          </Link>
          <button onClick={onLogout}>Logout</button>
          <img src={profileImg} alt="profile" />
        </div>
      </div>
    </header>
  );
};

export default Header;
