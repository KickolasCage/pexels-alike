// capitalizes every word in sentence
export const capitalize = (string) => {
    return string
      .toLowerCase()
      .split(" ")
      .map(function (word) {
        return word[0].toUpperCase() + word.substr(1);
      })
      .join(" ");
  };

// picks random number for page
export const randomPage = () => {
    return Math.floor(Math.random() * 100).toString()
}

// puts a pause on the next execution of given function
export const debounce = (func, timeout = 100) => {    
    let timer;
    return (...args) => {
      
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }

// splits array of images into three columns
// all having roughly same height
export const balanceGridColumns = (imgArray, oldColumnHeights= [0,0,0]) => {
    const columns = [[], [], []]
    const columnHeights = [...oldColumnHeights]

    for (const img of imgArray){
        const min = Math.min(...columnHeights)
        const index = columnHeights.indexOf(min)
        const height = img.height
        columns[index] = columns[index].concat(img)
        columnHeights[index] += height
    }    
    const balancedImgArray = columns
    return {balancedImgArray, columnHeights}
}

// returns 7 random popular search queries
export const choose7RandomCategories = () => {
  const images = [
    "Nature",
    "Christmas",
    "Landscape",
    "Abstract",
    "Forest",
    "Dark",
    "Winter",
    "Office",
    "Coffee",
    "Dog",
    "Car",
    "Sunset",
    "Animal",
    "Flowers",
    "Space",
    "Technology",
    "Art",
    "House",
    "Sky"
  ];

  return images.sort(() => 0.5 - Math.random()).slice(0, 7);
};


