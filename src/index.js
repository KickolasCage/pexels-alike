import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "redux";
import "./index.css";
import router from "./App";

import { fetchApi } from "./api/fetchApi";
import { Provider } from "react-redux";
import store from "./reducers/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);




