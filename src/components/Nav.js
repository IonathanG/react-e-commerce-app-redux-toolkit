import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../context/UserContext";
import CartContext from "../context/CartContext";
import CartPopUp from "./CartPopUp";

const Nav = () => {
  const { user, handleLogout } = useContext(UserContext);
  const { totalQuantity, removeItem } = useContext(CartContext);

  const [isActive, setActive] = useState(true);
  const btnRef = useRef();
  const menuRef = useRef();
  const subMenuRef = useRef();

  const handleToggle = () => {
    setActive((prevState) => !prevState);
  };

  //close menu if click outside
  useEffect(() => {
    const closeMenu = (e) => {
      if (
        e.path[0] !== btnRef.current &&
        e.path[0] !== menuRef.current &&
        e.path[0] !== subMenuRef.current
      )
        setActive(true);
    };
    document.body.addEventListener("click", closeMenu);
    return () => document.body.removeEventListener("click", closeMenu);
  }, []);

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
