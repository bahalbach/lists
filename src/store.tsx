import { configureStore } from "@reduxjs/toolkit";
import listReducer from "./listSlice";

const stored = localStorage.getItem("reduxState");
const preloadedState = stored ? { list: JSON.parse(stored) } : {};
console.log("Loaded: ", stored);

function saveState() {
    let state = store.getState();
    const stateString = JSON.stringify(state.list.present);
    localStorage.setItem("reduxState", stateString);
    console.log("Saved state", stateString)
}

const store = configureStore({
    reducer: {
        list: listReducer
    },
    preloadedState
});

store.subscribe(() => saveState());

export default store;