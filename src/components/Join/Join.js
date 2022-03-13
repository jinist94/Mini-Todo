import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { registerInitiate } from "../../modules/user";

const Join = (props) => {
  const [joinForm, setJoinForm] = useState({
    displayName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const { displayName, email, password, passwordConfirm } = joinForm;
  const { currentUser, error } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    console.log(currentUser, "[Join - currentUser]");
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

  const onChange = (e) => {
    const { name, value } = e.target;
    setJoinForm({ ...joinForm, [name]: value });
  };
  return (
    <div className="join">
      <h1>Join</h1>
      <form className="join-form" onSubmit={onSubmit}>
        <input
          name="displayName"
          type="displayName"
          plaseholder="Name"
          value={displayName}
          required
          onChange={onChange}
        />
        <input
          name="email"
          type="email"
          plaseholder="Email"
          value={email}
          required
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          plaseholder="Password"
          value={password}
          required
          onChange={onChange}
        />
        <input
          name="passwordConfirm"
          type="password"
          plaseholder="Password"
          value={passwordConfirm}
          required
          onChange={onChange}
        />
        <input type="submit" />
      </form>
      <p className="error-message">{error.message}</p>
    </div>
  );
};

export default Join;
