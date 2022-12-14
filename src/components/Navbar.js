import styled from "styled-components";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div>
        <a href='#'>
          <img
            width={90}
            height={30}
            src="https://images.pexels.com/lib/api/pexels-white.png"
            className="navbar-logo"            
          />
        </a>        
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

export default Navbar;
