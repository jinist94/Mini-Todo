import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Join = (props) => {
  const [errorMsg, setErrorMsg] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    try {
      const auth = getAuth();
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user, "Login");
    } catch (error) {
      console.log(error.code, "error code");
      console.log(error.message, "errorMessage");
      setErrorMsg(error.message);
    }
  };

  return (
    <div className="login">
      <h1>Join</h1>
      <form className="join-form" onSubmit={onSubmit}>
        <input name="email" type="email" plaseholder="email" required />
        <input
          name="password"
          type="password"
          plaseholder="password"
          required
        />
        <input type="submit" />
      </form>
      <p className="error-message">{errorMsg}</p>
    </div>
  );
};

export default Join;
