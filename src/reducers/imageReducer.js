import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchImages, fetchCuratedImages } from "../api/fetchApi";
import { fetchApi } from "../api/fetchApi";

// thunk that loads images
// based on user's query
const loadImages = createAsyncThunk(
  "images/load",
  async (queryParams, thunkAPI) => {
    try {
      let response;
      // if user didn't provide any parameters
      // tries to load the next page
      if (!queryParams) {        
        const nextPage = thunkAPI.getState().images.nextPageLink;        
        // checks if next page link exists
        if (nextPage) {          
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
        return response.data;
      }
      // fetches page of ordinary pages otherwise
      else {        
        response = await fetchImages(queryParams);        
        return response.data;
      }
    } catch (e) {
      return e;
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
    isCurated: false
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
    setCurated : (state, action) => {
        state.isCurated = action.payload
    }
  },
  // reducer that tracks stages of
  // image fetching
  extraReducers: (builder) => {
    builder
      .addCase(loadImages.pending, (state) => {        
        state.isFetched = false;
      })
      .addCase(loadImages.fulfilled, (state, action) => {
        state.isFetched = true;
        if (action.payload) {          
          if (action.payload.message) {            
            state.error = action.payload;
          } else {
            state.nextPageLink = action.payload.next_page;
            // adds new images to the list of images
            state.imagesList = [
              ...state.imagesList,
              ...action.payload.photos.sort(
                (img1, img2) => img1.height >= img2.height
              ),
            ];            
            state.page += 1;
          }
        }
      });
  },
});

export { loadImages };
export const { removeImages, changeOrientation, changeSize, switchLike, setCurated } =
  imageSlice.actions;
export default imageSlice.reducer;
