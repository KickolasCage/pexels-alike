import { useEffect, useState } from "react";

import "../styles/ImageGrid.css";

const ImageGrid = () => {
  const [images, setImages] = useState(new Array(15).fill(0));
  const [pages, setPages] = useState(1);

  const takeEvery3th = (array, offset) => array.filter((value, index, Arr) => {
    return (index - offset) % 3 == 0;
})

  const onScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight + 20 >= scrollHeight && pages < 5) {
      setImages([...images, ...new Array(15).fill(0)]);
      setPages(pages + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  });

  const style = { width: "200px", height: "300px", backgroundColor: "yellow" };
  return (
    <div className="image-grid-container">
      <p className="image-grid-header">
        <b>Free stock images</b>
      </p>
      <div className="image-grid">        
        {/* {images.map((num) => (
          <div style={style} />
        ))} */}
        <div className="image-grid-column">{takeEvery3th(images, 0).map((num, ind) => <div style={style} >{ind}</div>)}</div>
        <div className="image-grid-column">{takeEvery3th(images, 1).map((num, ind) => <div style={style} >{ind}</div>)}</div>
        <div className="image-grid-column">{takeEvery3th(images, 2).map((num, ind) => <div style={style}>{ind}</div>)}</div>
      </div>
    </div>
  );
};

export default ImageGrid;
