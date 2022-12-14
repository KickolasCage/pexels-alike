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

const getImagesWithFilters = async (query, page, orientation, size) =>
  fetchApi.get("/", {
    params: {
      query,
      page,
      size,
      orientation,
    },
  });

// fetchApi
//   .get("", {params:{"per_page":2, "page":2}})
//   .then((res) => console.log(res.data.photos));

// fetchApi
//   .get("/search", {params: {"per_page":"5", "page":'1', "query":"nothing", "size":"large"}})
//   .then((res) => console.log(res.data));

// const fetchBackgroudImage = async () =>
//   fetchApi.get("/curated", {
//     params: { size: "large", orientation: "landscape", per_page: "1"},
//   });

// fetchBackgroudImage().then((res) => console.log(res.data));
