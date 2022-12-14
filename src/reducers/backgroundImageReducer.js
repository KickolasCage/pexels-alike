import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchBackgroudImage } from "../api/fetchApi";

export const loadBackgroundImage = createAsyncThunk(
  "backgroundImage/load",
  async (thunkApi) => {
    const response = await fetchBackgroudImage();
    return response.data;
  }
);

const backgroundImageSlice = createSlice({
  name: "backgroundImage",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadBackgroundImage.fulfilled, (state, action) => {
      state = action.payload;
    });
  },
});

