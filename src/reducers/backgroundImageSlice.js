import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
  // initialState: {
  //   image: {
  //     id: 2775196,
  //     width: 5444,
  //     height: 3629,

  //     alt: "White Clouds",

  //     avg_color: "#7A6A83",

  //     height: 3629,

  //     id: 2775196,

  //     liked: false,

  //     photographer: "Roberto Nickson",

  //     photographer_id: 1268114,

  //     photographer_url: "https://www.pexels.com/@rpnickson",

  //     src: {
  //       original:
  //         "https://images.pexels.com/photos/2775196/pexels-photo-2775196.jpeg",
  //       large2x:
  //         "https://images.pexels.com/photos/2775196/pexels-photo-2775196.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  //       large:
  //         "https://images.pexels.com/photos/2775196/pexels-photo-2775196.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",

  //       landscape:
  //         "https://images.pexels.com/photos/2775196/pexels-photo-2775196.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",

  //       large:
  //         "https://images.pexels.com/photos/2775196/pexels-photo-2775196.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",

  //       large2x:
  //         "https://images.pexels.com/photos/2775196/pexels-photo-2775196.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",

  //       medium:
  //         "https://images.pexels.com/photos/2775196/pexels-photo-2775196.jpeg?auto=compress&cs=tinysrgb&h=350",

  //       original:
  //         "https://images.pexels.com/photos/2775196/pexels-photo-2775196.jpeg",

  //       portrait:
  //         "https://images.pexels.com/photos/2775196/pexels-photo-2775196.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",

  //       small:
  //         "https://images.pexels.com/photos/2775196/pexels-photo-2775196.jpeg?auto=compress&cs=tinysrgb&h=130",

  //       tiny: "https://images.pexels.com/photos/2775196/pexels-photo-2775196.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",

  //       url: "https://www.pexels.com/photo/white-clouds-2775196/",

  //       width: 5444,
  //     },
  //   },
  // },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadBackgroundImage.pending, (state) => {
        console.log("Pending...");
      })
      .addCase(loadBackgroundImage.fulfilled, (state, action) => {
        state.isFetched = true;
        state.image = getBackgroundImage(action.payload);
      });
  },
});

export { loadBackgroundImage };
export default backgroundImageSlice.reducer;
