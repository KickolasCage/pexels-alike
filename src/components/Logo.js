import { Link, useNavigate } from "react-router-dom";


// Pexels logo
const Logo = () => {
  const navigate = useNavigate();
  return (
    <a href="#"
      onClick={(e) => {
        navigate("/");
        navigate(0);
      }}
    >
      <img
        width={120}
        height={45}
        src="https://images.pexels.com/lib/api/pexels-white.png"
        className="navbar-logo"
      />
    </a>
  );
};

export default Logo;
