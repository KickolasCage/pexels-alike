export const capitalize = (string) => {
    return string
      .toLowerCase()
      .split(" ")
      .map(function (word) {
        return word[0].toUpperCase() + word.substr(1);
      })
      .join(" ");
  };

export const randomPage = () => {
    return Math.floor(Math.random() * 100).toString()
}

export const debounce = (func, timeout = 400) => {    
    let timer;
    return (...args) => {
      
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }


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
    const balancedImgArray = columns.flat()
    return {balancedImgArray, columnHeights}
}