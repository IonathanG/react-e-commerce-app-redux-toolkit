import React, { useState } from "react";
import Login from "../components/Login";
import SignUp from "../components/SignUp";

const ConnectModal = () => {
  const [signUp, setSignUp] = useState(true);

  return (
    <div className="connect-modal">
      <div className="header-btn">
        <button
          className={signUp ? "btn-active" : ""}
          onClick={() => setSignUp(true)}
        >
          Sign-Up
        </button>
        <button
          className={!signUp ? "btn-active" : ""}
          onClick={() => setSignUp(false)}
        >
          Log-In
        </button>
      </div>
      {signUp ? <SignUp /> : <Login />}
    </div>
  );
};

export default ConnectModal;
<h2>Connect Mode</h2>;
