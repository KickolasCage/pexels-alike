import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
} from "react-router-dom";

import "./App.css";
import CategoryPage from "./components/CategoryPage";
import MainPage from "./components/MainPage";
import {fetchBackgroundImage} from './api/fetchApi'

// function App() {
//   return (
//     <div className="App">
//       <MainPage/>
//     </div>
//   );
// }

let App = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainPage />}
        // loader={async () => {
        //   const backgroundImage = (await fetchBackgroundImage()).data.photos[0]
        //   return backgroundImage
        // }}
      />
      <Route path="search" element={<CategoryPage />} />
      <Route path="*" element={<p>Oops, nothing here!</p>}/>
    </>
  )
);

export default App;
