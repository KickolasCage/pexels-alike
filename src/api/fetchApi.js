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
  fetchApi
    .get("/search", {
      params,  
    })
    .catch((error) => {      
      return Promise.reject({ status: error.response.status, message: error.message });
    });


// function to load a page/batch of curated images    
export const fetchCuratedImages = async (params) =>
  fetchApi
    .get("/curated", {
      params,
    })
    .catch((error) => {      
      return Promise.reject({ status: error.response.status, message: error.message });
    });


