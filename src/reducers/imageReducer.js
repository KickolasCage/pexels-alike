import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchImages, fetchCuratedImages } from "../api/fetchApi";
import { fetchApi } from "../api/fetchApi";


// thunk that loads images
// based on user's query
const loadImages = createAsyncThunk(
  "images/load",
  async (queryParams, thunkAPI) => {
    let response;
    // if user didn't provide any parameters
    // tries to load the next page
    if (!queryParams) {
      console.log("State: ", thunkAPI.getState());
      const nextPage = thunkAPI.getState().images.nextPageLink;
      console.log("Next page: ", nextPage);
      // checks if next page link exists
      if (nextPage) {
        console.log("Trying to get the next page");
        response = await fetchApi.get(nextPage);
        return response.data;
      } else {
        return null;
      }
    }
    // fetches page of curated images
    if (queryParams.isCurated) {
      delete queryParams.isCurated;
      response = await fetchCuratedImages(queryParams);
      console.log("Fetched images: ", response.data);
      return response.data;

    }
    // fetches page of ordinary pages otherwise 
    else {
      //   const { query, per_page, page } = queryParams;
      //   const response = await fetchImages(query, per_page, page);
      response = await fetchImages(queryParams);
      console.log("Fetched images: ", response.data);
      return response.data;
    }
  }
);

// slice that contains data about loaded images
const imageSlice = createSlice({
  name: "images",
  initialState: {
    imagesList: [], // list of fetched images
    isFetched: false, // variable to track fetching status
    page: 1,
    orientation: "all", // user's preferred image orientation
    size: "all", // user's preferred image size 
    nextPageLink: "", // link to the next page (batch of images to be loaded later)
    error: {}, // error to be displayed 
  },
  // reducers that:
  reducers: {
    // changes user's preferred image size
    changeSize: (state, action) => {
      state.size = action.payload;
    },
    // changes images' orientation
    // as chosen by user
    changeOrientation: (state, action) => {
      state.orientation = action.payload;
    },
    // saves user's likes 
    switchLike: (state, action) => {
      const id = action.payload.id;
      for (let image of state.imagesList) {
        if (image.id == id) {
          image.liked = !image.liked;
        }
      }
    },
    // removes already loaded images
    removeImages: (state) => {
      state.imagesList = [];
    },
  },
  // reducer that tracks stages of 
  // image fetching
  extraReducers: (builder) => {
    builder
      .addCase(loadImages.pending, (state) => {
        console.log("Pending...");
        console.log("Next link", state.nextPageLink);
        state.isFetched = false;
      })
      .addCase(loadImages.fulfilled, (state, action) => {
        state.isFetched = true;
        if (action.payload) {
          if (action.payload.status) {
            console.log("recording error...")
            state.error = action.payload;
          } else {
            state.nextPageLink = action.payload.next_page;
            // state.imagesList = state.imagesList.concat(action.payload.photos);
            // adds new images to the list of images
            state.imagesList = [...state.imagesList, ...action.payload.photos.sort((img1, img2) => img1.height > img2.height)];
            console.log("Currently loaded images: ", state.imagesList);
            console.log("Is fetched: ", state.isFetched);
            console.log("Current page: ", state.page);
            console.log("Next page link: ", state.nextPageLink);
            state.page += 1;
          }
        }
      });
  },
});

export { loadImages };
export const { removeImages, changeOrientation, changeSize, switchLike } =
  imageSlice.actions;
export default imageSlice.reducer;
