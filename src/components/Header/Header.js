import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Header.scss";
import { logoutInitiate } from "../../modules/user";
import ProfileModal from "./ProfileModal";
import { useState } from "react/cjs/react.development";

const Header = (props) => {
  const { currentUser } = useSelector((state) => state.userReducer);
  const profileImg = currentUser?.photoURL || "images/profile-img.jpg";
  const displayName = currentUser?.displayName || "";
  const [profileModal, setProfileModal] = useState(false);
  const onClickProfile = () => {
    setProfileModal(!profileModal);
  };
  const modalRef = useRef();

  const handleCloseModal = (e) => {
    if (profileModal && !modalRef.current.contains(e.target)) {
      setProfileModal(false);
    }
  };
  useEffect(() => {
    window.addEventListener("mousedown", handleCloseModal);
    return () => {
      window.removeEventListener("mousedown", handleCloseModal);
    };
  }, [profileModal]);

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
              <Link to="/join" className="join-btn">
                Join
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
        {profileModal && (
          <div ref={modalRef}>
            <ProfileModal displayName={displayName} profileImg={profileImg} />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
