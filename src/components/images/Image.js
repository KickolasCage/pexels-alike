import { useSelector, useDispatch } from "react-redux";

import IconAddToLibrary from "../icons/IconAddToLibrary";
import IconDownload from "../icons/IconDownload";
import IconHeartLiked from "../icons/IconHeartLiked";
import IconHeartNotLiked from "../icons/IconHeartNotLiked";
import "../../styles/Icons.css";
import "../../styles/AuthorInfo.css";

import { switchLike } from "../../reducers/imageReducer";
import { useState } from "react";

// component for displaying images
// according to user-submitted query
const Image = (props) => {
  const image = props.image;
  const authorFace = props.autorFace;
  const authorName = props.authorName;
  const isLiked = props.isLiked;
  const authorLink = props.authorLink;
  const id = props.id;
  const alt = props.alt;
  const width = props.width;

  const [isLikedLocal, setIsLikedLocal] = useState(isLiked);

  const dispatch = useDispatch();

  const onClick = () => {
    setIsLikedLocal(!isLikedLocal);
    dispatch(switchLike({ id }));
  };

  return (
    <div className="image-container" width={width}>
      <div className="image-info-container" width={width}>
        <div className="author-info">
          {/* photographer's profile image */}
          <img
            className="author-image"
            width={40}
            height={40}
            src={authorFace}
          />
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
      </div>
      {/* image itself */}
      <img width={width} src={image} alt={alt} />
    </div>
  );
};

export default Image;
