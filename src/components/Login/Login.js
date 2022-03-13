import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Login.scss";
import { useHistory } from "react-router-dom";
import useInput from "../../lib/custom/useInput";
import { githubLoginInitiate, googleLoginInitiate, loginInitiate } from "../../modules/user";
import { GithubOutlined, GoogleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");

  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser, error } = useSelector((state) => state.userReducer);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginInitiate(email, password));
  };

  const handleGoogleLogin = () => {
    dispatch(googleLoginInitiate());
  };
  const handleGithubLogin = () => {
    dispatch(githubLoginInitiate());
  };

  useEffect(() => {
    console.log(currentUser, "[Login - currentUser]");
    if (currentUser) {
      history.push("/");
    }
  }, [currentUser]);

  return (
    <div className="login__wrapper">
      <div className="login__box">
        <h1>Welcome</h1>
        <form className="login-form" onSubmit={onSubmit}>
          <input type="email" name="email" placeHolder="Email" required onChange={onChangeEmail} />
          <input type="password" name="password" placeHolder="Password" required onChange={onChangePassword} />
          {error && <p className="login-form__error">{error.message}</p>}
          <button type="submit"> LOGIN</button>
        </form>
        <div className="join-area">
          <p>신규 사용자신가요?</p>
          <Link to="/join">회원가입</Link>
        </div>
        <div className="social-login">
          <p className="social-login__title">Or Login with</p>
          <div className="social-login__button-wrap">
            <button className="social-login__google" onClick={handleGoogleLogin}>
              <GoogleOutlined />
            </button>
            <button className="social-login__github" onClick={handleGithubLogin}>
              <GithubOutlined />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
