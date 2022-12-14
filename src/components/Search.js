// "https://images.pexels.com/photos/14709395/pexels-photo-14709395.jpeg"

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";


import Navbar from "./Navbar";
import "../styles//Search.css";
import { fetchBackgroundImage } from "../api/fetchApi";
import StickySearchBar from "./StickySearchBar";
import choose7RandomCategories from "./mostPopularCategories";

const Search = () => {
  // let [image, setImage] = useState("");

  // useEffect(() => {
  //   fetchBackgroundImage("2").then((res) => {
  //     setImage(res.data.photos[0]);
  //   });
  //   console.log(image.url);
  // }, []);
  const imageData = useLoaderData()
  console.log(imageData)

  return (
    <div className="search">
      <Navbar />      
      <div
        className="container"
        style={{
          backgroundImage: 
            // `url(${imageData.url})`
            "https://images.pexels.com/photos/14709395/pexels-photo-14709395.jpeg"
        }}
      >
        <h2 className="search-h">
          The best free stock photos & videos shared by talented creators.
        </h2>
        <form className="search-form">
          <input
            className="search-input"
            type="text"
            placeholder="Search for free photos and videos"
          />
          <button type="submit">Search</button>
        </form>
        <p className="search-suggestions">
          <b>Suggested: </b> {`${choose7RandomCategories().join(", ").toLowerCase()}`}
        </p>
      </div>
      {/* <a href={`${imageData.photographer_url}`} target='_blank' className="search-credits"> */}
      <a href="#" target='_blank' className="search-credits">
        {/* {`Photo by ${imageData.photographer}`}        */}
        Nothing
      </a>
    </div>
  );
};

export default Search;
