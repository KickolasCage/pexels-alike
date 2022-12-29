import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";

import "../../styles/ImageGrid.css";
import { loadImages } from "../../reducers/imageReducer";
import Image from "./Image";
import ImagesNotFound from "./ImagesNotFound";
import LoadingSpinner from "./LoadingSpinner";
import { debounce } from "../../utils/utilFunctions";

// image grid that displays images
// according to user-submitted query
const ImageGrid = (params) => {
  const dispatch = useDispatch();
  const images = useSelector((state) => state.images.imagesList);

  // utility function for splitting array of images
  // into 3 arrays
  const takeEvery3th = (array, offset) =>
    array.filter((value, index, Arr) => {
      return (index - offset) % 3 == 0;
    });
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
  // implements infinite scroll
  // by loading new images
  const onScroll = debounce(() => {
    console.log("On scroll event handler!");
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    // const bottomOffset = width > 960 ? 50 : 150;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      // pages are loaded based on the initial query
      // made by the outer container
      dispatch(loadImages());
    }
  });

  // adds event listener for implementing
  // infinite scroll
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  });

  const isFetched = useSelector((state) => state.images.isFetched);

  const size = useSelector((state) => state.images.size);
  const orientation = useSelector((state) => state.images.orientation);
  const isCurated = useSelector((state) => state.images.isCurated);

  const chooseSize = (img, imgSize) => {
    // const chooseSizeRandomly = () => {      
    //   return ["large", "medium"][Math.floor(Math.random() * 2)];
    // };
    return imgSize == "all" ? img.src[img.preferredSize] : img.src[size];
  };

  // const chooseWidthForSize = {"all": 400, "large": 400, "small": 200, "medium": 300}

  const computeWidth = (size) => {
    // widths for images (normal and minimal)
    const optimalWidth = (width * 0.8) / 3;
    const minWidth = 200;
    const maxWidths = {
      all: 500,
      large: 500,
      medium: 350,
      small: 200,
    };
    const maxWidth = maxWidths[size];

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
                image={isCurated ? img.src.large : chooseSize(img, size)}
                isLiked={img.liked}
                authorLink={img.photographer_url}
                id={img.id}
                alt={img.alt}
                width={computeWidth(size)}
              />
            ))}
          </div>
        ))}
      </div>
      {/* displays a loading spinner if images didn't fetch already     */}
      {<LoadingSpinner />}
    </>
  );
};

export default ImageGrid;
