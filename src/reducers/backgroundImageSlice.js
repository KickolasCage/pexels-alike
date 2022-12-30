import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchBackgroundImage } from "../api/fetchApi";
import {choose7RandomCategories} from "../utils/utilFunctions";



// thunk for loading the background image on
// the landing page
const loadBackgroundImage = createAsyncThunk(
  "backgroundImage/load",
  async () => {
    const response = await fetchBackgroundImage();
    return response.data;
  }
);

// state slice that contains: 
// url to the background image's URL
// photographer's Pexels page URL
// 7 random popular clickable search queries
const backgroundImageSlice = createSlice({
  name: "backgroundImage",
  initialState: {
    image: {
      src: { large2x: "" },
      photographer: "",
      photographer_url: "",
    },
    isFetched: false,
    suggestions: choose7RandomCategories()
  },  
  reducers: {
    updateSuggestions : (state) => {
      state.suggestions = choose7RandomCategories()
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadBackgroundImage.pending, (state) => {        
        state.isFetched = false;
      })
      .addCase(loadBackgroundImage.fulfilled, (state, action) => {
        state.isFetched = true;
        state.image = action.payload.src.large2x;
      });
  },
});

export { loadBackgroundImage };
export const {updateSuggestions}  = backgroundImageSlice.actions
export default backgroundImageSlice.reducer;
