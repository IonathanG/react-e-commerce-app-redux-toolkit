import React, { useRef, useState } from "react";
import { auth } from "../utils/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const loginEmail = useRef();
  const loginPassword = useRef();
  const [error, setError] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail.current.value,
        loginPassword.current.value
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
      setError(true);
    }
    console.log(loginEmail.current.value, loginPassword.current.value);
  };

  return (
    <div className="login-container">
      <div className="login">
        <h3>Login Here</h3>
        <form onSubmit={(e) => handleLogin(e)}>
          <input type="email" placeholder="Email" required ref={loginEmail} />
          <input
            type="password"
            placeholder="Password"
            required
            ref={loginPassword}
          />
          <input type="submit" value="Login" />
          <span>{error && "Invalid email or password"}</span>
        </form>
      </div>
    </div>
  );
};

export default Login;
