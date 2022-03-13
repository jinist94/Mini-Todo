import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useInput from "../../lib/custom/useInput";
import { githubLoginInitiate, googleLoginInitiate, loginInitiate } from "../../modules/user";

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
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <input type="email" name="email" required onChange={onChangeEmail} />
        <input type="password" name="password" required onChange={onChangePassword} />
        <input type="submit" />
      </form>
      <p className="error-message">{error?.message}</p>
      <div className="sns-login">
        <button onClick={handleGoogleLogin}>Google Login</button>
        <button onClick={handleGithubLogin}>Github Login</button>
      </div>
    </div>
  );
};

export default Login;
