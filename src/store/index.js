import { configureStore } from "@reduxjs/toolkit";

//slices

const store = configureStore({
    reducer:{
        example:exampleSlice,
    }
})

export default store;