import { configureStore} from "@reduxjs/toolkit"

import backgroundImageReducer from './backgroundImageSlice'
import imageReducer from "./imageReducer";

// reudx store
const store = configureStore({reducer:{background: backgroundImageReducer, images: imageReducer}})

export default store;


