import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import { addList } from "./listSlice";

test("renders app without crashing", () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});

// test("create action", () => {
//   addList("parentid")
// });
