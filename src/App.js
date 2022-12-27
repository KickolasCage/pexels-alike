import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
} from "react-router-dom";

import "./App.css";
import ErrorPage from "./components/pages/ErrorPage";
import CategoryPage from "./components/pages/CategoryPage";
import MainPage from "./components/pages/MainPage";

// the entire app
let App = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* route for the main/landing page */}
      <Route path="/" element={<MainPage />} />
      {/* route for search page */}
      <Route path="search/:query" element={<CategoryPage />} />
      {/* route for all other queries */}
      <Route
        path="*"
        element={<ErrorPage/>}
      />
    </>
  )
);

export default App;
