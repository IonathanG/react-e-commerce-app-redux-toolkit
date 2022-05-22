import React from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-content">
      <section className="introduction">
        <header>
          <h2>Trendy</h2>
          <h3>Stylish Sneakers</h3>
        </header>
        <p>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don't look even slightly believable.
        </p>
        <NavLink to="/collections">
          <button>
            Find More<span>&gt;</span>
          </button>
        </NavLink>
      </section>
      <section className="shoe-carousel">
        <img src="/images/home-sneaker-1.png" alt="image_sneaker" />
      </section>
    </div>
  );
};

export default Home;
