import { configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit"

const preloadedState = {
    images : [], 
    backgroundImage : 'https://images.pexels.com/photos/14709395/pexels-photo-14709395.jpeg'
}

const store = configureStore({preloadedState, reducer:{}})

export default store;


