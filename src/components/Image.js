import { useSelector, useDispatch } from "react-redux";

import IconAddToLibrary from "./icons/IconAddToLibrary";
import IconDownload from "./icons/IconDownload";
import IconHeartLiked from "./icons/IconHeartLiked";
import IconHeartNotLiked from "./icons/IconHeartNotLiked";
import "../styles/Icons.css";
import "../styles/AuthorInfo.css";

import { switchLike } from "../reducers/imageReducer";
import { useState } from "react";

// component for displaying images 
// according to user-submitted query
const Image = (params) => {
  const image = params.image;
  const authorFace = params.autorFace;
  const authorName = params.authorName;
  const isLiked = params.isLiked;
  const authorLink = params.authorLink;
  const id = params.id;
  const alt = params.alt
  const width = params.width

  const [isLikedLocal, setIsLikedLocal] = useState(isLiked);

  const dispatch = useDispatch();

  const onClick = () => {
    setIsLikedLocal(!isLikedLocal)
    dispatch(switchLike({ id }));
  };

  return (
    <div className="icon-container" width={width}>
      <div className="author-info">
        {/* photographer's profile image */}
        <img className="author-image" width={40} height={40} src={authorFace} />
        {/* link to photographer's profile */}
        <a
          style={{ textDecoration: "none" }}
          target="_blank"
          href={authorLink ?? "#"}
          className="author-name"
        >
          {authorName}
        </a>
      </div>
      {/* icons for downoading, liking and adding image to the library */}
      <div className="icons">
        {isLikedLocal ? (
          <IconHeartLiked className="icon" onClick={onClick} />
        ) : (
          <IconHeartNotLiked className="icon" onClick={onClick} />
        )}
        <IconAddToLibrary className="icon" />
        <IconDownload className="icon" />
      </div>
      {/* image itself */}
      <img width={width} src={image} alt={alt} />
    </div>
  );
};

export default Image;
