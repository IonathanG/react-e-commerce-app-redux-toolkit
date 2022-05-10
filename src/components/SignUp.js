import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase.config";

const SignUp = () => {
  const registerEmail = useRef();
  const registerPassword = useRef();
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setError(false);
    setLoading(true);

    try {
      auth
        .createUserWithEmailAndPassword(
          registerEmail.current.value,
          registerPassword.current.value
        )
        .then(async (userAuth) => {
          await userAuth.user.updateProfile({
            displayName,
          });
          console.log(userAuth);
          //window.location.reload();
          navigate("/");
        });
    } catch (error) {
      console.log(error.message);
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup">
        <h3>Sign Up</h3>
        <form autoComplete="on" onSubmit={(e) => handleRegister(e)}>
          <input
            type="text"
            placeholder="Name"
            autoComplete="on"
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            autoComplete="on"
            required
            ref={registerEmail}
          />
          <input
            type="password"
            placeholder="Password"
            autoComplete="on"
            required
            ref={registerPassword}
          />
          <input type="submit" value="Sign Up" />
          <span>{error && "An error has occured. Please try again."}</span>
          <span>{loading && "Please wait..."}</span>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
