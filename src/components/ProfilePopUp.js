import React, { useContext } from "react";
import UserContext from "../context/UserContext";

const ProfilePopUp = ({ setIsProfileActive }) => {
  const { user, handleLogout } = useContext(UserContext);

  const handle_LogoutEvent = () => {
    setIsProfileActive(false);
    handleLogout();
  };

  return (
    <div className="profile__popup">
      <header>
        <h3>Welcome, {user.displayName}!</h3>
      </header>
      <section className="profile__popup--btn">
        {/* <button className="btn-profile">View Profile</button> */}
        <button className="btn-logout" onClick={() => handle_LogoutEvent()}>
          Logout <img src="/images/logout.svg" alt="" />
        </button>
      </section>
    </div>
  );
};

export default ProfilePopUp;
