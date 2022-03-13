import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../cardLayout.scss";
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
    <div className="card-layout__container">
      <div className="card-layout">
        <h1>Welcome</h1>
        <form className="card-layout__form" onSubmit={onSubmit}>
          <input type="email" name="email" placeHolder="Email" required onChange={onChangeEmail} />
          <input type="password" name="password" placeHolder="Password" required onChange={onChangePassword} />
          {error && <p className="card-layout__error">{error.message}</p>}
          <button type="submit"> LOGIN</button>
        </form>
        <div className="card-layout__instructions">
          <p>신규 사용자신가요?</p>
          <Link to="/signup">회원가입</Link>
        </div>
        <div className="social-buttons__container">
          <p className="social-buttons__instructions">Or Login with</p>
          <div className="social__buttons">
            <button className="social-button__google" onClick={handleGoogleLogin}>
              <GoogleOutlined />
            </button>
            <button className="social-button__github" onClick={handleGithubLogin}>
              <GithubOutlined />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
