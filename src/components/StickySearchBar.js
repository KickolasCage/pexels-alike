import { useState, useEffect } from "react";

import "../styles/SearchBar.css";
import "../styles/Navbar.css"

const StickySearchBar = ({ alwaysSticky }) => {
  const [display, setDisplay] = useState(alwaysSticky ? "flex" : "none");
  const listenScrollEvent = () => {
    if (alwaysSticky) return;
    const halfOfWindow = window.innerHeight / 2 + 20;
    window.scrollY > halfOfWindow ? setDisplay("flex") : setDisplay("none");
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);

  return (
    <div
      className="navbar"
      style={{
        display: display,
        transition: "all 1s",
        position: "sticky",
        backgroundColor: "black", 
        top: "0"
      }}
    >
      <div style={{display: "flex", alignItems:"center", gap: "20px"}}>
        <a href="#">
          <img
            width={90}
            height={30}
            src="https://images.pexels.com/lib/api/pexels-white.png"
            className="navbar-logo"
          />
        </a>
        <form className="search-form">
          <input
            className="search-input"
            type="text"
            placeholder="Search for free photos and videos"
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="navbar-links">
        {["Explore", "License", "Upload", "•••"].map((el) => (
          <div className="navbar-link">{el}</div>
        ))}
        <button className="navbar-button">Join</button>
      </div>
    </div>
  );
};

export default StickySearchBar;
