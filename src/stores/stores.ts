import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import visibleReducer  from "./reducer-slice";
import asyncReducer from "./reducer-async";

const store = configureStore({
    reducer: {
        visible: visibleReducer,
        asyncReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store