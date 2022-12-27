import { Form, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "../styles/Dropdowns.css";
import {
  changeOrientation,
  changeSize,
  loadImages,
  removeImages,
} from "../reducers/imageReducer";

// dropdown for choosing images' size
export const DropdownSize = () => {
  const navigate = useNavigate();
  const { query } = useParams();

  const size = useSelector((state) => state.images.size);
  const dispatch = useDispatch();

  const onChange = (event) => {
    const option = event.target.value;
    dispatch(changeSize(option));
    console.log("It works: ", option);

    // navigate(`/search/${query}`)
  };

  const options = ["all", "large", "medium", "small"];

  return (
    <Form action>
      <select
        value={size}
        className="dropdown"
        name="size"
        id="size"
        onChange={onChange}
      >
        {options.map((option, index) => (
          <option value={option} key={index}>
            {option != "all" ? option : "All sizes"}
          </option>
        ))}
      </select>
    </Form>
  );
};


// dropdown for choosing images' orientation
export const DropdownOrientation = () => {
  const options = ["all", "landscape", "portrait", "square"];

  const navigate = useNavigate();
  const { query } = useParams();
  
  const dispatch = useDispatch();

  const onChange = (event) => {
    const chosenOrientation = event.target.value;
    console.log("It works: ", chosenOrientation);
    dispatch(removeImages());
    let newQuery = { query, per_page: "9", page: "1" };
    if (chosenOrientation != "all") newQuery.orientation = chosenOrientation;
    dispatch(loadImages(newQuery));
    dispatch(changeOrientation(chosenOrientation));
  };

  return (
    <Form action>
      <select
        className="dropdown"
        name="orientation"
        id="orientation"
        onChange={onChange}
      >
        {options.map((option, index) => (
          <option value={option} key={index}>
            {option != "all" ? option : "All orientations"}
          </option>
        ))}
      </select>
    </Form>
  );
};
