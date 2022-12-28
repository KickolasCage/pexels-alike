import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchBackgroundImage } from "../api/fetchApi";
import choose7RandomCategories from "../components/mostPopularCategories";
import { getBackgroundImage } from "../filters/filters";


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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadBackgroundImage.pending, (state) => {        
        state.isFetched = false;
      })
      .addCase(loadBackgroundImage.fulfilled, (state, action) => {
        state.isFetched = true;
        state.image = getBackgroundImage(action.payload);
      });
  },
});

export { loadBackgroundImage };
export default backgroundImageSlice.reducer;
