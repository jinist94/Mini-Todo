import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { registerInitiate } from "../../modules/user";
import "../cardLayout.scss";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const Signup = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [signupForm, setSignupForm] = useState({
    displayName: "",
    email: "",
    password: "",
  });
  const { displayName, email, password } = signupForm;
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const { currentUser, error } = useSelector((state) => state.userReducer);

  useEffect(() => {
    console.log(currentUser, "[Signup - currentUser]");
    if (currentUser) {
      history.push("/");
    }
  }, [currentUser]);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (password !== passwordConfirm) {
      alert("password가 일치하지 않습니다.");
      return;
    }
    dispatch(registerInitiate(email, password, displayName));
  };

  const onChangePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
    setPasswordError(e.target.value !== password);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setSignupForm({ ...signupForm, [name]: value });
  };
  return (
    <div className="card-layout__container signup">
      <div className="card-layout">
        <h1>회원 가입</h1>
        <div className="card-layout__instructions">
          <p>이미 계정이 있으신가요?</p>
          <Link to="/login">로그인</Link>
        </div>
        <form className="card-layout__form" onSubmit={onSubmit}>
          <input name="displayName" type="displayName" placeHolder="Name" value={displayName} required onChange={onChange} />
          <input name="email" type="email" placeHolder="Email" value={email} required onChange={onChange} />
          <input name="password" type="password" placeHolder="Password" value={password} required onChange={onChange} />
          <input name="passwordConfirm" type="password" placeHolder="Password" value={passwordConfirm} required onChange={onChangePasswordConfirm} />
          {passwordError && (
            <p className="card-layout__error">
              <ExclamationCircleOutlined />
              <span>비밀번호가 일치하지 않습니다.</span>
            </p>
          )}
          {error && (
            <p className="card-layout__error">
              <ExclamationCircleOutlined />
              <span>{error.message}</span>
            </p>
          )}
          <button type="submit">회원 가입</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
