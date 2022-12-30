import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Search from "../Search";
import ImageGrid from "../images/ImageGrid";
import StickySearchBar from "../StickySearchBar";
import { loadImages, setCurated } from "../../reducers/imageReducer";
import { randomPage } from "../../utils/utilFunctions";
import { numOfPagesToFetch } from "../../utils/consts";

// main/landing page
const MainPage = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  useEffect(() => {  
    dispatch(setCurated(true))
    dispatch(
      loadImages({        
        per_page: numOfPagesToFetch,
        page: randomPage(),        
        isCurated: true        
      })
    );
    
  }, []);
  return (
    <>
      <StickySearchBar />
      <Search />
      <ImageGrid />
    </>
  );
};

export default MainPage;
