import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./features/products/products";
import { thunk } from "redux-thunk";


const store = configureStore({
    reducer: {
        products: productsReducer,
    },
    // middleware: [thunk]
})


export default store;