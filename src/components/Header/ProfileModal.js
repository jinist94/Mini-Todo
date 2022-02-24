import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutInitiate } from "../../modules/user";

const ProfileModal = ({ displayName, profileImg, handleCloseModal }) => {
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logoutInitiate());
  };
  useEffect(() => {
    window.addEventListener("mousedown", handleCloseModal);
    return () => {
      window.removeEventListener("mousedown", handleCloseModal);
    };
  }, []);

  return (
    <div className="profile-modal">
      <div className="profile-wrapper">
        <img className="profile-img" src={profileImg} alt="profile" />
        <p className="profile-name">{displayName}</p>
        <button className="profile-edit">프로필 수정</button>
      </div>
      <div className="profile-logout">
        <span onClick={onLogout}>로그아웃</span>
      </div>
    </div>
  );
};

export default ProfileModal;
