import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


import SearchBar from "../StickySearchBar";
import ImageGrid from "../images/ImageGrid";
import { DropdownOrientation, DropdownSize } from "../Dropdowns";

import { loadImages, setCurated } from "../../reducers/imageReducer";
import { useEffect } from "react";
import { capitalize, randomPage } from "../../utils/utilFunctions";
import { numOfPagesToFetch } from "../../utils/consts";

// page for user-submitted queries
const CategoryPage = () => {
  
  const { query } = useParams(); // user-submitted query
  const dispatch = useDispatch()
  
  useEffect(()=>{
    // loads initial page of images
    dispatch(setCurated(false))
    dispatch(loadImages({query, per_page:numOfPagesToFetch, page:randomPage()}))    
  }, [])

  return (        
    <>
      <SearchBar alwaysSticky />
      <h1 style={{ textAlign: "center" }}>{capitalize(query)} Photos</h1>
      <div style={{
        display: 'flex', 
        gap: '20px',
        justifyContent: 'center'
      }}>
        <DropdownOrientation />
        <DropdownSize />
      </div>      
      <ImageGrid />
      {/* <Image/> */}
    </>
  );
};

export default CategoryPage;
