import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Search from "../Search";
import ImageGrid from "../ImageGrid";
import StickySearchBar from "../StickySearchBar";
import { loadImages } from "../../reducers/imageReducer";
import { randomPage } from "../../utils/utilFunctions";

// main/landing page
const MainPage = () => {
  const dispatch = useDispatch();
  const isFetchedBackground = useSelector(
    (state) => state.background.isFetched
  );
  const isFetchedImages = useSelector((state) => state.images.isFetched);
  useEffect(() => {
    // dispatch(loadBackgroundImage())
    dispatch(
      loadImages({        
        per_page: "9",
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
