import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "./Navbar";
import "../styles//Search.css";
import { loadBackgroundImage } from "../reducers/backgroundImageSlice";
import { nanoid } from "nanoid";
import { removeImages } from "../reducers/imageReducer";

// the search block/landing page
const Search = () => {
  const dispatch = useDispatch();

  // loading background image and photographer's credentials
  const backgroundImage = useSelector(
    (state) => state.background.image.src.landscape
  );
  const photographer = useSelector(
    (state) => state.background.image.photographer
  );
  const photographer_url = useSelector(
    (state) => state.background.image.photographer_url
  );

  // variable to check whether background image
  // was succesfully fetched
  const isFetched = useSelector((state) => state.background.isFetched);
  useEffect(() => {
    dispatch(loadBackgroundImage());
  }, []);

  // search query submitted by user
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  //Function that forwards user to the search page
  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(removeImages())
    navigate(`/search/${searchQuery}`);    
  };

  // seven random popular categories
  // that are suggested to the user
  const sevenRandomCategories = useSelector(
    (state) => state.background.suggestions
  );

  return (
    <div
      className="search"
      style={
        isFetched
          ? {
              backgroundImage: `url(${backgroundImage})`,
            }
          : { backgroundColor: "darkgrey" }
      }
    >
      <Navbar />
      <div className="container">
        <h2 className="search-h">
          The best free stock photos & videos shared by talented creators.
        </h2>
        <form className="search-form" onSubmit={onSubmit}>
          <input
            className="search-input"
            type="text"
            placeholder="Search for free photos and videos"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
          <button type="submit">Search</button>
        </form>
        <p className="search-suggestions">
          <b>Suggested: </b>{" "}
          {sevenRandomCategories // render 7 random search categories
            .map((el) => el.toLowerCase())
            .map((el, id) => (
              <>
                <a
                  onClick={(e) => {
                    dispatch(removeImages())
                    navigate(`search/${el}`);                    
                  }}
                  className="search-example-links"
                  key={nanoid()}
                >
                  {el}
                </a>
                <span style={{ color: "white" }} key={nanoid()}>
                  {id != 6 && ", "}
                </span>
              </>
            ))}
        </p>
      </div>

      <a href={photographer_url} target="_blank" className="search-credits">
        {/* link to photographer's page */}
        {isFetched &&<b>{`Photo by ${photographer}`}</b>}
      </a>
    </div>
  );
};

export default Search;
