import { configureStore } from "@reduxjs/toolkit";
import listReducer from "./listSlice";

export default configureStore({
    reducer: {
        list: listReducer
    }
})