import React from "react";
import { Link } from "react-router-dom";

const Login = (props) => {
  const onSubmit = (event) => {
    console.log(event);
  };
  return (
    <div className="login">
      <h1>Login</h1>
      <form className="login-form" onSubmit={onSubmit}>
        <input name="email" type="email" plaseholder="email" required />
        <input
          name="password"
          type="password"
          plaseholder="password"
          required
        />
        <input type="submit" />
      </form>
      <button>
        <Link to="/join">Join</Link>
      </button>
    </div>
  );
};

export default Login;
