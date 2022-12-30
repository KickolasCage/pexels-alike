import { configureStore } from "@reduxjs/toolkit";

import backgroundImageReducer from "./backgroundImageSlice";
import imageReducer from "./imageReducer";
import { reHydrateStore, localStorageMiddleware } from "./middleware";

// redux store
const store = configureStore({
  reducer: { background: backgroundImageReducer, images: imageReducer },
  preloadedState: reHydrateStore(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
}
);

export default store;
