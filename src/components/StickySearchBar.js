import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { nanoid } from "nanoid";

import "../styles/StickySearchBar.css";
import "../styles/Navbar.css"
import Logo from "./Logo";

// search bar on the top of the screen
const StickySearchBar = ({ alwaysSticky }) => {
  // if alwaysSticky is set then the searchbar
  // will always be on top of the page
  // otherwise, it will become visible only after
  // reaching a particular part of the screen
  const [display, setDisplay] = useState(alwaysSticky ? "flex" : "none");
  
  // listener for reaching a particular 
  // part of the browser's screen
  const listenScrollEvent = () => {
    if (alwaysSticky) return;
    const halfOfWindow = window.innerHeight / 2 + 20;
    window.scrollY > halfOfWindow ? setDisplay("flex") : setDisplay("none");
  };

  const navigate = useNavigate()

  const {query} = useParams()
  const [searchQuery, setSearchQuery] = useState(query)

  const onSubmit = (event) => {
    event.preventDefault()
    navigate(`/search/${searchQuery}`)
    navigate(0)
  }

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);

  return (
    <div
      className="searchbar"
      style={{
        display: display        
      }}
    >
      <div style={{display: "flex", alignItems:"center", gap: "10px"}}>
        <Logo/>
        <form className="search-form" onSubmit={onSubmit}>
          <input
            className="search-input"
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search for free photos and videos"
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="navbar-links">
        {["Explore", "License", "Upload", "•••"].map((el) => (
          <div className="navbar-link" key={nanoid()}>{el}</div>
        ))}
        <button className="navbar-button">Join</button>
      </div>
    </div>
  );
};

export default StickySearchBar;
