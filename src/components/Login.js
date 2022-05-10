import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const loginEmail = useRef();
  const loginPassword = useRef();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(false);
    setLoading(true);

    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail.current.value,
        loginPassword.current.value
      );
      console.log(user);
      navigate("/");
    } catch (error) {
      console.log(error.message);
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login">
        <h3>Login Here</h3>
        <form autoComplete="on" onSubmit={(e) => handleLogin(e)}>
          <input
            type="email"
            placeholder="Email"
            autoComplete="on"
            required
            ref={loginEmail}
          />
          <input
            type="password"
            placeholder="Password"
            autoComplete="on"
            required
            ref={loginPassword}
          />
          <input type="submit" value="Login" />
          <span>{error && "Invalid email or password"}</span>
          <span>{loading && "Login..."}</span>
        </form>
      </div>
    </div>
  );
};

export default Login;
