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
  const columns = useSelector((state) => state.images.columns);

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
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    // const bottomOffset = width > 960 ? 50 : 150;
    if (scrollTop + clientHeight >= scrollHeight * 0.8) {
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
    return imgSize == "all" ? img.src[img.preferredSize] : img.src[size];
  };

  const computeWidthAndHeight = (size, img) => {
    const optimalWidth = (width * 0.8) / 3;
    const minWidth = 200;
    const maxWidths = {
      all: 500,
      large: 500,
      medium: 350,
      small: 200,
    };
    const maxWidth = maxWidths[size];

    let imgWidth;

    if (optimalWidth > maxWidth) {
      imgWidth = maxWidth;
    } else if (optimalWidth < minWidth) {
      imgWidth = minWidth;
    } else {
      imgWidth = optimalWidth;
    }

    const imgHeight = img.height * (imgWidth / img.width);    
    return { height: imgHeight, width: imgWidth };
  };

  return columns.flat().length == 0 && isFetched ? (
    <ImagesNotFound />
  ) : (
    <>
      <div className="image-grid">
        {[0, 1, 2].map((offset) => (
          <div className="image-grid-column" key={nanoid()}>
            {columns[offset].map((img, ind) => {
              let { height, width } = computeWidthAndHeight(size, img);
              return (
                <Image
                  key={nanoid()}
                  authorName={img.photographer}
                  authorFace={""}
                  image={isCurated ? img.src.large : chooseSize(img, size)}
                  isLiked={img.liked}
                  authorLink={img.photographer_url}
                  id={img.id}
                  alt={img.alt}
                  width={width}
                  height={height}
                />
              );
            })}
          </div>
        ))}
      </div>
      {/* displays a loading spinner if images didn't fetch already     */}
      {<LoadingSpinner />}
    </>
  );
};

export default ImageGrid;
