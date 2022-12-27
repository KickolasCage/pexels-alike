import { Form, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "../styles/Dropdowns.css";
import {
  changeOrientation,
  changeSize,
  loadImages,
  removeImages,
} from "../reducers/imageReducer";
import { numOfPagesToFetch } from "../utils/consts";
import { randomPage } from "../utils/utilFunctions";

const Dropdown = (params) => {
  const selector = params.selector;
  const options = params.options;
  const name = params.name;
  const onChangeHandler = params.onChangeHandler;

  const navigate = useNavigate();
  const { query } = useParams();

  const state = useSelector(selector);
  const dispatch = useDispatch();

  return (
    <Form action>
      <select
        value={state}
        className="dropdown"
        name={name}
        id={name}
        onChange={onChangeHandler}
      >
        {options.map((option, index) => (
          <option value={option} key={index}>
            {option != "all" ? option : `All ${name}s`}
          </option>
        ))}
      </select>
    </Form>
  );
};

// dropdown for choosing images' size
export const DropdownSize = () => {
  const dispatch = useDispatch();
  const selector = (state) => state.images.size;
  const name = "size";
  const options = ["all", "large", "medium", "small"];
  const onChangeHandler = (event) => {
    const option = event.target.value;
    dispatch(changeSize(option));
  };

  const params = {selector, name, options, onChangeHandler}
  return <Dropdown {...params}/>;
};

export const DropdownOrientation = () => {
  const options = ["all", "landscape", "portrait", "square"];
  const dispatch = useDispatch();
  const selector = (state) => state.images.orientation
  const navigate = useNavigate();
  const { query } = useParams();
  const name = 'orientation'
  const onChangeHandler = (event) => {
    const chosenOrientation = event.target.value;    
    dispatch(removeImages());
    let newQuery = { query, per_page: numOfPagesToFetch, page: randomPage() };
    if (chosenOrientation != "all") newQuery.orientation = chosenOrientation;
    dispatch(loadImages(newQuery));
    dispatch(changeOrientation(chosenOrientation));
  };

  const props = {selector, name, options, onChangeHandler}

  return <Dropdown {...props}/>
}



