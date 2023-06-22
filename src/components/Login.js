import React, { useEffect, useState } from "react";

import { login } from "../axios";
import useCatcoContext from "../CatcoContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { currentUser, setCurrentUser } = useCatcoContext();

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    if (currentUser) navigate("/");
  });

  async function handleSubmit(event) {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    if (!email || !password) {
      setErrorMessage("Both email and password are required.");
      return;
    }

    const user = await login(email, password);

    if (user.token) {
      localStorage.setItem("userToken", user.token);
      setCurrentUser(user);

      navigate("/");
    } else {
      setErrorMessage("Invalid username or password");
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">email</label>
          <input type="text" name="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
        </div>
        <button type="submit">Log In</button>
      </form>
      <div>{errorMessage}</div>
    </div>
  );
}

export default Login;
