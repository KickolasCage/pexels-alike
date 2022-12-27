import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";

import "../styles/ImageGrid.css";
import { loadImages } from "../reducers/imageReducer";
import Image from "./Image";
import ImagesNotFound from "./ImagesNotFound";
import LoadingSpinner from "./LoadingSpinner";

// image grid that displays images
// according to user-submitted query
const ImageGrid = (params) => {
  // const { query } = useParams();

  const dispatch = useDispatch();
  const images = useSelector((state) => state.images.imagesList);

  // utility function for splitting array of images
  // into 3 arrays
  const takeEvery3th = (array, offset) =>
    array.filter((value, index, Arr) => {
      return (index - offset) % 3 == 0;
    });

  // implements infinite scroll
  // by loading new images
  const onScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const bottomOffset = 50;
    if (scrollTop + clientHeight >= scrollHeight) {
      console.log("On scroll event handler!");
      dispatch(loadImages());
    }
  };

  // adds event listener for
  // infinite scroll
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    // console.log("Current window width: ", window.innerWidth)
    return () => window.removeEventListener("scroll", onScroll);
  });

  const isFetched = useSelector((state) => state.images.isFetched);

  const size = useSelector((state) => state.images.size);
  const orientation = useSelector((state) => state.images.orientation);

  const chooseSize = (img, imgSize) => {
    return imgSize == "all" ? img.src["original"] : img.src[size];
  };

  // const chooseWidthForSize = {"all": 400, "large": 400, "small": 200, "medium": 300}

  // gets browser window's width
  const getWidth = () =>
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  // keeps window's width
  let [width, setWidth] = useState(getWidth());

  // tracks changes in window's width
  useEffect(() => {
    const resizeListener = () => {
      setWidth(getWidth());
    };

    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  const computeWidth = (size) => {
    // widths for images (normal and minimal)
    const optimalWidth = (width * 0.8) / 3;
    const minWidth = 200;
    const maxWidths = {
      'all' : 500,
      'large': 500, 
      'medium': 350,
      'small': 200
    }
    const maxWidth = maxWidths[size]

    if (optimalWidth > maxWidth) return maxWidth;
    else if (optimalWidth < minWidth) return minWidth;
    else return optimalWidth;
  };

  return images.length == 0 && isFetched ? (
    <ImagesNotFound />
  ) : (
    <>
      <div className="image-grid">
        {/* <p className="image-grid-header">
          <b>Free stock images</b>
        </p> */}
        {[0, 1, 2].map((offset) => (
          <div className="image-grid-column" key={nanoid()}>
            {takeEvery3th(images, offset).map((img, ind) => (
              // <img src={img.src.tiny}></img>
              <Image
                key={nanoid()}
                authorName={img.photographer}
                authorFace={""}
                // image={img.src.large
                image={chooseSize(img, size)}
                isLiked={img.liked}
                authorLink={img.photographer_url}
                id={img.id}
                alt={img.alt}
                // width={width > 960 ? chooseWidthForSize[size] : 200}
                width={computeWidth(size)}
              />
            ))}
          </div>
        ))}
      </div>
      {/* displays a loading spinner if images didn't fetch already     */}
      {!isFetched && <LoadingSpinner />}
    </>
  );
};

export default ImageGrid;
