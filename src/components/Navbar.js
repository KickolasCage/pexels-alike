import { nanoid } from "nanoid";

import "../styles/Navbar.css";
import Logo from "./Logo";

// the row of navbar buttons 
// (currently disabled/no functionality added to them)
const Navbar = () => {
  return (
    <div className="navbar">
      <div>
        <Logo/>       
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

export default Navbar;
