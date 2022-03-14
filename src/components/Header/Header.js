import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Header.scss";
import ProfileModal from "./ProfileModal";

import { useModal } from "../../lib/custom/useModal";

const Header = (props) => {
  const { currentUser } = useSelector((state) => state.userReducer);
  const profileImg = currentUser?.photoURL || "images/profile-img.jpg";
  const displayName = currentUser?.displayName || "";
  const { modalState, handleShowModal, handleCloseModal, modalRef } = useModal();
  const onClickProfile = () => {
    handleShowModal();
  };
  useEffect(() => {
    handleCloseModal();
  }, [currentUser]);

  return (
    <header>
      <div className="header-logo">
        <Link to="/">Minitodo</Link>
      </div>
      <div className="header-search">
        <input type="search" />
      </div>
      <div className="header-menu">
        {!currentUser ? (
          <div className="header-menu__buttons">
            <Link to="/signup" className="signup-btn">
              SIGN UP
            </Link>
            <Link to="/login" className="login-btn">
              LOGIN
            </Link>
          </div>
        ) : (
          <div className="header-menu__profile">
            <div onClick={onClickProfile}>
              <img src={profileImg} alt="profile" />
            </div>
          </div>
        )}

        {currentUser && modalState && (
          <div ref={modalRef}>
            <ProfileModal displayName={displayName} profileImg={profileImg} handleCloseModal={handleCloseModal} />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
