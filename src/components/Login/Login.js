import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginInitiate } from "../../modules/user";

const Login = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const { email, password } = loginForm;

  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser, error } = useSelector((state) => state.userReducer);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginInitiate(email, password));
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
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
        <input type="email" name="email" required onChange={onChange} />
        <input type="password" name="password" required onChange={onChange} />
        <input type="submit" />
      </form>
      <p className="error-message">{error?.message}</p>
    </div>
  );
};

export default Login;
