import axios from "axios";
import API_KEY from "./apiKey";

// axios object for requests
export const fetchApi = axios.create({
  baseURL: "https://api.pexels.com/v1/",
});

fetchApi.defaults.headers.common["Authorization"] = API_KEY; // API key for authorization
fetchApi.defaults.headers.post["Access-Control-Allow-Origin"] = "*"; // CORS


// fetches a background image
export const fetchBackgroundImage = async () =>
  fetchApi.get("/curated", {
    params: { per_page: "1", page: Math.floor(Math.random() * 500).toString() },
  });

// fetches a page/batch of images   
export const fetchImages = async (params) =>
  // (query, per_page = "5", page = 1, orientation='all') =>
  fetchApi
    .get("/search", {
      params,
      // { query: query, per_page: per_page, page: page },
    })
    .catch((error) => {
      console.log("Current error message: ", error.message);
      console.log({ status: error.response.status, message: error.message });
      return { status: error.response.status, message: error.response.message };
    });


// function to load a page/batch of curated images    
export const fetchCuratedImages = async (params) =>
  fetchApi
    .get("/curated", {
      params,
    })
    .catch((error) => []);

// export const fetchImagesWithFilters = async (query, per_page = 5, page = 1) => {
//   fetchApi.get("/search", {
//     params: { query, per_page, page },
//   });
// };

// const getImagesWithFilters = async (query, page, orientation, size) =>
//   fetchApi.get("/", {
//     params: {
//       query,
//       page,
//       size,
//       orientation,
//     },
//   });
