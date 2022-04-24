import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../context/UserContext";

const Nav = () => {
  const { user, handleLogout } = useContext(UserContext);

  return (
    <div className="nav">
      <div className="nav__container--left">
        <NavLink to="/">
          <div className="logo">
            <img src="/images/logo.svg" alt="" />
          </div>
        </NavLink>
        <ul className="list-links">
          <NavLink to="/collections">
            <li>Collections</li>
          </NavLink>
          <NavLink to="/men">
            <li>Men</li>
          </NavLink>
          <NavLink to="/women">
            <li>Women</li>
          </NavLink>
          <NavLink to="/about">
            <li>About</li>
          </NavLink>
          <NavLink to="/contact">
            <li>Contact</li>
          </NavLink>
        </ul>
      </div>
      <div className="nav__container--right">
        <img className="icon-cart" src="/images/icon-cart.svg" alt="" />

        {user ? (
          <div className="profil">
            <img
              className="icon-profil"
              src="/images/image-avatar.png"
              alt=""
            />
            <img
              onClick={() => handleLogout()}
              className="icon-logout"
              src="/images/logout.svg"
              alt=""
            />
          </div>
        ) : (
          <NavLink to="/connect">
            <p className="login-logout">Login/Logout</p>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Nav;
<h2>Nav</h2>;
