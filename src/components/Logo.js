import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeImages } from "../reducers/imageReducer";


// Pexels logo
const Logo = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const onClick = (e) => {        
    navigate("/");
    dispatch(removeImages({resetAll: true}))    
    // navigate(0); // reloads the page
  }

  return (
    <a href="#"
      onClick={onClick}
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
