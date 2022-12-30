import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchImages, fetchCuratedImages } from "../api/fetchApi";
import { fetchApi } from "../api/fetchApi";
import { balanceGridColumns } from "../utils/utilFunctions";
import { defaultState } from "../utils/consts";

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
  initialState: defaultState,
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
      for (let column of state.columns) {
        for (let image of column) {
          if (image.id == id) {            
            image.liked = !image.liked;
          }
        }
      }
    },
    // removes already loaded images
    resetImageGridState: (state, action) => {      
      state.columns = [[],[], []]
      state = defaultState
    },
    setCurated: (state, action) => {
      state.isCurated = action.payload;
    },
    resetLocalStorage : (state) => {        
      state.resetAll = true;
  }

  },
  // reducer that tracks stages of
  // image fetching
  extraReducers: (builder) => {
    builder
      .addCase(loadImages.pending, (state) => {
        state.isFetched = false;
        delete state.resetAll
      })
      .addCase(loadImages.fulfilled, (state, action) => {
        state.isFetched = true;        
        console.log('columns', state.columnHeights)
        if (action.payload) {
          if (action.payload.message) {
            state.error = action.payload;
          } else {
            state.nextPageLink = action.payload.next_page;

            let { balancedImgArray, columnHeights } = balanceGridColumns(
              action.payload.photos,
              state.columnHeights
            );
            state.columnHeights = columnHeights;            
            // adds new images to the list of images
            for (const index of [0, 1, 2]) {
              state.columns[index] = state.columns[index].concat(
                balancedImgArray[index]
              );
              state.columns[index].map((img) => {
                img.preferredSize = ["large", "medium"][
                  Math.floor(Math.random() * 2)
                ];
                return img;
              });
            }
            state.page += 1;
          }
        }
      });
  },
});

export { loadImages };
export const {
  resetImageGridState,
  changeOrientation,
  changeSize,
  switchLike,
  setCurated,  
  resetLocalStorage
} = imageSlice.actions;
export default imageSlice.reducer;
