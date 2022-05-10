import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../context/UserContext";
import CartContext from "../context/CartContext";
import CartPopUp from "./CartPopUp";
import ProfilePopUp from "./ProfilePopUp";

const Nav = () => {
  const { user } = useContext(UserContext);
  const { totalQuantity } = useContext(CartContext);

  const [isActive, setActive] = useState(true);
  const [isProfileActive, setIsProfileActive] = useState(false);
  const btnRef = useRef();
  const menuRef = useRef();
  const subMenuRef = useRef();

  const profileRef = useRef();
  const profileContainerRef = useRef();
  const profilePictureRef = useRef();

  const handleToggle = () => {
    setActive((prevState) => !prevState);
  };

  //close menu if click outside
  useEffect(() => {
    const closeMenu = (e) => {
      if (
        !btnRef.current.contains(e.target) &&
        !menuRef.current.contains(e.target)
      )
        setActive(true);
    };
    document.body.addEventListener("click", closeMenu);
    return () => document.body.removeEventListener("click", closeMenu);
  }, []);

  //close profile popup if click outside
  useEffect(() => {
    const closeProfile = (e) => {
      if (user && !profileRef.current.contains(e.target))
        setIsProfileActive(false);
    };
    document.body.addEventListener("click", closeProfile);
    return () => document.body.removeEventListener("click", closeProfile);
  }, [user]);

  //disable scrolling on the body when menu is open
  useEffect(() => {
    !isActive
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "visible");
  }, [isActive]);

  return (
    <>
      <div className="navigation">
        <div className="navigation__container--left">
          <div
            className={`hamburger-container ${
              isActive ? "hamburger-rest" : "hamburger-active"
            }`}
            ref={btnRef}
            onClick={handleToggle}
          ></div>

          <NavLink to="/">
            <div className="logo">
              <img src="/images/logo.svg" alt="" />
            </div>
          </NavLink>
          <div
            className={`list-container ${isActive ? "" : "list-active"}`}
            ref={menuRef}
          >
            <ul className="list-links" ref={subMenuRef}>
              <NavLink
                to="/collections"
                className={(nav) => (nav.isActive ? "nav-active" : "")}
                onClick={() => handleToggle()}
              >
                <li>Collections</li>
              </NavLink>
              <NavLink
                to="/men"
                className={(nav) => (nav.isActive ? "nav-active" : "")}
                onClick={() => handleToggle()}
              >
                <li>Men</li>
              </NavLink>
              <NavLink
                to="/women"
                className={(nav) => (nav.isActive ? "nav-active" : "")}
                onClick={() => handleToggle()}
              >
                <li>Women</li>
              </NavLink>
              <NavLink
                to="/about"
                className={(nav) => (nav.isActive ? "nav-active" : "")}
                onClick={() => handleToggle()}
              >
                <li>About</li>
              </NavLink>
              <NavLink
                to="/contact"
                className={(nav) => (nav.isActive ? "nav-active" : "")}
                onClick={() => handleToggle()}
              >
                <li>Contact</li>
              </NavLink>
            </ul>
          </div>
        </div>
        <div className="navigation__container--right">
          <div className="cart__container">
            <div className="icon-cart">
              <NavLink to="/checkout">
                <img src="/images/icon-cart.svg" alt="" />
                {totalQuantity > 0 && (
                  <div className="icon-cart__popup">{totalQuantity}</div>
                )}
              </NavLink>
            </div>
            <CartPopUp />
          </div>

          {user ? (
            <div className="profile" ref={profileRef}>
              <div className="profile__container" ref={profileContainerRef}>
                <img
                  className={`icon-profile ${
                    isProfileActive ? "profile-active" : ""
                  }`}
                  src="/images/image-avatar.png"
                  alt="profile_picture"
                  onClick={() => setIsProfileActive((prevState) => !prevState)}
                  ref={profilePictureRef}
                />
                {isProfileActive && (
                  <ProfilePopUp setIsProfileActive={setIsProfileActive} />
                )}
              </div>
            </div>
          ) : (
            <NavLink
              to="/connect"
              className={(nav) => (nav.isActive ? "nav-active" : "")}
            >
              <p className="login-logout">Login/Sign up</p>
            </NavLink>
          )}
        </div>
      </div>
      {!isActive && <div className="layer-dim"></div>}
    </>
  );
};

export default Nav;
<h2>Nav</h2>;
