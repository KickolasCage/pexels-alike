// number of pages to fetch
export const numOfPagesToFetch = "9";


// default state for state.images
export const defaultState = {
  isFetched: false, // variable to track fetching status
  page: 1,
  orientation: "all", // user's preferred image orientation
  size: "all", // user's preferred image size
  nextPageLink: "", // link to the next page (batch of images to be loaded later)
  error: {}, // error to be displayed
  isCurated: false, // whether curated images are required
  columnHeights: [0, 0, 0],
  // list of images, split into three sublists that
  // represent columns in the image grid
  columns: [[], [], []],
};
