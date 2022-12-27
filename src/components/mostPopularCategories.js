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

export default choose7RandomCategories;
