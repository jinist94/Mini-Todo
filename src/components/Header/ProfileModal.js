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
      <div className="profile-modal__container">
        <div className="profile-modal__image">
          <img src={profileImg} alt="profile" />
        </div>
        <p className="profile-modal__name">{displayName}</p>
        <button className="profile-modal__button-edit">프로필 수정</button>
        <button className="profile-modal__button-logout" onClick={onLogout}>
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default ProfileModal;
