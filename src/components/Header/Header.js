import React from "react";
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

  return (
    <header>
      <div className="logo">Minitodo</div>
      <div className="search">
        <input type="search" />
      </div>
      <div className="right-menu">
        <div className="profile">
          {!currentUser ? (
            <>
              <Link to="/signup" className="signup-btn">
                Sign Up
              </Link>
              <Link to="/login" className="login-btn">
                Login
              </Link>
            </>
          ) : (
            <div onClick={onClickProfile}>
              <img src={profileImg} alt="profile" />
            </div>
          )}
        </div>
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
